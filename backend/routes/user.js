import express from "express"
import { registeruser, userlogin } from "../controller/user.js"

const router=express.Router()


router.post("/register-user", registeruser)

router.post("/login-user",userlogin)

export default router