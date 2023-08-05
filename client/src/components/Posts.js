import React, { useState } from "react";
import "../styles/BlogPost.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  const PostSubmit = () => {
    axios
      .post("http://localhost:3001/posts", {
        title: postTitle,
        content: postContent,
      })
      .then(() => {
        console.log("Blog post submitted successfully");
        setPostTitle(""); // clear the input field
        setPostContent(""); // clear the textarea field
      })
      .catch((error) => {
        console.error("Error submitting blog post:", error);
      })
      .then(() => {
        // Navigate to the blog page regardless of success/failure of the post request
        navigate('/blog');
      });
  };
  

  return (
    <div className="BlogPost">
      <div className="BLT">
        <h1 id="myH1">Create a Blog Post</h1>
      </div>
    
      <input
        className="post-title" 
        value={postTitle} 
        onChange={(e) => setPostTitle(e.target.value)} 
        placeholder="Enter the title "
      />

      <textarea 
        className="post-content" 
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Enter the content of your post"
      />
      <button className="submit-btn" onClick={PostSubmit}>
        Submit
      </button>
      <button onClick={() => navigate('/blog')}>
        Test Navigation
      </button>
    </div>
  );
};

export default BlogPost;
