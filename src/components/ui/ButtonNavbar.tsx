import React from 'react'

interface btnnavbarProp {
    name?:string;
    className?:string;
    link?:string;
    
}
const ButtonNavbar: React.FC<btnnavbarProp> =({
    name = "",
    className = "",
    link = "",
}) => {

  return (
    <a href={`${link}`}>
        <button  className={`${className}`}>
            {name}
        </button>
    </a>
  )
}

export default ButtonNavbar