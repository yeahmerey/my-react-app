import { useEffect } from "react";
import { fetchPosts } from "./postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
} from "./postsSlice.js";
export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p style={{ color: "red" }}>Error : {error}</p>;
  }
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(fetchPosts())}>Reload posts</button>
    </div>
  );
}
