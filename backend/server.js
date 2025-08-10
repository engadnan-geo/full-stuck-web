import express from "express"
import connectDB from "./config/db.js"
import chalk from "chalk"
import { registeruser } from "./controller/user.js"
import { port } from "./config/config.js"
import userrouter from "./routes/user.js"

const app=express()

app.use(express.json());
const PORT=port || 5000



app.get("/hi",(req,res)=>{
    console.log('hi')
res.json("hi hooyo")
})

app.use("/api/user",userrouter)

connectDB()

app.listen(PORT,()=>{
console.log(`${ chalk.green.bold("server") }listen on http://localhost:${PORT}`)
})