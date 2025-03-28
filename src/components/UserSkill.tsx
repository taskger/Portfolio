'use client'
import React,{useEffect,useState} from 'react'
import ButtonIconSkill from '@/components/ui/ButtonIconSkill'

import { createClient } from '@libsql/client'

function getDatabaseClient() {
  const client  = createClient({
    url:  "libsql://portfolio-taskger.aws-ap-south-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDMxNjE4ODIsImlkIjoiMTgxZTczMDgtNWFlYy00YTRhLTgwMmItYjJhYWU0MGEzMTIwIiwicmlkIjoiYTM2NDQ0YzEtMDA0OS00YmQ3LWJkZjEtZjBhYTA5NjQ1OGFiIn0.XZTtBfo5x-PNfO8OeKdNMl2XfaS4DOOEkmmazcTZFb5joHALq3MiA9Ewyn95d5WDuX95huOB9Zq_M3KBWnuJCA",
  });

  return client;
}
interface Post {
  id: string;
  name: string;
  icon: string;
}
function UserSkill() {

  const [posts, setPosts] = useState<Post[]>()

  const fetchPosts = async () => {
    try {
      const client = getDatabaseClient() 
      const response = await client.execute("SELECT * FROM skill") 
      setPosts(response.rows)  
    } catch (error) {
      console.log('Error fetching posts:', error)
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