const uploadProductPermission = require("../../Helpers/permission");
const productModel = require("../../models/productModel");

async function updateProduct(req,res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission Denied");
        }

        const { _id,...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(200).json({
            message: "Product Updated Successfully",
            error: false,
            success: true,
            data: updateProduct         
        });
    } catch  (err) {
        // Handle validation errors and other types of errors
        res.status(400).json({
          message: err.message || "Error occurred during Updating Product",
          error: true,
          success: false,
        });
      }
}

module.exports = updateProduct;