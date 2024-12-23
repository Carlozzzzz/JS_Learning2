import pkg from "mongoose";
const { model, models, Schema } = pkg;

const todoSchema = new Schema({
    text: { type: String, required: true},
    priority: { type: String, required: true},
    deadline: { type: String, required: true}
}) 

export const Todo = models.Todo || new model("Todo", todoSchema);
