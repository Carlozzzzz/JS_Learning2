/**
  https://www.youtube.com/watch?v=TcJW400uoEc&ab_channel=CodewithZihad
*/


// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js"

dotenv.config();
const app = express();
const port = process.env.port || 4000;

// middleware
app.use(express.json())


connectToDB();

// declaring an API
// TODO APIs
app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo Lists Retrieved Successfully",
      data: result
    });
  } catch(error) {
    res.send({
      success: false,
      message: "Failed to retrieve data",
      data: result
    });
  }
})


app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body
  console.log(todoDetails)
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "Todo Created Successfully",
      data: result
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to create todo",
      data: result
    });
  }
})


app.get("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  
  try {
    const result = await Todo.findById(todoId)
    res.send({
      success: true, 
      message: "Todo is retrieved successfully",
      data: result
    })
  } catch (error) {
    res.send({
      success: false, 
      message: "Failed to retrieved the todo",
      data: result
    })
  }
  
})

app.patch("/:todoId", async(req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  
  console.log(updatedTodo)
  
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    
    res.send({
      success: true,
      message: "Todo is updated successfully",
      data: result
    });
  } catch (error) {
    res.send({
      success: true,
      message: "Failed to update the Todo",
      data: result
    });
  }
});


app.delete("/delete/:todoId", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.send({
      success: true,
      message: "Todo is deleted successfully",
      data: null
    })
  } catch (error) {
    res.send({
      success: true,
      message: "Failed to delete the todo",
      data: null
    })
  }
})
app.listen(4000, ()=> {
  console.log(`Server is running in PORT: ${port}`)
})