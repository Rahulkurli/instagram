import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  return (
    <>
      {posts.map((post) => {
        return (
          <div>
            <Post
              key={post.id}
              id={post.id}
              username={post.data().username}
              userImg={post.data().profileImg}
              image={post.data().image}
              caption={post.data().caption}
            />
          </div>
        );
      })}
    </>
  );
};

export default Posts;
