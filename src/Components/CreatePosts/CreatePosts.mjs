import React, { useState } from 'react'
import "./CreatePosts.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'] // remove formatting button
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  

const formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline',
    'color', 'background', 'align',
    'link', 'image'
  ];
  
const CreatePosts = () => {
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("")
    const [files,setFiles] = useState()
    const [redirect,setRedirect] = useState(false);
    const createNewPost = async (ev)=>{
        ev.preventDefault();
        try{
          const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0])
    const response = await    fetch("http://localhost:5000/posts",{
            method:"POST",
            body:data
        })

        if(response.ok){
          setRedirect(true)
        }
        }
        
        catch(e){
          console.log("SOme error occured")
        }
    }
   if(redirect) {
    return <Navigate to="/"/>
   }
  return (
    <form onSubmit={createNewPost} className='form-top'>
     <input placeholder='title' type='text' value={title} onChange={(ev)=>setTitle(ev.target.value)} />
     <input placeholder='summary' type='text' value={summary} onChange={(ev)=>setSummary(ev.target.value)}/>
     <input type='file' placeholder='image' onChange={e=>setFiles(e.target.files)} />
     <ReactQuill formats={formats} modules={modules} value={content} onChange={(newValue)=>setContent(newValue)} className='contentquill'/>
        <button> Create post</button>
    </form>
  )
}

export default CreatePosts
