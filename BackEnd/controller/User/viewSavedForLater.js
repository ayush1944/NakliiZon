const SavedItemsModel = require("../../models/savedItems");

const viewSavedForLater = async (req, res) => {
    try {
        const currentUserId = req.userId;

        // Fetch all saved items for the current user
        const savedItems = await SavedItemsModel.find({ userId: currentUserId }).populate('productId'); // Populate with product details if needed

        res.json({
            message: "Fetched saved items successfully",
            data: savedItems,
            error: false,
            success: true,
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = viewSavedForLater;
