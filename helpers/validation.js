const Joi = require('joi')

const customerSignup = async(customer)=>{
    const schema = Joi.object({
        email: Joi.string().required().email().messages({
            'string.base':'Email should be string.',
            'string.empty':'Email field cannot be left empty.',
            'string.email':'Email format is not valid'
        }),
        password: Joi.string().required().min(8).max(16).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/).messages({
            'string.base':'Password should be string.',
            'string.empty':'Password field cannot be left empty.',
            'string.min':'Password length must be 8-16 characters.',
            'string.max':'Password length must be 8-16 characters.',
            'string.pattern.base':'Password contain atleast one character, one digit and one special character.',
        }),
        cpassword: Joi.any().equal(Joi.ref('password')).required().messages({ 
            'string.base':'Confirm Password should be string.',
            'string.empty':'Confirm Password field cannot be left empty.',
            'any.only': 'Password & confirm password does not match' ,
        }),
        type: Joi.number().required().valid(1, 2, 3).messages({
            'number.base':'Type should be string.',
            'number.empty':'Type field cannot be left empty.',
            'any.only':'Type must be one of [1, 2, 3]'
        })
    })

    const { error } = schema.validate(customer)
    return error;

}

const login = async(validate)=>{
    const schema = Joi.object({
        email: Joi.string().required().email().messages({
            'string.base':'Email should be string.',
            'string.empty':'Email field cannot be empty.',
            'string.email':'Email format is not valid.'
        }),
        password: Joi.string().required().messages({
            'string.base':'Password should be string.',
            'string.empty':'Password field cannot be left empty.',
        }),
    })
    const { error } = schema.validate(validate)
    return error;
}

const socialLogin = async(validate)=>{
    const schema = Joi.object({
        username: Joi.string().required().pattern(/^[a-zA-Z\s]+$/).max(60).messages({
            'string.base':'First Name should be string.',
            'string.empty':'First Name field cannot be left empty.',
            'string.max':'First Name should be less than 60 characters.',
            'string.pattern.base':'First Name cannot contain numeric characters or special characters.',
        }),
        email: Joi.string().allow(null,'').email().messages({
            'string.base':'Email should be string.',
            'string.email':'Email format is not valid.'
        }),
        socialId: Joi.string().required().messages({
            'string.base':'Social ID should be string.',
            'string.empty':'Social ID field cannot be left empty.',
        }),
        type: Joi.number().required().valid(1, 2, 3).messages({
            'number.base':'Type should be string.',
            'number.empty':'Type field cannot be left empty.',
            'any.only':'Type must be one of [1, 2, 3]'
        })
        
    })

    const {error} = schema.validate(validate)
    return error;
}
module.exports={
    customerSignup,
    login,
    socialLogin
}