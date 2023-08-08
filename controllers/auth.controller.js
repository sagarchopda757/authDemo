const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../helpers/common')
const validation = require('../helpers/validation')
//Models
const Auth = require('../models/Auth');


//____________________________________________Signup 
const signup = async (req, res) => {
    try {
        const customer = req.body;
        // Validation 
        const validationResult = await validation.customerSignup(customer);
        if (validationResult) {
            return res.status(200).json(response(false, validationResult.details[0].message))
        }

        const isExist = await Auth.findOne({email:customer.email})
        if (isExist) {
            return res.status(200).json(response(false,'Customer Already Exist'))
        }
        
       // Hashing
        const salt = bcrypt.genSaltSync(12)
        const passwordHash = bcrypt.hashSync(customer.password, salt)
        customer.password = passwordHash

        //Save Data
        const Customer = Auth(customer);
        const createCustomer = await Customer.save();
        
        return res.status(200).json(response(true,'Signup Successful',createCustomer))
    } catch (error) {
        console.log(error);
        return res.status(500).json(response(false, 'Internal Server Error'))
    }
}
//_________________________________________________Login
const login = async (req,res)=>{
    try {
        const body = req.body
        const validationResult = await validation.login(body);

        if (validationResult) {
            return res.status(200).json(response(false, validationResult.details[0].message))
        }
        
        const isExist = await Auth.findOne({email:body.email,type:1})

        if(!isExist){
            return res.status(200).json(response(false,'Invalid Crediantials'))  
        }
        
        const comparepassword = await bcrypt.compareSync(body.password, isExist.password);
        if(!comparepassword){
            return res.status(200).json(response(false,'Invalid Crediantials'))
        }

        const token = jwt.sign({ id: isExist.id }, process.env.JWT_SECRET,{expiresIn:'1d'}); // Generate a token for the customer
       
        return res.status(200).json(response(true,'Login Successful',token))
    } catch (error) {
        console.log(error);
        return res.status(500).json(response(false, 'Internal Server Error'))
    }
}
//___________________________________________me
const me = async (req,res)=>{
    try {
        const data = jwt.verify(req.headers.access_token,process.env.JWT_SECRET)
        const user = await Auth.findById(data.id)
        return res.status(200).json(response(true,'Homepage',user))
    } catch (error) {
        console.log(error);
        return res.status(500).json(response(false,"Internal Server Error"))
    }
}
//_________________________________________________socialLogin
const socialLogin = async (req,res)=>{
    try {
        const body = req.body;
        // console.log(body);
        // Validation 
        const validationResult = await validation.socialLogin(body);
        if (validationResult) {
            return res.status(200).json(response(false, validationResult.details[0].message))
        }

        // Check Weather User is exist or not.
        const isExist = await Auth.findOne({socialId:body.socialId})
       if(!isExist){
            // Create new User 
            const Customer = await Auth(body)
            const addCustomer = Customer.save()
            console.log(addCustomer);
            // Generate TOKEN
            const token = jwt.sign({ id: addCustomer.id }, process.env.JWT_SECRET,{expiresIn:'1d'})
            return res.status(200).json(response(true, 'Account created and logged in successfully.',token))
        }else{

            const token = jwt.sign({ id: isExist.id }, process.env.JWT_SECRET,{expiresIn:'1d'});
            return res.status(200).json(response(true, 'login successfully.',token))
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(response(false, 'Internal server error.'))
    }
}
module.exports = {
    signup,
    login,
    me,
    socialLogin
}