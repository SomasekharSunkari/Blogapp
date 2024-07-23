import React from 'react';
import "./CreatedPosts.css"; // Import the CSS file
import { Link } from 'react-router-dom';
import {formatISO9075} from "date-fns"

const CreatedPosts = ({ id,title, summary, image, content, createdAt ,author}) => {
  return (
    <div className='posts-create'>
      <div className='image-container'>
        <img  src={"http://localhost:5000/" + image} alt={title} />
      </div>
      <div className='post-content'>
        <Link to={`/posts/${id}`}>{title}</Link>
        {/* <div>{content}</div> */}
        <p>
          <a className='author' style={{marginRight:"1rem"}}>{author}</a>
        <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p>{summary}</p>

      
      </div>
    </div>
  );
};

export default CreatedPosts;
