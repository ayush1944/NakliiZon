const addToCartModel = require("../../models/addToCart");

async function addToCartController(req, res) {
  try {
    const { productId, currentUserId } = req.body;

    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUserId });

    if (isProductAvailable) {
      const payluload = {
        productId,
        quantity: 1,
        userId: currentUserId,        
      }
      const updatedNewCart = new addToCartModel(payluload)
      const updatedCart = await updatedNewCart.save()

      return res.status(200).json({
        message: "Product quantity updated successfully.",
        success: true,
        error: false,
        data: updatedCart,
      });
    }

    // Add new product to cart if not already present
    const payload = {
      productId,
      quantity: 1,
      userId: currentUserId,
    };
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(200).json({
      message: "Product added to cart successfully.",
      success: true,
      error: false,
      data: saveProduct,
    });

  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = addToCartController;
