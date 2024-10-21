// import Product from '../models/product.model.js'

// exports.firstPage = async (req, res) => {
//   try {
//     res.status(200).send("Express App is Running");
//   } catch (error) {
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };
// //Create product
// exports.createProduct = async (req, res) => {
//   try {
//     let products = await Product.find({});
//     let id;
//     if (products.length > 0) {
//       let last_product_array = products.slice(-1);
//       let last_product = last_product_array[0];
//       id = last_product.id + 1;
//     } else {
//       id = 1;
//     }
//     const product = new Product({
//       id: id,
//       name: req.body.name,
//       image: req.body.image,
//       category: req.body.category,
//       price: req.body.price,
//       mrp: req.body.mrp,
//       quantity: req.body.quantity,
//     });
//     console.log(product);
//     await product.save();
//     console.log("saved");
//     res.status(200).json({
//       success: true,
//       name: req.body.name,
//     });
//   } catch (error) {
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };

// // Get all products without pagination and search functionality
// // exports.getAllProducts = async (req, res) => {
// //   try {
// //     const products = await Product.findAll();
// //     res.status(200).send(products);
// //   } catch (error) {
// //     res.status(500).send({ message:"Error 500: " + error.message });
// //   }
// // };

// //get all products with pagination and search functionality
// exports.getAllProducts = async (req, res) => {
//   try {
//     // Pagination parameters
//     const page = parseInt(req.query.page) || 1; // Default page = 1
//     const limit = parseInt(req.query.limit) || 10; // Default limit = 10 products per page
//     const offset = (page - 1) * limit;

//     // Extract query parameters for search
//     const { name, category } = req.query;
//     const searchQuery = {};

//     // Search using regex for partial matching
//     if (name) {
//       searchQuery.name = { $regex: name, $options: "i" }; // 'i' for case-insensitive
//     }
//     if (category) {
//       searchQuery.category = { $regex: category, $options: "i" }; // 'i' for case-insensitive
//     }

//     // Fetch products with pagination and search conditions
//     const products = await Product.find(searchQuery).skip(offset).limit(limit);

//     // Get the total number of products matching the search criteria
//     const totalItems = await Product.countDocuments(searchQuery);

//     // Return the products with pagination information
//     res.status(200).send({
//       totalItems,
//       totalPages: Math.ceil(totalItems / limit),
//       currentPage: page,
//       products,
//     });
//   } catch (error) {
//     // Handle any errors and send a 500 status code
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };

// //Get product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     // Fetch product by ID using Mongoose
//     const product = await Product.findById(req.params.id);

//     // Check if the product was found
//     if (product) {
//       res.status(200).send(product);
//     } else {
//       res.status(404).send({ message: "Error 404: Product not found" });
//     }
//   } catch (error) {
//     // Handle any errors that occur during the database query
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };

// // Update product by ID
// exports.updateProduct = async (req, res) => {
//   try {
//     const { name, price, description, category } = req.body;

//     // Find the product by ID
//     const product = await Product.findById(req.params.id);

//     // Check if the product exists
//     if (product) {
//       // Update product fields
//       product.name = name !== undefined ? name : product.name; // Only update if a value is provided
//       product.price = price !== undefined ? price : product.price;
//       product.description =
//         description !== undefined ? description : product.description;
//       product.category = category !== undefined ? category : product.category;

//       // Save the updated product
//       await product.save();

//       // Return the updated product
//       res.status(200).send(product);
//     } else {
//       res.status(404).send({ message: "Error 404: Product not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };

// //Delete product by ID
// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findOneAndDelete({ id: req.body.id });
//     console.log("Removed");
//     res.status(200).json({
//       success: true,
//       name: req.body.name,
//     });
//   } catch (error) {
//     res.status(500).send({ message: "Error 500: " + error.message });
//   }
// };


import Product from '../models/product.model.js';

// First page response
const firstPage = async (req, res) => {
  try {
    res.status(200).send("Express App is Running");
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
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
    res.status(200).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Get all products with pagination and search functionality
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const { name, category } = req.query;
    const searchQuery = {};

    if (name) {
      searchQuery.name = { $regex: name, $options: "i" };
    }
    if (category) {
      searchQuery.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(searchQuery).skip(offset).limit(limit);
    const totalItems = await Product.countDocuments(searchQuery);
    console.log("All products fetched");
    res.status(200).send({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.find({id : req.params.id});
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Error 404: Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (products.length > 0) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ message: "Error 404: No products found in this category" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const products = await Product.find({ name: req.params.name });
    if (products.length > 0) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ message: "Error 404: No products found by this name" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name !== undefined ? name : product.name;
      product.price = price !== undefined ? price : product.price;
      product.description = description !== undefined ? description : product.description;
      product.category = category !== undefined ? category : product.category;

      await product.save();
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Error 404: Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.status(200).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).send({ message: "Error 500: " + error.message });
  }
};

// Export all functions as default
export default {
  firstPage,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByName
};
