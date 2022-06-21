import React from 'react'
import { Task } from '../Types'
import { useDispatch } from 'react-redux'
import { doneTask, deleteTask } from '../modules/tasksModule'
import { deleteTodo } from '../modules/tasksModule'

type Props = {
    task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {
    const dispatch = useDispatch()
    const removeTask = async () => {
        deleteTodo(task.id)
        dispatch(deleteTask(task))
    }

    return (
        <li className={task.done ? 'done' : ''}>
            <label>
                <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={() => dispatch(doneTask(task))}
                    defaultChecked={task.done}
                />
                <span className="checkbox-label">{task.title}</span>
            </label>
            <button
                onClick={removeTask}
                className="btn is-delete"
            >delete</button>
        </li>
    )
}

export default TaskItem