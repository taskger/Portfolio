"use client";
import React from 'react'
import Image from 'next/image'
import { login} from '@/app/lib/action/auth';
function Footer() {
  return (
    <div id='footer' >
      <footer>
        <div className='contact'>
          <div>
            <h1>Contact Me</h1>
            <div>
              <a href="mailto:chayanon.poolwas@gmail.com">Email : chayanon.poolwas@gmail.com<br></br></a>
              <a href="tel:095-026-7339">Phone : 095-026-7339</a>
            </div>
            <div className='icon'>
              <a href="https://github.com/taskger">
                <Image
                  src="/github-icons.svg"
                  alt="github"
                  width={40}
                  height={40}
                  
                />
              </a>
              <a href="mailto:chayanon.poolwas@gmail.com">
                <Image
                  src="/Email-Icon.png"
                  alt="email"
                  width={32}
                  height={32}
                  
                />
              </a>

            </div>

            </div>
          <a>© 2024 Chayanon Poolwas | </a><button onClick={() => login()}>Backend</button>
          

        </div>
      </footer>
    </div>
  )
}

export default Footer