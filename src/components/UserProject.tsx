'use client'
import React,{useEffect,useState} from 'react'
// import axios from 'axios'
import ImageSlide from '@/components/ui/ImageSlide'

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
  tool: string;
  image: string;
  githublink: string;
  figmalink:string;
  demolink:string;
}
function UserProject() {
  const [posts, setPosts] = useState<Post[]>()
  
    const fetchPosts = async () => {
      try {
        const client = getDatabaseClient() 
        const response = await client.execute("SELECT * FROM project") 
        const posts: Post[] = response.rows.map((row: any) => ({
          id: row.id,         // แปลงข้อมูลตามที่จำเป็น
          name: row.name,
          tool: row.tool,
          image: row.image,
          githublink: row.githublink, // Ensure all required properties are included
          figmalink: row.figmalink,
          demolink: row.demolink,
        }));
        setPosts(posts)  
      } catch (error) {
        console.log('Error fetching posts:', error)
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