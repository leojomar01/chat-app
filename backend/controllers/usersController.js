const User = require("../model/userModel");

module.exports.register = async(req,res,next)=>{
    try{
        console.log(req.body)
        const {username,password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({
                msg:"username already used", 
                status: false
            })
        }
        const user = await User.create({
            username,
            password
        });
        delete user.password;
        return res.json( {status:true,user})
    } catch(ex){
        next(ex)
    }
}

module.exports.login = async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({
                msg:"Incorrect Username", 
                status: false
            })
        }
        if(password !== user.password){
            return res.json({
                msg:"Incorrect Password", 
                status: false
            })
        }
        
        delete user.password;
        return res.json( {status:true,user})
    } catch(ex){
        next(ex)
    }
}

module.exports.getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find({_id:{$ne:req.params._id}}).select(['username','_id'])
        return res.json(users);
    }catch(ex){
        next(ex)
    }
}