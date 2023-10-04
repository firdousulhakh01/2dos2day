import React, { useState } from 'react'
import NavTimeBar from './Components/NavTimeBar'
import ToDoListMain from './Components/ToDoListMain'

function App() {
  const [newListRender, setNewListRender] = useState(0)

  return (<>
    <NavTimeBar setNewListRender={setNewListRender} />
    <ToDoListMain newListRender={newListRender} />

  </>)

}

export default App