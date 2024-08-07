// productController.js
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const {
      sellerId,
      name,
      description,
      detail,
      actualPrice,
      discountPercentage,
      category,
      subcategory,
      quantity,
      brand,
      images,
    } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !detail:
        return res.json({ error: "Detail is required" });
      case !actualPrice:
        return res.json({ error: "Actual price is required" });
      case !discountPercentage:
        return res.json({ error: "Discount percentage is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !subcategory:
        return res.json({ error: "Subcategory is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !images || images.length === 0:
        return res.json({ error: "Images are required" });
    }

    const product = new Product({
      ...req.fields,
      detail: JSON.parse(req.fields.detail),
      subcategory,
      sellerId,
      images: JSON.parse(images),
    });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      detail,
      actualPrice,
      discountPercentage,
      category,
      subcategory,
      quantity,
      brand,
      newImages, 
      
    } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !detail:
        return res.json({ error: "Detail is required" });
      case !actualPrice:
        return res.json({ error: "Actual price is required" });
      case !discountPercentage:
        return res.json({ error: "Discount percentage is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !subcategory:
        return res.json({ error: "Subcategory is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !newImages:
        return res.json({ error: "Images are required" });
    }

   
    const images = [...JSON.parse(newImages || '[]')];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        detail: JSON.parse(req.fields.detail),
        subcategory,
        images,
      },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});



const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error in removing product" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error in fetching products" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(1000)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error in fetching all products" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      // Ensure at least one of the rating or comment is provided
      if (!rating && !comment) {
        res.status(400);
        throw new Error("Rating or comment is required");
      }

      const review = {
        name: req.user.username,
        rating: rating ? Number(rating) : null, // Allow null rating if only comment is provided
        comment: comment || "", // Default to empty string if comment is not provided
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      // Calculate the new rating only if the new review includes a rating
      if (rating) {
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
      }

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(30);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(30);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length > 0) {
      args.actualPrice = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error in filtering products" });
  }
});
const SearchFetchProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({ ...keyword }).limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error in fetching products" });
  }
});


export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  SearchFetchProducts,
};
