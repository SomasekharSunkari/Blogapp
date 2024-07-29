import React, { useContext, useEffect, useState } from 'react'

import "./Postpage.css";
import { formatISO9075 } from 'date-fns';
import { useParams } from 'react-router-dom'
import { UserContexts } from '../Context/UserContext.mjs';
const Postpage = () => {
    const {id} = useParams();
    const [postInfo,setPostInfo] = useState();
    const {userInfo} = useContext(UserContexts)

    useEffect(  ()=>{

        const data =  fetch(`http://localhost:5000/post/${id}`,{
          credentials:"include"
        }).then(response => response.json().then(postInfos=>{
          console.log(postInfo)
          console.log(userInfo)
          setPostInfo(postInfos)
        }))
      

    },[])

    if(!postInfo) return ""
  return (
    <div className='postpage-image'>
      <div>
      <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        {/* <div>
          {postInfo.author}
        </div> */}
        <button>Edit this post</button>
        <img src={`http://localhost:5000/${postInfo.cover}`}/>
        </div>
        <div className='conten'>

  
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </div>
  )
}

export default Postpage
