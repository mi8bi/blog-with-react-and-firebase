import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children?: React.ReactNode;
  className?: string;
};

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`no-underline text-white
       hover:text-blue-300 duration-300 transition-all${
         className ? ` ${className}` : ""
       }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
