"use client"
import React,  {useState} from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import '@/app/globals.css'
interface ImageProps {
  src?: string;
  alt?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  demolink?:string;
  figmalink?:string;
  githublink?:string;
  tools?:string;
  
}
const ImageSlide: React.FC<ImageProps> = ({
  src = "",
  alt = "",
  name = "",
  width = 0,
  height = 0,
  className= "",
  demolink="",
  figmalink="",
  githublink="",
  tools=""

}) => {
  return (
    <div>

        <Image
          className={`${className}`}
          src={`/projects/${src}`}
          alt={`${alt}`}
          width={typeof width === "string" ? parseInt(width, 0) : width}
          height={typeof height === "string" ? parseInt(height, 0) : height}
        />
        <div className='link'>
          <div>
            <a href={`${demolink}`}>
              <Button  className='demo' size="sm" variant="primary">
                DEMO
              </Button>
            </a>
            <a href={`${figmalink}`}>
              <Image className='icon' src="/figma.png" alt="github"width={100} height={100}/>
            </a>
            <a href={`${githublink}`}>
              <Image className='icon' src="/github-icons.svg" alt="github"width={10} height={10}/>
            </a>
          </div>
        </div>
        <div className='tool'>
          <div>   
          {tools && tools.split(',').length > 0 ? (
            tools.split(',').map((tool, index) => (
              <Image key={index} className='icon' src={`/${tool.trim()}`} alt="tool" width={100} height={100}/>

            ))            
          ) : (
            <p>No tools available</p>
          )}
          </div>
        </div>
    </div>
    
  )
}

export default ImageSlide

