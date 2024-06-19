import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI environment variable is not set.');
  process.exit(1); // Exit the application if the MONGO_URI is not set
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

const Product = mongoose.model("Product", {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    mrp: req.body.mrp,
    quantity: req.body.quantity,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  vehicle: {
    type: String,
  },
  password: {
    type: String,
  },
  cartData: [{
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    }
  }],
  date: {
    type: Date,
    default: Date.now,
  }
});
app.get('/cart', async (req, res) => {
  const userId = req.query.userId; 

  if (!userId) {
    return res.status(400).json({ success: false, errors: 'User ID is required' });
  }

  try {
    const user = await Users.findById(userId).populate('cartData.product');
    if (!user) {
      return res.status(404).json({ success: false, errors: 'User not found' });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ success: false, errors: 'Internal Server Error' });
  }
});


app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, error: "existing user found" });
  }

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    vehicle: req.body.vehicle,
    cartData: [],
  });

  await user.save();

  const data = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(data, 'secret_ecom');
  const username = user.name;
  const userId = user.id;
  res.json({ success: true, token, username, userId, user});
});

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        }
      };
      const token = jwt.sign(data, 'secret_ecom');
      const username = user.name;
      const userId = user.id;
      res.json({ success: true, token, username, userId, user});
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email" });
  }
});


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret_ecom', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.put('/update-cart', authenticateToken, async (req, res) => {
  const userId = req.user.user.id;
  const { cartData } = req.body;

  try {
    // Update the user's cartData in MongoDB
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Cart data updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating cart data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});