import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const Logout = ({ setIsAuth }: LoginProps) => {
  const navigate = useNavigate();
  const logoutWithGoogle = () => {
    // Googleでログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div>
      <p>ログアウトする</p>
      <button type="button" onClick={logoutWithGoogle}>
        ログアウト
      </button>
    </div>
  );
};

export default Logout;
