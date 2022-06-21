import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, createTodo } from '../modules/tasksModule'
import { TodoFromResponse } from '../Types'
import { useSelector } from 'react-redux'

const TaskInput: React.FC = () => {
    const dispatch = useDispatch()
    const [inputTitle, setInputTitle] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value)
    }

    const handleSubmit = async () => {
        const param: TodoFromResponse = { "id": Date.now(), "title": inputTitle, "done": "false" }
        console.log(param)
        await createTodo(param)
        dispatch(addTask(param))
        setInputTitle('')
    }

    return (
        <div className="input-form">
            <div className="inner">
                <input
                    type="text"
                    className="input"
                    value={inputTitle}
                    onChange={handleInputChange}
                    placeholder="Input your todo"
                />
                <button onClick={handleSubmit} className="btn is-primary">add</button>
            </div>
        </div>
    )
}

export default TaskInput