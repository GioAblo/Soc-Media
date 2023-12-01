import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost,
}

interface Like {
  userId: string,
  likeId: string
}

export const Post = (props: Props) => {

  const {post} = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null)

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id ));

  const getLikes = async() => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id}) ));
    
  }

  useEffect(() => {
    getLikes()
  }, [])



  const removeLike = async() => {
    try {
    const likesToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));

    const LikesToDeleteData = await getDocs(likesToDeleteQuery);
    const likeId = LikesToDeleteData.docs[0].id;
    const likeToDelete = doc(db, "likes", likeId)

      await deleteDoc(likeToDelete);
      if(user) {
        setLikes((prev) => prev &&  prev.filter((like) => like.likeId   !== likeId));
      }
     
    } catch(err) {
      console.log(err); 
    }
  }

  const addLike = async() => {
    try {
     const newDoc = await addDoc( likesRef, {userId: user?.uid, postId: post.id});
    if(user) {
      setLikes((prev) => prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]);
    }
    } catch(err) {
      console.log(err); 
    }
  }


  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)
    

  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <h3>@{post.username}</h3>
        <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#x1F44D;</>} </button>
        {likes && <p>Likes: {likes.length}</p>}
    </div>
  )
}
