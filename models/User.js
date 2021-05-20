const mongoose=require('mongoose');
const validator=require('validator');
/*Create A User Schema*/
const userSchema=new mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        validate : (value)=> validator.default.isLength(value,{max:7})
    },
    age:Number,
    favoriteFoods:[{
        type:String
    }],
})
//Export Model
module.exports=mongoose.model('user',userSchema)