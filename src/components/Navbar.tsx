import React from 'react'
import ButtonNavbar from '@/components/ui/ButtonNavbar'
import { Bars3Icon } from '@heroicons/react/20/solid'
import '@/app/globals.css'

function Navbar() {
  return (
    // className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    <div className='navbar flex items-center justify-between grid grid-cols-5 gap-4 col-span-1 col-start-1;'>
        <div className='btn-nav'>
          <ButtonNavbar link="#home"className="btn-navbar" name='Home'/>
          <ButtonNavbar link="#education"className="btn-navbar" name='Education'/>
          <ButtonNavbar link="#skill"className="btn-navbar" name='Skill'/>
          <ButtonNavbar link="#project"className="btn-navbar" name='Project'/>
          <ButtonNavbar link="#experience"className="btn-navbar" name='Experience'/>
          <ButtonNavbar link="#footer"className="btn-navbar" name='Contact Me'/>
        </div>
        <div className='btn-navresponsive'>
          <div className="dropdown">
            <button className="dropbtn"><Bars3Icon aria-hidden="true" className="icon -mr-1 size-5 text-white"/></button>
            <div className="dropdown-content">
              <a href="#home">Home</a>
              <a href="#education">Education</a>
              <a href="#skill">Skill</a>
              <a href="#project">Project</a>
              <a href="#experience">Experience</a>
              <a href="#footer">Contact Me</a>

            </div>
          </div>

        </div>
       
    </div>
  )
}

export default Navbar