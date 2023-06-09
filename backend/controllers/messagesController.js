const Messages = require("../model/messagesModel");

module.exports.addMessage = async(req,res,next)=>{
   try{
        const {from,to,message}= req.body;
        const data = await Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from
        });
        if(data)return res.json({msg:"message added"});
        return res.json({msg:"Failed to add message"})
   }catch(ex){
    next(ex);
   }
}

module.exports.getAllMessage = async(req,res,next)=>{
    try{
        const {from,to}= req.body;
        const messages = await Messages.find({
            users:{
                $all:[from,to]
            }
        })
        .sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()=== from,
                messages:msg.message.text
            }
        })
        res.json(projectedMessages)
   }catch(ex){
    next(ex);
   }
}