const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
    try {

        const allProduct = await productModel.find().sort({ createdAt: -1 });

        // Return a successful JSON response with the product data
        res.json({
            message: "All Product",
            data: allProduct,
            success: true,
            error: false,
        });

    } catch (err) {
        // Catch any errors and return a failure response
        res.status(400).json({
            message: err.message || err, // Log the error message
            error: true,
            success: false,
        });
    }
};

module.exports = getProductController;
