const express = require('express')
const mongoose = require('mongoose')

const userModel = require("./models/User")
const app=express()
require('dotenv').config({path:'config/.env'})
app.use(express.json())
/* Connect Application with database  */
 mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true },(err)=>{
     if (err)
     throw err;
     console.log('Data base connected ...')

 })
app.listen(5000,()=>{
    console.log('connected...')
})
/* Save person */
const user = new userModel({ firstname: 'olfa' ,age:25, favoriteFoods: ["ice-Cream"]});
user.save(function (err) {
  if (err)
  throw err; 
  console.log('user saved!!')  
 
  // saved!
});
/** Create many People with `Model.create()` */
var arrayOfPeople = [
    {firstname: "samir", age: 74,   favoriteFoods: ["pizza"]},
    {firstname: "safa", age: 76,    favoriteFoods: ["roast chicken"]},
    {firstname: "rayhan", age: 78, favoriteFoods: ["hamburger"]}
   ];
   userModel.create (arrayOfPeople,(err)=>{
    if (err) console.log("opps erreur")
    else
    console.log("data added")
  }
  )
  //Find persons by given name !
userModel.find({ name: 'samir' }).exec((err,user)=>{
    err ? console.log(err)  : console.log(" user by this name :",user)
  });
  //Find persons by favoriteFoods !   
userModel.find({ favoriteFoods: 'hamburger' }).exec((err,user)=>{
    err ? console.log(err)  : console.log("Person has favorit food hamburger is :",user)
  });
  //Find persons by id  !

var id = '60a4c9ce0ee0ad2e8860994e';

userModel.findById(id, function (err, user) {
    if (err){
        console.log(err);
    }
    else{
        console.log("person with this id is  : ", user);
    }
});
// Updates person age : 
var firstname = 'rayhan';
userModel.update({ firstname:firstname }, {$set: { age: 27 }}
,(err,userModel)=>{

    if (err){
      console.log(err);
  }
  else{
      console.log("Person  age after update  : ", user);
  }
  });
  //Delete person by given id : 
  var id='60a4c9ce0ee0ad2e8860'
   userModel.findOneAndRemove({ _id: id },(err,user)=>{
    if (err){
      console.log(err);
  }
  else{
      console.log("Person deleted with success : ", user);  
    }
   });
   //Delete Many Documents   
var name='safa'
userModel.deleteMany({firstname: firstname },(err,user)=>{
 if (err){
   console.log(err);
}
else{
   console.log("Person deleted with success  ", user);  
 }
});
//// Chain Search Query Helpers to Narrow Search Results
 userModel.find({ favoriteFoods:{$in:['roast chicken']}}).sort({firstname: 1}).limit(2) .select({age: 0}) 
 .exec((err,user)=>{
  err ? console.log(err)  : console.log(" Result of Chain Search :",user)
});           