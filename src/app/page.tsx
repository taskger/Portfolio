import React from 'react'
import Head from '@/components/Head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UserSkill from '@/components/UserSkill'
import UserProject from '@/components/UserProject'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import '@/app/globals.css'

export default function page() {
  return (
    <div className='background-page'>
        <Navbar />
        <Head />
        <Education />
        <UserSkill/>
        <UserProject />
        <Experience />
        <Footer />
    </div>
  )
}
