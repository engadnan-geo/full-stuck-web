import React, { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const Register = () => {

const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
})

const [loading,setloading]=useState(false)

const navigate=useNavigate()


const handleinputchange=(e)=>{
setFormData({
    ...formData,
    [e.target.id]:e.target.value
})
}

const handlesubmite=async(e)=>{
e.preventDefault();
setloading(true)

try {
    const  {data}=await axios.post("/api/user/register-user",formData)
    console.log(data)
    toast.success("succsess full ")
    setloading(false)
    navigate("/login")
    
} catch (error) {
    setloading(false)
    toast.error(error.response.data)
    console.error(error)
}
}


  return (
    <div className='w-full'>
    <Card>
    <CardHeader>
      <CardTitle>Register your info</CardTitle>
      <CardDescription>Your info is save </CardDescription>
      {/* <CardAction>Card Action</CardAction> */}
    </CardHeader>
    <CardContent>
      <form  onSubmit={handlesubmite}>
<div className='grid w-full items-center gap-4'>
<div className='flex flex-col space-y-1.5'>
<Label htmlFor="username">username</Label>
<Input id="username" placeholder="usename" onChange={handleinputchange} />
</div>

<div className='flex flex-col space-y-1.5'>
<Label htmlFor="email">email </Label>
<Input id="email" placeholder="Email"onChange={handleinputchange}/>
</div>

<div className='flex flex-col space-y-1.5'>
<Label htmlFor="password">password</Label>
<Input id="password" type="password" placeholder="password" onChange={handleinputchange}/>
</div>

<div className='flex flex-col space-y-1.5'>
<Button>{loading?"Regeister...":"Register"}</Button>
</div>


</div>

      </form>
    </CardContent>
    
  </Card>
  </div>
  )
}

export default Register