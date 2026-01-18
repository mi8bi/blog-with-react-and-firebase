import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";

type Post = {
  id: string;
  title: string;
  postText: string;
  author: {
    username: string;
    id: string;
  };
};

const Home = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        setPostList(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Post),
        );
      } catch (error) {
        console.error("投稿の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    setDeletingPostId(postId);
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPostList(postList.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
    } finally {
      setDeletingPostId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {postList.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">投稿がまだありません</p>
        </div>
      ) : (
        postList.map((post) => {
          const isLoggedIn = auth.currentUser !== null;
          const isOwnPost =
            isLoggedIn && auth.currentUser?.uid === post.author.id;

          return (
            <div
              key={post.id}
              className="bg-white rounded-lg p-5 w-full max-w-md shadow-md hover:shadow-lg transition duration-300"
            >
              <h1 className="text-xl font-bold text-center mb-2">
                {post.title}
              </h1>
              <div className="wrap-break-word w-full mb-4 text-gray-700">
                {post.postText}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  @{post.author.username}
                </div>
                {isOwnPost && (
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingPostId === post.id}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:shadow-md transition transform hover:translate-y-1 duration-300 shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {deletingPostId === post.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>削除中...</span>
                      </>
                    ) : (
                      <span>削除</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
