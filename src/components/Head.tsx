import React from 'react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import '@/app/globals.css'
function Head() {
  return (
    <div className='head' id='home'>
      <h1 className='h1'>Welcome to my Portfolio</h1>
      <h1 className='h2'>CHAYANON POOLWAS</h1>
      <h1 className='h3'>I am a full stack developer</h1>
      <div className='btn'>
        <Link href="/pdf/resume-en.pdf">
          <Button  className='btn-moon' size="icon" variant="outline">
                Dowload Resume
          </Button>
        </Link>
        
      </div>
    </div>
  )
}

export default Head