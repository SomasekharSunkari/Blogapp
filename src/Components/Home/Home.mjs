import React, { useState, useEffect, useContext } from 'react';
import Post from './CreatedPosts.js';
import "./Home.css";
import { UserContexts } from '../Context/UserContext.mjs';

const Home = () => {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [userInfo,setUserInfo] = useState();
  const {userInfo:info} = useContext(UserContexts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/getposts");
        const udata = await fetch("http://localhost:5000/profile",{
          credentials: "include",
        })
        const data = await response.json();
        setPosts(data);
        const data2 =await udata.json();
        setUserInfo(data2.username)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount
if(!info) return "Login to see the blogs"
  return (
    <div className='header-home'>
      {posts.map((item, index) => (
        <Post
          key={item._id || index} // Use a unique key, such as item.id
          title={item.title}
          summary={item.summary}
          image={item.cover}
          id={item._id}
          content={item.content}
          author={userInfo}
          createdAt={item.createdAt}
        />
      ))}
      {/* These are placeholders; remove them if not needed */}
      
    </div>
  );
};

export default Home;
