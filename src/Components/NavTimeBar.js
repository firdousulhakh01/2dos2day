import React from 'react'
import { FaSearch } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { LiaCalendar } from "react-icons/lia";
const date = new Date();
// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const NavTimeBar = ({ setNewListRender }) => {
  return (
    <>
      <div className='row p-3'>
        <div className='col-2 col-sm-1 bg-secondary border border-warning border-3 rounded-3 text-center p-2 text-white fs-5' title='Option coming soon!'><AiOutlineMenu /></div>
        <div className='col'></div>
        <div className='col-6 col-sm-5 col-md-4 bg-secondary border border-warning border-3 rounded-3 text-center p-2 text-white fs-4'>2dos2day</div>
        <div className='col'></div>
        <div className='col-2 col-sm-1 bg-secondary border border-warning border-3 rounded-3 text-center p-2 text-white fs-5' title='Option coming soon!'><FaSearch /></div>
      </div>
      <div className='row my-3'>
        <div className='col'></div>
        <div className='col-9 col-sm-8 col-md-7'>
          <div className='row'>
            <div className='col'></div>
            <div className='col'></div>
            <div className='col-7 col-sm-6 col-md-5'>
              <div className='bg-white border border-info border-4 rounded-4 text-dark p-2 fs-6'>
                <div className='text-center'>Today is <span className='text-danger'>{days[date.getDay()]}!</span></div>
                <div className='text-center'><LiaCalendar className='fs-4 text-danger' /><span className='align-bottom'>{`${date.getDate()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getFullYear()}`}</span></div>
              </div>
              <div className='row mt-3'>
                <div className='col'></div>
                <div className='col-7 col-sm-6 col-lg-5 border border-4 border-white rounded-3 text-center text-bg-info p-2' onClick={() => {
                  setNewListRender((currentValue) => ++currentValue)
                }}>New List</div>
                <div className='col'></div>
              </div>
            </div>
            <div className='col'></div>
            <div className='col'></div>
          </div>

        </div>
        <div className='col'></div>
      </div>
    </>
  )
}

export default NavTimeBar