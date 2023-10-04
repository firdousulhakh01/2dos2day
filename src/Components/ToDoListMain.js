import React, { useEffect, useRef, useState } from 'react'
import { isEmpty, filter, map } from 'lodash';
import DoneDeletedSection from './DoneDeletedSection'
import './ToDoListMain.css';
import { FaPlusSquare } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { MdDelete, MdDoneOutline } from "react-icons/md";

const toDoListBackGroundColors = ['text-bg-secondary', 'text-bg-primary', 'text-bg-success', 'text-bg-danger']
var toDoListBackGroundColorIndex = 0, toDoListIndex = 0;

function ToDoListMain({ newListRender }) {
  const [toDoListBackGroundColor, setToDoListBackGroundColor] = useState(toDoListBackGroundColors[0])
  const [toDo, setToDo] = useState('')
  const [toDos, setToDos] = useState([])
  const [title, setTitle] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [temp, setTemp] = useState()

  const titleInputField = useRef()
  const toDoInputField = useRef()

  useEffect(() => {
    setToDos([])
    setTitle('')
    setToDo('')
    setEditMode(false)

    if (newListRender) titleInputField.current.focus()

    toDoListBackGroundColorIndex = 0; toDoListIndex = 0
    setToDoListBackGroundColor(toDoListBackGroundColors[0])

  }, [newListRender])

  const handleUpdate = (obj, pair) => {
    setToDos(map(toDos, (todo) => todo.id === obj.id ? { ...todo, [pair]: true } : todo))

  }
  const handleEdit = (ob) => {
    setTemp({ t1: ob.text, t2: ob.id })
    toDoInputField.current.focus()
    setEditMode(true)
  }

  return (<>
    {
      !newListRender ? '' : <>
        <div className='row'>
          <div className='col'>
          </div>
          <div className={`col-10 col-md-7 col-lg-5 ${toDoListBackGroundColor} border border-warning border-3 rounded-3 p-3 position-relative`}>
            <div className='text-bg-light backGroundColorIcon border border-warning border-3 rounded-circle text-center pt-1' title='Background Color' onClick={() => {
              if (toDoListBackGroundColorIndex < 3)
                setToDoListBackGroundColor(toDoListBackGroundColors[++toDoListBackGroundColorIndex])
              else {
                toDoListBackGroundColorIndex = 0;
                setToDoListBackGroundColor(toDoListBackGroundColors[toDoListBackGroundColorIndex])
              }
            }}><IoColorPalette /></div>
            <form>

              <input type='text' className='form-control w-50 mx-auto mb-4' value={title} placeholder='Title' ref={titleInputField} onChange={(e) => {
                setTitle(e.target.value)

              }}
                onKeyDown={(e) => {

                  if (e.key === 'Enter') {
                    e.preventDefault();
                    toDoInputField.current.focus()
                  }
                }} />
            </form>
            {
              !isEmpty(filter(toDos, (ob) => !ob.com && !ob.del)) && <>{
                map(filter(toDos, (ob) => !ob.com && !ob.del), (ob, i) => {
                  return (
                    <div className='border border-white border-1 rounded-3 p-1 mt-1 clearfix' key={ob.id}>
                      <div className='form-check-label'>
                        <input type='checkbox' className='form-check-input ms-2' onClick={() => handleUpdate(ob, 'com')} />
                        <label className='form-check-label ms-2'>{ob.text}</label>
                        <MdDelete className='fs-4 float-end text-warning' title='Delete' onClick={() => handleUpdate(ob, 'del')} />
                        <TiEdit className='fs-4 float-end text-warning' title='Edit' onClick={() => handleEdit(ob)} />
                      </div>
                    </div>

                  )
                })
              }</>
            }
            <hr style={{ borderColor: "white" }} />
            <form>

              <input type='text' className='form-control form-control-sm w-75 d-inline-block' placeholder={editMode ? 'Edit here...' : 'ToDos here...'} value={editMode ? temp.t1 : toDo} ref={toDoInputField} onChange={(e) => {
                if (!editMode)
                  setToDo(e.target.value)
                else
                  setTemp({ ...temp, t1: e.target.value })
              }} onKeyDown={(e) => {
                if (!editMode) {

                  if (e.key === 'Enter') e.preventDefault();
                  if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    setToDos((prev) => [...prev, { id: toDoListIndex++, text: toDo, com: false, del: false, pDel: false }])
                    setToDo('')
                  }
                } else {
                  if (e.key === 'Enter') e.preventDefault();
                  if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    setToDos(map(toDos, (todo) => todo.id === temp.t2 ? { ...todo, text: temp.t1 } : todo))
                    setEditMode(false)
                  }
                }
              }} />
              <div className='w-25 d-inline-block text-center text-white'>{!editMode ? <FaPlusSquare className='fs-1' onClick={() => {

                if (toDo) {
                  setToDos((prev) => [...prev, { id: toDoListIndex++, text: toDo, com: false, del: false, pDel: false }])
                  setToDo('')
                }

              }} /> : <MdDoneOutline className='fs-1 border border-white border-2 rounded-3 p-1' onClick={() => {
                if (temp.t1) {
                  setToDos(map(toDos, (todo) => todo.id === temp.t2 ? { ...todo, text: temp.t1 } : todo))
                  setEditMode(false)
                }
              }} />}</div>
            </form>

          </div>
          <div className='col'>
          </div>
        </div>
        {!isEmpty(filter(toDos, (todo) => todo.com || (todo.del && !todo.pDel))) && <DoneDeletedSection toDoListBackGroundColor={toDoListBackGroundColor} toDos={toDos} setToDos={setToDos} />}

      </>

    }</>

  )
}

export default ToDoListMain