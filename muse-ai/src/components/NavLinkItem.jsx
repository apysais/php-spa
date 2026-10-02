import { NavLink } from 'react-router-dom';

export default function NavLinkItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `mr-3 ${isActive ? 'font-bold text-blue-600' : 'font-normal text-gray-700 hover:text-blue-600'}`
      }
    >
      {children}
    </NavLink>
  );
}