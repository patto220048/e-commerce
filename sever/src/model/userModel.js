

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new  Schema({
    email :{
        type: String,
        required: true,
        lowcase: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    fullName : {
        unique: true,
        type: String,
        maxlength: 50
    },
    region:{
        type: String,
        maxlength: 50
    },
    age: {
        type: Number,
    }
    ,
    friend:{
        type: Array,
        default : [],
    },
    friendUser: {
        type: Array,
        default : [],
    },
    admin:{
        type:Boolean,
        default: false,
    },
    userImg:{
        type: String,
    },
    userCoverImg:{
        type: String,
    },
    follower :{
        type: Array,
        default: [],
    },
    flowing:{
        type: Array,
        default: [],    
    },
 
    followUser:{
        type:Number,
        default: 0,
    }



    
    
},{timestamps: true})



module.exports = mongoose.model('users', User )




