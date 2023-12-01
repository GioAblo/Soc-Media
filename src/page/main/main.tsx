import {getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
  title: string,
  description: string,
  userId: string,
  id: string,
  username: string
}

export const Main = () => {

  const [postList, setPostList] = useState<Post[] | null >(null);
  const postRef = collection(db, "posts");

  const getPosts = async() => {
    const data = await getDocs(postRef);
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id}) ) as Post[] );
    
  }

  useEffect(() => {
    getPosts();
  }, [])

  

  return (
    <div>{postList?.map((post) => 
      <Post post={post}/>
    )}</div>
  )
}
