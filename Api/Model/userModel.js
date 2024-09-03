const mongoose = require('mongoose');
 const slugify =require('slugify');
 const validator = require('validator');
const userSchema =new mongoose({
    name:{type:String, required:true,unique:true,trim:true,maxlength:40,minlength:40},
    email:{type:String, required:true, unique:true,lowercase:true,validator:[validator.isEmail,"Pls Provide a valid email"]},
    photo:{type:String},
    role:{type:String, required:true, default:"user"},
    bio:{type:String, required:false},
    location:{type:String, required:false},
    website:{type:String, required:false},
        password:{type:String, required:true,minlength:8,maxlength:15},
    passwordConfirm:{type:String, required:true,minlength:8,maxlength:15},
    address:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    profileImage:{type:String, required:false},
});
const User =mongoose.model("User",userSchema);

module.exports = User;