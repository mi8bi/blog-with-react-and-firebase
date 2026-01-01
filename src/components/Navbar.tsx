import {
  faHouse,
  faFilePen,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavbarProps = {
  isAuth: boolean;
};

const Navbar = ({ isAuth }: NavbarProps) => {
  return (
    <nav className="flex justify-center items-center h-12 bg-amber-700 gap-11">
      <NavLink to="/" className="px-2">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </NavLink>
      <NavLink to="/createpost" className="px-2">
        <FontAwesomeIcon icon={faFilePen} />
        記事投稿
      </NavLink>
      {!isAuth ? (
        <NavLink to="/login" className="px-2">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          ログイン
        </NavLink>
      ) : (
        <NavLink to="/logout" className="px-2">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          ログアウト
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
