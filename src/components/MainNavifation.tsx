import { NavLink } from 'react-router-dom';

function MainNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Registration</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
