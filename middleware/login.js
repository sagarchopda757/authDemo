const jwt = require('jsonwebtoken')
const { response } = require('../helpers/common')

const isLogin = async (req,res,next)=>{
try {
    

    const access_token = req.headers.access_token
    if(!access_token){
        return res.status(200).json(response(false, "Please login first."))
    }

 const data = jwt.verify(access_token,process.env.JWT_SECRET)
        if(!data){
            return res.status(200).json(response(false, "Session expired, please login to continue."))
        }
    next()
} catch (error) {
    console.log(error);
    return res.status(200).json(response(false,"Invalid Token"))
}
}

module.exports={
    isLogin
}