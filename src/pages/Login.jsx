import book from '../../public/assets/book.svg';
import '../styles/login.css';
import EmailLogin from './EmailLogin';
import LoginButton from './LoginButton';
import { Link } from 'react-router-dom';

const LogIn = () => {
  return <>
  <div>
  <EmailLogin/>
  </div>
  </>;
};

export default LogIn;
