const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res) {
    try {
        const {email, password} = req.body

        if(!email){
            throw new Error ("Please Provide Email")
        }
        if(!password){
            throw new Error ("Please Provide password")
        }

        const user = await userModel.findOne({email})
        

        if(!user){
            throw new Error ("User Not Found")
        }   

        if (!user.password) {
            throw new Error("User password is not set");
        }
        
        const checkPassword = await bcrypt.compare(password,user.password)

        
        if(checkPassword){
            const tokenData = {
                email: user.email,
                _id : user._id
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});

            const tokenOption = {
                httpOnly: true,
                secure : true
            }
            res.cookie("token",token,tokenOption).json({
                message : "Login Successfully",
                data : token,
                userId: user._id,
                success : true,
                error : false
            })
        }else{
            throw new Error("Please Check The Password")
        }

    } catch (err) {
        res.json({
            message : err.message || err,
            error : true, 
            success : false,
        })
    }
}

module.exports = userSignInController