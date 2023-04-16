const mongoose = require('mongoose')
const validator = require('validator')
const User = mongoose.model('User',{
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password : {
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    email : {
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(val){
            if (!validator.isEmail(val)) {
                throw new Error("Email Is Invalid")
            }
        }
    },
    age : {
        type : Number,
        default : 18,
        validate(val){
            if (val <= 0) {
                throw new Error("age is must a positive num")
            }

        }
    },
    city : {
        type : String,
    }

})

module.exports=User