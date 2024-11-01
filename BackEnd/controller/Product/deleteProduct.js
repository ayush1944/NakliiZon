const deleteProductPermission = require("../../Helpers/deletePermission");
const productModel = require("../../models/productModel");

async function deleteProductController(req,res) {
    try {
        if (!deleteProductPermission(req.userId)) {
            throw new Error("Permission Denied");
        }
        const { _id,...resBody} = req.body
        const deleteProduct = await productModel.findByIdAndDelete(_id, resBody)

        res.status(200).json({
            message: "Product deleted Successfully",
            error: false,
            success: true,
            data: deleteProduct         
        });

    } catch(err) {
        // Handle validation errors and other types of errors
        res.status(400).json({
          message: err.message || "Error occurred during Deleting Product",
          error: true,
          success: false,
        });
    }
} 

module.exports = deleteProductController;