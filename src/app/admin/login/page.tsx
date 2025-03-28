'use client'
import React from 'react'
import '@/app/globals.css'
import Button from '@/components/ui/Button'
import { UserIcon,LockClosedIcon } from '@heroicons/react/20/solid'

function login() {
  return (
    <div className='wrapper'>
      <div className='bg-login'>
        <div className='login '>

            <input className='login-box' type="text" placeholder="Username"/>
            <UserIcon aria-hidden="true" className="icon-user -mr-1 size-5 text-gray-400" />
            <input className='login-box' type="password" placeholder="Password"/>
            <LockClosedIcon aria-hidden="true" className="icon-lock -mr-1 size-5 text-gray-400" />
            <Button className='btn-login' size="icon" variant="outline">
                Login
            </Button>
        </div>
      </div>
    </div> 
  )
}

export default login