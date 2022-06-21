import React from 'react'
import TaskItem from './TaskItem'
import { useSelector } from 'react-redux'
import { RootState } from '../rootReducer'

const TaskList: React.FC = () => {
    const { tasks } = useSelector((state: RootState) => state.tasks)

    return (
        <div className="inner">
            {
                tasks.length <= 0 ? 'No todo item' :
                    <ul className="task-list">
                        {tasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
            }
        </div>
    )
}

export default TaskList