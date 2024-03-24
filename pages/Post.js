import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsChatDots, BsThreeDots } from "react-icons/bs";
import { HiOutlineEmojiHappy, HiOutlinePaperAirplane } from "react-icons/hi";
import Moment from "react-moment";

const post = ({ id, username, userImg, image, caption }) => {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // comment
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  // LIKES
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  // has liked or not
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),

    [likes]
  );

  // likepost function
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  // COMMENTS
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div>
      <div className="bg-white my-7 border rounded-sm">
        <div key={id} className="flex items-center p-5 ">
          <img
            src={userImg}
            className="rounded-full h-12 w-12 object-contain border-1 p-1 mr-3"
          />
          <p className="flex-1 font-bold">{username}</p>
          <BsThreeDots />
        </div>

        <img src={image} className="object-cover w-full" />

        {/* buttons  */}

        {session && (
          <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-5">
              {hasLiked ? (
                <AiFillHeart onClick={likePost} className="btn text-red-500" />
              ) : (
                <AiOutlineHeart onClick={likePost} className="btn" />
              )}
              <BsChatDots className="btn" />
              <HiOutlinePaperAirplane className="btn rotate-45" />
            </div>
            <BsBookmark className="btn" />
          </div>
        )}
        {/* caption  */}
        <p className="p-5 truncate">
          {likes.length > 0 && (
            <p className="font-bold mb-1">{likes.length} likes</p>
          )}
          <span className="font-bold mr-1">{username} </span>
          {caption}
        </p>

        {/* comments  */}
        {comments.length > 0 && (
          <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  src={comment.data().userImg}
                  className="h-7 rounded-full"
                  alt="img"
                />
                <p className="text-sm flex-1">
                  <span className="font-bold"> {comment.data().username} </span>
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
        {/* input  */}

        {session && (
          <form className="flex items-center p-4">
            <HiOutlineEmojiHappy className="btn" />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-none mx-2 flex-1 h-7 focus:ring-0 outline-none"
              placeholder="Add a comment"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-bold text-blue-400"
            >
              post
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default post;
