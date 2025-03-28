'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ButtonIconSkill from '@/components/ui/ButtonIconSkill'

function UserSkill() {
  const [posts , setPosts] = useState('')

  const fetchPosts = async ()  => {
    try{
      const response = await axios.get('/api/skill')
      setPosts(response.data)
    }catch (error) {
      console.log('error',error)
    }
  }

  
  useEffect (() => {
    fetchPosts();
  }, []);
  return (
    <div className='skill' id='skill'>
      <h1 className='Skill-Title'>Skill</h1>
      <div  className='box-inside'>
        <div className='icon'>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post, index: number) => (
              <div key={index} className="post-item">
                <ButtonIconSkill className='btniconskill' src={`/${post.icon}`} name={post.name}  alt={post.name} width={30} height={30}/>
              </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
      </div>
    </div>
  )
}

export default UserSkill