const joi = require("joi");


const singupValidation = (req,res,next) =>{
    const schema = joi.object({
        name : joi.string().min(3).max(100).required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(100).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({msg : "Bad request",error})
    };

    next();

}


const LoginValidation = (req,res,next) =>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(8).max(100).required()
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({msg : "Bad request",error})
    };

    next();

}

module.exports = {
    singupValidation,
    LoginValidation
}