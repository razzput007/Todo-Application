const express=require('express');
const { createTodo } = require('./type');
const { todo } = require('./db');

const app=express();

app.use(express.json());
const PORT=3000;
app.post('/todo',async(req,res)=>{
    const user=req.body;
    const userParse=createTodo.safeParse(user);
    if(!userParse.success){
        res.status(400).json({
            message:"You sent wrong input"
        })
        return;
    }

     await todo.create({
        title:req.body.title,
        description:req.body.description,
        completed:false
     })

     res.json({
        message:"Todo created successfully"
     })
})

app.get('/todos',async(req,res)=>{
    const todos=await todo.find({})
    res.json({
        todos
    })
})

app.put('/completed',async(req,res)=>{
   const updateUser=req.body;
   const updateUserParse=createTodo.safeParse(updateUser);
   if(!updateUserParse.success){
    res.status(411).json({
        message:"You sent wrong input"
    })
    return;
   }
   const _id=req.body.id;
   const todo=await todo.findByIdAndUpdate(_id,{completed:true},{new:true})

   res.json({
    message:"Todo updated successfully"
   })

})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})