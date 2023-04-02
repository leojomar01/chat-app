const User = require("../model/userModel");

module.exports.register = async(req,res,next)=>{
    try{
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

module.exports.updateUserPassword = async (req, res, next) => {
    try {
      const { userId, newPassword } = req.body;
      const updatedUser = await User.updateOne({ _id: userId }, { password: newPassword });
      if (updatedUser.modifiedCount === 1) {
        return res.json({
          msg: "User password updated successfully",
          status: true,
        });
      }
      return res.json({
        msg: "Failed to update user password",
        status: false,
      });
    } catch (ex) {
      next(ex);
    }
  };


  
module.exports.deleteAccount = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const result = await User.findByIdAndDelete(userId);
      if (!result) {

        return res.status(404).json({ 
            status:false,
            msg: "User not found" });
      }
      return res.json({
        status: true,       
        msg: "User deleted successfully" 
    });
    } catch (error) {
      next(error);
    }
  };