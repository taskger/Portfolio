'use client'
import React,{useEffect,useState} from 'react'


import axios from 'axios'
import Button from '@/components/ui/Button'
import ButtonIconSkill from '@/components/ui/ButtonIconSkill'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { createClient } from '@libsql/client'
interface Post {
  id: string;
  name: string;
  icon: string;
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
  const [openSkillDelete , setOpenSkillDelete] = useState(false)
  const [openSkillCreate, setOpenSkillCreate] = useState(false)
  const [openSkillEdit , setOpenSkillEdit] = useState(false)
  const [name , setName] = useState('')
  const [icon  , setIcon] = useState('')
  const [deleteid, setdeleteId] = useState('')
  const [deletename, setdeletenName] = useState('')
  const [editId, seteditId] = useState('')
  const [editName, seteditName] = useState('')
  const [editnameIcon, seteditnameIcon] = useState('')
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try{
        const client = getDatabaseClient() 
        await client.execute({
          sql: `INSERT INTO Skill (name, icon)  VALUES ($name, $icon)`,
          args: { name,icon },
        }) 

        setOpenSkillCreate(false)
        fetchPosts();
    } catch (error) {
      console.log('error', error)
      alert('something went wrong')
    }
    console.log('name',name)
    console.log('icon',icon)
  }

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault()
  //   try{
  //       await axios.post('/api/skill', {
  //       name,
  //       icon
  //       })
  //       setOpenSkillCreate(false)
  //       fetchPosts();
  //   } catch (error) {
  //     console.log('error', error)
  //     alert('something went wrong')
  //   }
  //   console.log('name',name)
  //   console.log('icon',icon)
  // }

  const fetchPosts = async () => {
    try {
      const client = getDatabaseClient() 
      const response = await client.execute("SELECT * FROM skill") 
      setPosts(response.rows)  
    } catch (error) {
      console.log('Error fetching posts:', error)
    }
  }
  // const fetchPosts = async ()  => {
  //   try{
  //     const response = await axios.get('/api/skill')
  //     setPosts(response.data)
  //   }catch (error) {
  //     console.log('error',error)
  //   }
  // }

  const fetchDelete = async (id: string)  => {
    try{
      const client = getDatabaseClient() 
      await client.execute({
        sql:"DELETE FROM skill WHERE id  = $id",
        args:{id}
      }) 
      setOpenSkillDelete(false)
      fetchPosts(); 
    }catch (error) {
      console.log('error',error)
    }
  }
  // const fetchDelete = async (id: string)  => {
  //   try{
  //     await axios.delete(`/api/skill/${id}`)
  //     setOpenSkillDelete(false)
  //     fetchPosts(); 
  //   }catch (error) {
  //     console.log('error',error)
  //   }
  // }


  const setDelete = (post: Post) => {
    setdeleteId(post.id);
    setdeletenName(post.name);
    setOpenSkillDelete(true);
  }
  
  const fetchEdit = async (post: Post)  => {
    try{
        const client = getDatabaseClient() 
        await client.execute({
          sql: `UPDATE skill SET name = $name,icon =  $icon WHERE id = $id`,
          args: { name:post.name , icon:post.icon , id:post.id },
        }) 
        setOpenSkillEdit(false)
        fetchPosts(); 
    }catch (error) {
      console.log('error',error)
    }
  }
  // const fetchEdit = async (post: Post)  => {
  //   try{
  //     await axios.patch(`/api/skill/${post.id}`, {
  //       name: post.name,
  //       icon: post.icon
  //       })
  //       setOpenSkillEdit(false)
  //       fetchPosts(); 
  //   }catch (error) {
  //     console.log('error',error)
  //   }
  // }

  const setEdit = (post: Post) => {
    seteditId(post.id);
    seteditName(post.name);
    seteditnameIcon(post.icon);
    console.log(editId)
    console.log(post.name)
  }


  useEffect (() => {
    fetchPosts();
  }, []);
  return (
    <div className='skill' id='skill'>
      <h1 className='Skill-Title'>Skill</h1>
      <Button className="btn-create" onClick={() => setOpenSkillCreate(true)} size="icon" variant="outline">CREATE</Button>
      <Button className="btn-edit" onClick={() => setOpenSkillEdit(true)} size="icon" variant="outline">EDIT</Button>
        <div className="post-item">
          <Dialog open={openSkillEdit} onClose={() => setOpenSkillEdit(false)} className="relative z-10">
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
                            <input 
                              className="input-box" 
                              type="text"
                              placeholder='Name' 
                              name='file'
                              id='file'
                              value={editName}
                              onChange={(e)=>{ seteditName(e.target.value)}} /><br></br>
                            <input 
                              className="input-box" 
                              type="text"
                              placeholder='File Name' 
                              name='file'
                              id='file'
                              value={editnameIcon}
                              onChange={(e)=>{ seteditnameIcon(e.target.value)}} /><br></br>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-crud bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button 
                      onClick={() => setOpenSkillEdit(false)}
                      size="icon" 
                      variant="cancle"
                    >
                      Cancle
                    </Button>

                    <Button 
                      onClick={() => fetchEdit({ id: editId, name: editName, icon: editnameIcon })}
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
            
      <div  className='box-inside'>
        <div className='icon'>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index: number) => (
            <div key={index} className="post-item">
              <ButtonIconSkill onClick={() => setDelete(post)} className='btniconskill' src={`/${post.icon}`} name={post.name}  alt={post.name} width={30} height={30}/>
            </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
          <Dialog open={openSkillDelete} onClose={() => setOpenSkillDelete(false)} className="relative z-10">
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
                    onClick={() => setOpenSkillDelete(false)}
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
          <Dialog open={openSkillCreate} onClose={() => setOpenSkillCreate(false)} className="relative z-10">
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
                            <input 
                              className="input-box" 
                              type="text" 
                              placeholder='Name' 
                              name="name"
                              id="name"
                              value={name}
                              onChange={(e)=>{ setName(e.target.value)}} /><br></br>
                            <input 
                              className="input-box" 
                              type="text"
                              placeholder='File Name' 
                              name='file'
                              id='file'
                              onChange={(e)=>{ setIcon(e.target.value)}} /><br></br>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-crud bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="reset"
                      onClick={() => setOpenSkillCreate(false)}
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
      </div>
    </div>
  )
}

export default AdminSkill