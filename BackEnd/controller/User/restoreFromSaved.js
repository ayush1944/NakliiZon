const addToCartModel = require("../../models/addToCart");

const restoreFromSaved = async (req, res) => {
    try {
        const currentUserId = req.userId; 
        const savedProductId = req.body._id; // Assuming the product ID is sent in the request body

        const savedProduct = await addToCartModel.findOne({ 
            userId: currentUserId, 
            savedItems: { $elemMatch: { _id: savedProductId } } 
        });

        if (!savedProduct) {
            return res.status(404).json({
                message: "Product not found in saved items",
                error: true,
                success: false,
            });
        }

        // Add the product back to the cart
        await addToCartModel.updateOne(
            { userId: currentUserId },
            {
                $addToSet: { cartItems: savedProduct.savedItems.id(savedProductId) }, // Move item to cart
                $pull: { savedItems: { _id: savedProductId } } 
            }
        );

        res.json({
            message: "Product restored to cart",
            success: true,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = restoreFromSaved;
