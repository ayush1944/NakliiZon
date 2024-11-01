const uploadProductPermission = require("../../Helpers/permission")
const productModel = require("../../models/productModel");


async function uploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission Denied");
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(200).json({
            message: "Product Uploaded Successfully",
            error: false,
            success: true,
            data: saveProduct  // Return saveProduct instead of product
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "Error occurred during Upload Product",
            error: true,
            success: false,
        });
    }
}

module.exports = uploadProductController