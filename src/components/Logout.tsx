import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LogoutProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const Logout = ({ setIsAuth }: LogoutProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logoutWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ログアウト</h1>
          <p className="text-gray-600">本当にログアウトしますか？</p>
        </div>

        <button
          type="button"
          onClick={logoutWithGoogle}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>ログアウト中...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>ログアウト</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-4 bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          ホームに戻る
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>ログアウト後はホーム画面に移動します</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
