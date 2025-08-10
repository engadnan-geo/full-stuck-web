import mongoose from "mongoose";

import {dbURL} from "./config.js"

const connectDB=async()=>{
    try {
        await mongoose.connect(dbURL);
        console.log(`connected to the database ${dbURL}`)
    } catch (error) {
        console.log(`error coonecting to the database${error}`)
        process.exit(1)
    }
}

export default connectDB