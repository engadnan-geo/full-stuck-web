import User from "../models/User.js"

export const registeruser=async(req,res)=>{
    try {
       
        const {email,username,password}=req.body
const isuserExists=await User.findOne({$or:[
    {email:email.toLowerCase()},
    {username:username.toLowerCase()}
]})

if(isuserExists){
    return res.status(400).send("email alread exists")
}

const userinfo=new User({
    username:username,
    email:email,
    password:password
})

await userinfo.save()

return res.status(201).send(userinfo)



    } catch (error) {
        return res.status(500).json("somthing wrong "+error.message);
        
    }
}


export const userlogin=async(req,res)=>{

try {

    const{email,password}=req.body
    const isuserExists=await User.findOne({email:email.toLowerCase()}).select("+password")

    if(!isuserExists){
        return res.status(400).send("invalid email ")
    }
    if (!isuserExists.password) {
        return res.status(500).send("Password not found in database");
      }

    const ispasswordcorect=await isuserExists.comparePassword(password);
    if(!ispasswordcorect){
        return res.status(400).send("invalid password ")
    }
    res.status(201).send("login success")
    
} catch (error) {
    console.log("error at login ",error)
    res.status(401).send(error.message)
}

}