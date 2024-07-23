import React, { useEffect, useState } from 'react'

import "./Postpage.css"
import { useParams } from 'react-router-dom'
const Postpage = () => {
    const {id} = useParams();
    const [postInfo,setPostInfo] = useState();

    useEffect(  ()=>{

        const data =  fetch(`http://localhost:5000/post/${id}`,{
          credentials:"include"
        }).then(response => response.json().then(postInfos=>{
          setPostInfo(postInfos)
        }))
      

    },[])

    if(!postInfo) return ""
  return (
    <div className='postpage-image'>
      <div>
        <img src={`http://localhost:5000/${postInfo.cover}`}/>
        </div>
        <div className='conten'>
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </div>
  )
}

export default Postpage
