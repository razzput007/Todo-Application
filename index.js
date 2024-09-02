const express=require('express');
const { createTodo } = require('./type');

const app=express();

app.use(express.json());
const PORT=3000;
app.post('/todo',(req,res)=>{
    const user=req.body;
    const userParse=createTodo.safeParse(user);
    if(!userParse.success){
        res.status(400).json({
            message:"You sent wrong input"
        })
        return;
    }
})

app.get('/todos',(req,res)=>{

})

app.put('/completed',(req,res)=>{
   const updateUser=req.body;
   const updateUserParse=createTodo.safeParse(updateUser);
   if(!updateUserParse.success){
    res.status(411).json({
        message:"You sent wrong input"
    })
    return;
   }
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})