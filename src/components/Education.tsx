import React from 'react'
import { CalendarIcon } from '@heroicons/react/20/solid'
import '@/app/globals.css'
const Education = () => {
  return (
    <div  id='education'>
      <div className='education'>
          <h1 className='education-title'>Education</h1>
          <div className='description'>
            <a className='university'>Kasetsart University Sriracha Campus<br></br></a>
            <a className='bachelor'>Bachelor of Engineering in Computer Engineering and Informatics<br></br></a>
            <a className='datestart-end'>
              <CalendarIcon aria-hidden="true" className="icon -mr-1 size-10 text-white"></CalendarIcon>
                04/2020 - 11/2024
            </a>
          </div>
      </div>
    </div>
  )
}

export default Education