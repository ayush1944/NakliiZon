const addToCartModel = require("../../models/addToCart");
const SavedItemsModel = require("../../models/savedItems"); // Make sure this is imported

const saveForLater = async (req, res) => {
    try {
        const currentUserId = req.userId; 
        const addToCartProductId = req.body?._id;

        // Validate the incoming data
        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        // Find the cart item by user ID and product ID
        const cartItem = await addToCartModel.findOne({
            userId: currentUserId,
            _id: addToCartProductId,
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        // Remove the item from the cart
        await addToCartModel.deleteOne({
            userId: currentUserId,
            _id: addToCartProductId,
        });

        // Save the item to saved items
        const savedItem = await SavedItemsModel.create({
            userId: currentUserId,
            productId: cartItem.productId, 
            quantity: cartItem.quantity, 
        });

        // Ensure that saved item was created successfully
        if (!savedItem) {
            return res.status(500).json({
                message: "Failed to save the item for later",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product saved for later",
            error: false,
            success: true,
        });
        
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: err?.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = saveForLater;
