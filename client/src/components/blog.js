import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/posts.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    GetPosts();
  }, []);

  //Get all blog posts
  const GetPosts = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((response) => {
        const updatedPosts = response.data.map((post) => ({ ...post, newContent: '' }));
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error('Error getting posts:', error);
      });
  };
  
  
    //To update a blog post
  const updatePost = (id, newContent, title) => {
    axios
      .put(`http://localhost:3001/posts/${id}`, { title: title, content: newContent, id: id })
      .then(() => {
        console.log("Blog post updated successfully");
        GetPosts();
      })
      .catch((error) => {
        console.error("Error updating blog post:", error);
      });
  };
  
  
  //To delete a blog post
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        console.log("Blog post deleted successfully");
        GetPosts();
      })
      .catch((error) => {
        console.error("Error deleting blog post:", error);
      });
  };
  

  return (
    <div className="container mt-5">
    <h2 className="mb-6">Public Posts</h2>
    <div className="grid-container">
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
          <div>
            <input
              type="text" placeholder="Enter a title"  value={post.title} onChange={(event) => { const updatedPosts = posts.map((p) => {if (p.id === post.id) { return { ...p, title: event.target.value };  }  return p; }); setPosts(updatedPosts);  }}
            />
          </div>
            <div>
              <input
                type="text" placeholder=" Update post"  value={post.newContent} onChange={(event) => { const updatedPosts = posts.map((p) => {  if (p.id === post.id) {return { ...p, newContent: event.target.value }; }return p; }); setPosts(updatedPosts); }}
              />
              <button onClick={() => { updatePost(post.id, post.newContent, post.title); }}> Update Post</button>
              <button onClick={() => { deletePost(post.id); }}> Delete Post</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Blog;
