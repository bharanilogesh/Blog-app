import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { UserConsumer } from '../context/userContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const { userLoginData } = UserConsumer();
  return (
    <div>
      {userLoginData ? <Navbar /> : "" }
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Root;
