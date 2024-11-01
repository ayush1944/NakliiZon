const express = require("express");
const router = express.Router();

const authToken = require("../middleWare/authToken");
const userSignUpController = require("../controller/User/userSignUp");
const userSignInController = require("../controller/User/userSignIn");
const userDetailsController = require("../controller/User/userDetails");
const userLogout = require("../controller/User/userLogout");
const allUsers = require("../controller/User/allusers");
const updateUser = require("../controller/User/updateUser");
const uploadProductController = require("../controller/Product/uploadProduct");
const getProductController = require("../controller/Product/getProduct");
const updateProduct = require("../controller/Product/updateProduct");
const deleteProductController = require("../controller/Product/deleteProduct");
const getCategoryProduct = require("../controller/Product/getCategoryProduct");

const getCategoryWiseProduct = require("../controller/Product/getCategoryProductList");
const getProductDetails = require("../controller/Product/productDetails");
const addToCartController = require("../controller/User/addToCartController");
const countAddToCartProduct = require("../controller/User/countAddToCartProduct");
const addToCartViewProduct = require("../controller/User/viewCartProduct");
const updateAddToCartProduct = require("../controller/User/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/User/deleteAddToCartProduct");
const saveForLater = require("../controller/User/saveForLater");
const viewSavedForLater = require("../controller/User/viewSavedForLater");
const restoreFromSaved = require("../controller/User/restoreFromSaved");
const searchProduct = require("../controller/Product/searchProduct");
const filterProductController = require("../controller/Product/filterProduct");




router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userlogout", userLogout)

// admin panel
router.get("/all-users", authToken,allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProduct);
router.delete("/delete-product",authToken,deleteProductController);
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/product-category", getCategoryWiseProduct )
router.post("/product-details", getProductDetails)
router.get("/search-product",searchProduct)
router.post("/filter-product",filterProductController)

// user Add to Cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get('/view-cart-product',authToken,addToCartViewProduct)
router.post('/update-cart',authToken,updateAddToCartProduct)
router.post('/delete-cart',authToken,deleteAddToCartProduct)
router.post('save-for-later',saveForLater,authToken)
router.post("/viewed-product", authToken,viewSavedForLater);
router.post('/restore-from-saved',authToken,restoreFromSaved)



module.exports = router;    