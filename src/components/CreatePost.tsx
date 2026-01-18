import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

type CreatePostProps = {
  isAuth: boolean;
};

const CreatePost = ({ isAuth }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const createPost = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        postText: postText,
        author: {
          username: auth.currentUser?.displayName,
          id: auth.currentUser?.uid,
        },
      });
      setTitle("");
      setPostText("");

      navigate("/");
    } catch (error) {
      console.error("投稿に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold">記事を投稿する</h1>
        <div className="mb-4">
          <div className="font-medium">タイトル</div>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="タイトルを記入"
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <div className="font-medium">投稿</div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded h-32"
            placeholder="投稿内容を記入"
            onChange={(e) => setPostText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="mt-6 flex justify-end items-center gap-4">
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">投稿中...</span>
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer transition transform hover:translate-y-1 duration-300 shadow-md hover:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="button"
            onClick={createPost}
            disabled={isLoading}
          >
            投稿する
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
