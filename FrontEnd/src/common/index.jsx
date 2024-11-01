const backendDomain = "http://localhost:8080"

const SummeryApi = {
    SignUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    SignIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    Current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userlogout`,
        method : "get"
    },
    alluser:{
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    updateUser:{
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct :{
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    getproduct : {
        url : `${backendDomain}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    },
    deleteProduct : {
        url : `${backendDomain}/api/delete-product`,
        method : "delete"
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/product-category`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method: "post"
    },
    countAddToCartProduct : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    viewAddToCartProduct : {
        url : `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    deleteAddToCartProduct : {
        url : `${backendDomain}/api//delete-cart`,
        method: "post",
    },
    updateAddToCartProduct:{
        url : `${backendDomain}/api/update-cart`,
        method: "post",
    },
    saveForLater:{
        url : `${backendDomain}/api/save-for-later`,
        method : "post"
    },
    viewSavedForLater :{      
        url : `${backendDomain}/api/viewed-product`,
        method : "post"
    },
    restoreFromSaved : {
        url : `${backendDomain}/api/restore-from-saved`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/api/search-product`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    }
}

export default SummeryApi