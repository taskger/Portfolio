"use client"
import React,  {useState}from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import '@/app/globals.css'
interface ImageProps {
  src?: string;
  alt?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}
const ButtonIconSkill: React.FC<ImageProps> = ({
  src = "",
  alt = "",
  name = "",
  width = 0,
  height = 0,
  className = "",
  onClick
}) => {
  
  return (
    <div>
      <Button onClick={onClick} className={`btn-skill  ${className}` } size="md" variant="primary">
        <Image
          src={`${src}`}
          alt={`${alt}`}
          width={typeof width === "string" ? parseInt(width, 1000) : width}
          height={typeof height === "string" ? parseInt(height, 1000) : height}
        />
        <a>
          {name}
        </a>
        
      </Button>
    </div>
  )
}

export default ButtonIconSkill

