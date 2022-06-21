import React from 'react'
import TaskList from './components/TaskList'
import TaskInput from './components/TaskInput'
import TableOperation from './components/TableOperation'
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <TaskInput />
      <TableOperation />
      <TaskList />
    </div>
  )
}

export default App