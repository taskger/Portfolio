'use client'
import React,{useEffect,useState} from 'react'

// import axios from 'axios'
import Button from '@/components/ui/Button'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ImageSlide from '@/components/ui/ImageSlide'
// import { Router } from 'next/navigation'
import { createClient } from '@libsql/client'

interface Post {
  id: string;
  name: string;
  tool: string;
  image: string;
  githublink: string;
  figmalink:string;
  demolink:string;
}

function getDatabaseClient() {
  const client  = createClient({
    url:  "libsql://portfolio-taskger.aws-ap-south-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDMxNjE4ODIsImlkIjoiMTgxZTczMDgtNWFlYy00YTRhLTgwMmItYjJhYWU0MGEzMTIwIiwicmlkIjoiYTM2NDQ0YzEtMDA0OS00YmQ3LWJkZjEtZjBhYTA5NjQ1OGFiIn0.XZTtBfo5x-PNfO8OeKdNMl2XfaS4DOOEkmmazcTZFb5joHALq3MiA9Ewyn95d5WDuX95huOB9Zq_M3KBWnuJCA",
  });

  return client;
}

function AdminSkill() {
  const [posts , setPosts] = useState<Post[]>([]);
  const [openProjectDelete , setOpenProjectDelete] = useState(false)
  const [openProjectCreate, setOpenProjectCreate] = useState(false)
  const [openProjectEdit , setOpenProjectEdit] = useState(false)
  const [name , setName] = useState('')
  const [tool  , setTool] = useState('')
  const [image  , setImage] = useState('')
  const [githublink  , setGithublink] = useState('')
  const [figmalink  , setFigmalink] = useState('')
  const [demolink  , setDemolink] = useState('')
  const [deleteid, setdeleteId] = useState('')
  const [deletename, setdeletenName] = useState('')
  const [editId, seteditId] = useState('')
  const [editname , seteditName] = useState('')
  const [editool  , seteditTool] = useState('')
  const [editimage  , seteditImage] = useState('')
  const [editgithublink  , seteditGithublink] = useState('')
  const [editfigmalink  , seteditFigmalink] = useState('')
  const [editdemolink  , seteditDemolink] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try{
    
        const client = getDatabaseClient() 
        await client.execute({
          sql: `INSERT INTO project (name, tool, image, githublink, figmalink, demolink) 
           VALUES ($name, $tool, $image, $githublink, $figmalink, $demolink)`,
          args: { name,
            tool,
            image,
            githublink,
            figmalink,
            demolink },
        }) 
        setOpenProjectCreate(false)
        fetchPosts();
    } catch (error) {
      console.log('error', error)
      alert('something went wrong')
    }
    console.log('name',name)
  }
  
  const fetchPosts = async () => {
    try {
      const client = getDatabaseClient() 
      const response = await client.execute("SELECT * FROM project") 
      // สมมติว่าคุณต้องการแปลง Row เป็น Post
      const posts: Post[] = response.rows.map((row) => ({
        id: row.id  as string,         // แปลงข้อมูลตามที่จำเป็น
        name: row.name  as string,
        tool: row.tool as string,
        image: row.image as string,
        githublink: row.githublink as string, // Ensure all required properties are included
        figmalink: row.figmalink as string,
        demolink: row.demolink as string,
      }));

      setPosts(posts);
    } catch (error) {
      console.log('Error fetching posts:', error)
    }
  }
  
  const fetchDelete = async (id: string)  => {
    try{
      const client = getDatabaseClient() 
      await client.execute({
        sql:"DELETE FROM project WHERE id  = $id",
        args:{id}
      })
      setOpenProjectDelete(false)
      fetchPosts(); 
    }catch (error) {
      console.log('error',error)
    }
  }

  const setDelete = (post: Post) => {
    setdeleteId(post.id);
    setdeletenName(post.name);
    setOpenProjectDelete(true);
  }
  
  const fetchEdit = async (post: Post)  => {
    try{
        const client = getDatabaseClient() 
        await client.execute({
          sql: `UPDATE project SET name = $name,tool =  $tool,image =  $image,
          githublink = $githublink,figmalink =  $figmalink,demolink =  $demolink WHERE id = $id`,
          args: {
            id:post.id ,
            name: post.name,  
            tool: post.tool,
            image: post.image,
            githublink: post.githublink,
            figmalink: post.figmalink,
            demolink: post.demolink},
        }) 
        setOpenProjectEdit(false)
        fetchPosts(); 
    }catch (error) {
      console.log('error',error)
    }
  }

  const setEdit = (post: Post) => {
    seteditId(post.id);
    seteditName(post.name);
    seteditTool(post.tool);
    seteditImage(post.image);
    seteditGithublink(post.githublink);
    seteditFigmalink(post.figmalink);
    seteditDemolink(post.demolink);
    console.log(editId)
    console.log(post.name)
  }


  useEffect (() => {
    fetchPosts();
  }, []);
  return (
    <div  className='project' id='project'>
      <div className='project-title'>Project</div>
      <Button className="btn-create" onClick={() => setOpenProjectCreate(true)} size="icon" variant="outline">CREATE</Button>
      <Button className="btn-edit" onClick={() => setOpenProjectEdit(true)} size="icon" variant="outline">EDIT</Button>
        <div className="post-item">
          <Dialog open={openProjectEdit} onClose={() => setOpenProjectEdit(false)} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className=" sm:items-start">
                      
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle>Edit Skill</DialogTitle>
                        <div className="mt-2">

                          <p className="text-gray-500">
                          <select
                            className="input-box"
                            name="cars"
                            id="cars"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                              const selectedId = e.target.value;
                              const selectedPost = posts.find((post: Post) => String(post.id) === selectedId);
                              if (selectedPost) {
                                setEdit(selectedPost);
                              }
                            }}
                          >
                            <optgroup label="WebDev">
                              <option></option>
                              {Array.isArray(posts) && posts.length > 0 ? (
                                posts.map((post:Post) => (
                                  <option value={post.id} key={post.id}>
                                    {`${post.name}(${post.id})`}
                                  </option>
                                ))
                              ) : null}
                            </optgroup>
                          </select>
                          <input className="input-box" 
                              type="text" 
                              placeholder='Name' 
                              name="name"
                              id="name" 
                              value={editname}
                              onChange={(e)=>{ seteditName(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Tool' 
                              name="tool"
                              id="tool" 
                              value={editool}
                              onChange={(e)=>{ seteditTool(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='image' 
                              name="image"
                              id="image" 
                              value={editimage}
                              onChange={(e)=>{ seteditImage(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Github Link' 
                              name="GithubLink"
                              id="GithubLink" 
                              value={editgithublink}
                              onChange={(e)=>{ seteditGithublink(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Figma Link' 
                              name="FigmaLink"
                              id="FigmaLink" 
                              value={editfigmalink}
                              onChange={(e)=>{ seteditFigmalink(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Demo Link' 
                              name="demolink"
                              id="demolink" 
                              value={editdemolink}
                              onChange={(e)=>{ seteditDemolink(e.target.value)}}/><br></br>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-crud bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button 
                      onClick={() => setOpenProjectEdit(false)}
                      size="icon" 
                      variant="cancle"
                    >
                      Cancle
                    </Button>

                    <Button 
                      onClick={() => fetchEdit({ id: editId, name: editname, tool: editool, image: editimage,
                        githublink:editgithublink,figmalink:editfigmalink,demolink:editdemolink})}
                      size="icon" 
                      variant="submit"
                    >
                      EDIT
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
            
      
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index: number) => (
              <div key={index} className='slide'>
                <Button onClick={() => setDelete(post)}size="icon" variant="cancle">X</Button>
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
          <Dialog open={openProjectDelete} onClose={() => setOpenProjectDelete(false)} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div  className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle>Confirm Delete <a className='text-red-600'>{deletename}</a></DialogTitle>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            <a>Do you really want to delete these records? This process cannot be undone.</a>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="btn-crud bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button 
                    onClick={() => setOpenProjectDelete(false)}
                    size="icon" 
                    variant="outline"
                    >
                    Cancle
                    </Button>
                    <Button 
                    onClick={() => fetchDelete(deleteid)}
                    size="icon" 
                    variant="cancle"
                    >
                    Confirm
                    </Button>
                    
                </div>
                </DialogPanel>
            </div>
            </div>
          </Dialog>
          <Dialog open={openProjectCreate} onClose={() => setOpenProjectCreate(false)} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <form onSubmit={handleSubmit} >
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle>Create Skill</DialogTitle>
                        <div className="mt-2">
                          <p className="text-gray-500">
                            <input className="input-box" 
                              type="text" 
                              placeholder='Name' 
                              name="name"
                              id="name" 
                              value={name}
                              onChange={(e)=>{ setName(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Tool' 
                              name="tool"
                              id="tool" 
                              value={tool}
                              onChange={(e)=>{ setTool(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='image' 
                              name="image"
                              id="image" 
                              value={image}
                              onChange={(e)=>{ setImage(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Github Link' 
                              name="GithubLink"
                              id="GithubLink" 
                              value={githublink}
                              onChange={(e)=>{ setGithublink(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Figma Link' 
                              name="FigmaLink"
                              id="FigmaLink" 
                              value={figmalink}
                              onChange={(e)=>{ setFigmalink(e.target.value)}}/><br></br>
                            <input className="input-box" 
                              type="text" 
                              placeholder='Demo Link' 
                              name="demolink"
                              id="demolink" 
                              value={demolink}
                              onChange={(e)=>{ setDemolink(e.target.value)}}/><br></br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-crud bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="reset"
                      onClick={() => setOpenProjectCreate(false)}
                      size="icon" 
                      variant="cancle"
                    >
                      Cancle
                    </Button>
                    <Button 
                      type="submit"
                      size="icon" 
                      variant="submit"
                    >
                      Create
                    </Button>
                  </div>
                </DialogPanel>
              </form>
              </div>
            </div>
          </Dialog>
          
          
    </div>
  )
}

export default AdminSkill