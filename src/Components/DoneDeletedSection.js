import React, { useState } from 'react'
import { MdDelete, MdRestoreFromTrash } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { map, filter, isEmpty } from 'lodash';

function DoneDeletedSection({ toDoListBackGroundColor, toDos, setToDos }) {
  const [toggleCompleted, setToggleCompleted] = useState(false)
  const [toggleDeleted, setToggleDeleted] = useState(false)

  const handleUpdate = (obj, pair) => {
    if (pair === 'del')
      setToDos(map(toDos, (todo) => todo.id === obj.id ? { ...todo, [pair]: todo.del && !todo.pDel ? false : true, com: false } : todo))
    else
      setToDos(map(toDos, (todo) => todo.id === obj.id ? { ...todo, [pair]: pair === 'com' ? false : true } : todo))
  }
  return (
    <div className='row mt-4 mb-2'>
      <div className="col"></div>
      <div className={`col-8 col-md-6 col-lg-4 ${toDoListBackGroundColor} border border-warning border-3 rounded-3 p-3`}>

        {!isEmpty(filter(toDos, (todo) => todo.com)) && <><div className={`row ${!toggleCompleted ? '' : 'mb-3'}`}>
          <div className='col-7 col-sm-6 col-lg-7 col-xxl-5 text-bg-dark fs-6 border border-2 border-white rounded-3' onClick={() => setToggleCompleted((currentValue) => !currentValue)}>{filter(toDos, (todo) => todo.com).length} completed tasks<FaAngleDown className='ms-1' /></div>
          <div className='col'></div>
          <div className='col'></div>
        </div>
          <div className={`${!toggleCompleted ? 'd-none' : ''}`}>
            {
              map(filter(toDos, (todo) => todo.com), (ob) => <div className='border border-white border-1 rounded-3 p-1 mt-1 clearfix' key={ob.id}>
                <div className='form-check-label'>
                  <input type='checkbox' className='form-check-input ms-2' checked onChange={() => handleUpdate(ob, 'com')} />
                  <label className='form-check-label ms-2'>{ob.text}</label>
                  <MdDelete className='fs-4 float-end text-warning' title='Delete' onClick={() => handleUpdate(ob, 'del')} />
                </div>
              </div>)
            }</div></>

        }
        {
          !isEmpty(filter(toDos, (todo) => todo.del && !todo.pDel)) && <><div className={`row ${!toggleDeleted ? '' : 'mb-3'} ${isEmpty(filter(toDos, (todo) => todo.com)) ? '' : 'mt-3'}`}>
            <div className='col-7 col-sm-6 col-xxl-5 text-bg-dark fs-6 border border-2 border-white rounded-3' onClick={() => setToggleDeleted((currentValue) => !currentValue)}>{filter(toDos, (todo) => todo.del && !todo.pDel).length} deleted tasks<FaAngleDown className='ms-1' /></div>
            <div className='col'></div>
            <div className='col'></div>
          </div>
            <div className={`${!toggleDeleted ? 'd-none' : ''}`}>
              {
                map(filter(toDos, (todo) => todo.del && !todo.pDel), (ob) => <div className='border border-white border-1 rounded-3 p-1 mt-1 clearfix' key={ob.id}>
                  <div className='form-check-label'>
                    <MdRestoreFromTrash className='fs-4 text-warning ms-1' title='Restore' onClick={() => handleUpdate(ob, 'del')} />
                    <label className='form-check-label ms-1'>{ob.text}</label>
                    <MdDelete className='fs-4 float-end text-warning' title='Delete' onClick={() => handleUpdate(ob, 'pDel')} />
                  </div>
                </div>)
              }</div></>

        }
      </div>
      <div className="col"></div>
    </div>
  )
}

export default DoneDeletedSection