import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

const {Schema}=mongoose

const userschema=new Schema({
    email:{type:String,lowercase:true,unique:true, required:true,
        validate:[validator.isEmail,"please enter avlid email"]
    },
    username:{
        type:String,lowercase:true,unique:true,required:true
    },
    password:{
        type:String,select:false,
        // validate:[
        //     {
        //         validator:value=>validator.isStrongPassword(value),
        //         message:"password most contain diffrent characters"
        //     }
        // ]
    }
},{
    timestamps:true
})


userschema.pre("save",async function(next){
if(!this.isModified("password")){
    return next()
}

const salt =await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt)

next()


})


userschema.methods.comparePassword=async function(givenpassword){
    if (!this.password || !givenpassword) {
        throw new Error("Missing data or hash for password comparison");
      }
return await bcrypt.compare(givenpassword,this.password)
}


const User=mongoose.model("user",userschema);

export default User