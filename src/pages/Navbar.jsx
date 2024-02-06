import '../styles/navbar.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <h3>
          <Link to='/'>Blog</Link>
        </h3>
        <div className='navbar_addBtn'>
          <Link to='createPost'>
            <span>
              <FaRegPlusSquare />
            </span>
          </Link>
        </div>

        <Link className='login-info' to='profile'>
          <h5>Profile</h5>
          <span>
            <CgProfile />
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
