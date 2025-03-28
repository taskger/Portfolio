'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ImageSlide from '@/components/ui/ImageSlide'

function UserProject() {
  const [posts , setPosts] = useState('')

  const fetchPosts = async ()  => {
    try{
      const response = await axios.get('/api/project')
      setPosts(response.data)
    }catch (error) {
      console.log('error',error)
    }
  }
  
  useEffect (() => {
    fetchPosts();
  }, []);
  return (
    <div  className='project' id='project'>
      <div className='project-title'>
        Project
      </div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index: number) => (
            <div key={index} className='slide'>
            <ImageSlide
              className='slideImage'
              src={post.image}
              width={2000}
              height={2000}
              demolink={post.demolink}
              figmalink={post.figmalink}
              githublink={post.githublink}
              tools={post.tool}
            />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
    </div>
  )
}

export default UserProject