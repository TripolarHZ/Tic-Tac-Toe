import React, { useState, useEffect } from 'react';


const COHORT_NAME = '2303-ftb-et-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


const Read = () =>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const response = await fetch(`${BASE_URL}/posts`)
          
              const result = await response.json();
              setPosts(result.data.posts);
            } catch (err) {
              console.error(err);
            }
          }
          fetchPosts();
    }, []) 

    return <>
            {
            posts.map(post => <div key={post._id}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <h4>Price: {post.price}</h4>
                <h2>Seller: {post.author.username}</h2>
                <h4>Location: {post.location}</h4>
                <button type="button" className="btn btn-outline-primary" >Edit</button>
                <button type="button" className="btn btn-outline-danger" >Delete</button>
            </div>)
        }
    </>

}

export default Read;