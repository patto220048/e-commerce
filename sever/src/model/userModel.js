

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new  Schema({

    email:{
        type:String,
        require : true,
        unique: true,
    },
    password :{
        type: String,
        require:true,

    }
    ,
    admin : {
        type:Boolean,
        default: false,
    },
    supplier: {
        type:Boolean,
        default: false,
    },
    fullname : {
        type: String,
    },
    follower :{
        type: Array,
        default:[]
    }
    ,
    follwing :{
        type: Array,
        default:[]
    }
    ,
    countProduct : {
        type: Number,
        default: 0,
    },

    
    
},{timestamps: true})



module.exports = mongoose.model('user', User )




