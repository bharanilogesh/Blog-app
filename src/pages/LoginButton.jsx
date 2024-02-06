import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((userCredential) => {
      const user = userCredential.user;
      navigate('/');
    });
  };
  return (
    <button className='login-btn' onClick={signInWithGoogle}>
      LogIn with <span>Google</span>
    </button>
  );
};

export default LoginButton;
