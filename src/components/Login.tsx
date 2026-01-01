import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsAuth }: LoginProps) => {
  const navigate = useNavigate();
  const loginWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div>
      <p>ログインして始める</p>
      <button type="button" onClick={loginWithGoogle}>
        Googleでログイン
      </button>
    </div>
  );
};

export default Login;
