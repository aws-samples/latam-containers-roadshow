import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, TodoFromResponse } from '../Types'

type State = {
    count: number
    endpoint: string
    tasks: Task[]
}

const initialState: State = {
    count: 0,
    endpoint: `http://${window.location.hostname}/api`,
    tasks: []
}

export const getAllTodo = async () => {
    console.log("call alltodo operation");
    const response = await fetch(`${initialState.endpoint}/alltodo`, { mode: 'cors' });
    return response.json()
}

export const createTodo = async (param: TodoFromResponse) => {
    console.log("call createTodo operation")
    const response = await fetch(`${initialState.endpoint}/createtodo`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })
    console.log("todo created")
}

export const deleteTodo = async (id: number) => {
    console.log("call deleteTodo operation")
    const response = await fetch(`${initialState.endpoint}/deletetodo/${id}`)
    console.log("todo deleted")
}

const tasksModule = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state: State, action: PayloadAction<TodoFromResponse>) {
            state.count++

            const newTask: Task = {
                id: action.payload.id,
                title: action.payload.title,
                done: false
            }

            state.tasks = [newTask, ...state.tasks]
        },
        replaceTasks(state: State, action: PayloadAction<Task[]>) {
            state.tasks = action.payload
        },
        doneTask(state: State, action: PayloadAction<Task>) {
            const task = state.tasks.find(t => t.id === action.payload.id)
            if (task) {
                task.done = !task.done
            }
        },
        deleteTask(state: State, action: PayloadAction<Task>) {
            state.tasks = state.tasks.filter(t =>
                t.id !== action.payload.id
            )
        }
    }
})

export const {
    addTask, doneTask, deleteTask, replaceTasks
} = tasksModule.actions

export default tasksModule