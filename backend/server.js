import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import productRoutes from './routes/product.routes.js';
import db from './config/db.config.js'
const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all requests
app.use(cors());
//Middleware
app.use(express.json());


//Routes
app.use('/', productRoutes);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


