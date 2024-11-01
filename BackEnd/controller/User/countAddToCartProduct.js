const addToCartModel = require("../../models/addToCart")

async function countAddToCartProduct(req, res) {
    try {
        // const userId = req?.body?.userId || req?.userId; 
        const userId = req?.body?.userId || req.user?.id || req.headers['x-user-id']; // Ensure correct user identification
        console.log("Counting cart items for user:", userId); 

        const count = await addToCartModel.countDocuments({ userId: userId });
        console.log("Count of products in cart:", count); 

        res.json({
            status: true,
            message: "Count of products in cart",
            data: { count },
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = countAddToCartProduct;