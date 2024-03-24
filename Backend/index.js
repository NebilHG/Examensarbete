require("dotenv").config();

const port = 3500;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const jwtSecret = process.env.JWT_SECRET;

const { error, log } = require("console");

app.use(express.json());
app.use(cors());

// API creation

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Database connection
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on("error", (err) => {
  console.log("error", err);
});

database.once("connected", () => {
  console.log("Connected to database successfully");
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error is here" + error);
  } else {
    console.log("Server is running on Port " + port);
  }
});

// Image storage engine

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// creating upload endpoint for images
app.use("/images", express.static("uploads/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    Image_url: `http://localhost/images/${req.file.filename}`,
  });
});

// Schema for creating Products
const Product = mongoose.model("Product", {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

app.post("/addproduct", async (req, res) => {
  try {
    // Validate request body data
    const { name, productImage, desc, price } = req.body;
    if (!name || !desc || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const id = uuid();

    // Create new product instance
    const product = new Product({
      id,
      name,
      productImage, // Make sure to include productImage if it's required
      desc,
      price,
    });

    // Save the product to the database
    console.log(product);
    await product.save();

    console.log("Product Saved");
    res.json({
      success: true,
      name,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Error saving product" });
  }
});

// Delete product

app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    console.log("Product Deleted");
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
});

// Schema for user model
const User = mongoose.model("User", {
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Endpoint for creating user
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Create a new user instance
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

// Endpoint for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // If user exists and password is correct, create and send a token for authentication
    const token = jwt.sign({ email: user.email }, jwtSecret);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});
