import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './Tasks/TaskList';

import './SearchResults.css'

const SearchResults = () => {
  const sessionUser = useSelector(state => state.session?.user.id)
  const [openSideBar, setOpenSideBar] = useState(false)
  const dispatch = useDispatch()

  const tasks = []

  useEffect(() => {
    // dispatch(getSearch("term"))
  }, [])

  return (
    <>
      <div className='task-list-title-container'>
        <div className='task-list-title'>Search Results</div>
      </div>
      <div className='primary-task-container'>
        <ul className="task-list">
          {tasks?.map(task => {
            return (
              <li>
                <TaskList task={task} />
              </li>
            )
          })}
        </ul>
      </div>

    </>
  );
}

export default SearchResults;
