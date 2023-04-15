import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import FeedItem from '../feed/FeedItem';
import Spinner from '../layout/Spinner';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const getPost = async () => {
    const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, [])
  return (
    <div className='grid'>
      {
        post !== null ? 
          <div>
            <FeedItem 
                contact={ post }
            />
          </div>
         : 
          <Spinner />
      }
    </div>
  );
};

export default Post;