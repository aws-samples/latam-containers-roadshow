import React from 'react'
import { useDispatch } from 'react-redux'
import taskModule, { getAllTodo } from '../modules/tasksModule'
import { stringToBool } from './util'
import { Task, TodoFromResponse } from '../Types'
const TableOperation: React.FC = () => {
    const dispatch = useDispatch()
    const listAllTodo = async () => {
        const response: TodoFromResponse[] = await getAllTodo()
        console.log(response)
        if (response != null) {
            const todo: Task[] = response.map(
                x => ({ "id": x.id, "done": stringToBool(x.done), "title": x.title })
            )
            dispatch(taskModule.actions.replaceTasks(todo))
        }

    }

    return (
        <div className="input-form">
            <div className="inner">
                <button onClick={listAllTodo} className="btn is-primary">List all todo</button>
            </div>
        </div>
    )
}

export default TableOperation