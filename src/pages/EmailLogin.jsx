import '../styles/signUp.css';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';


const EmailLogin = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((userCredential) => {
      const user = userCredential.user;
      navigate('/');
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, newEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/');
        setNewEmail('');
        setPassword('');
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          alert('Password is wrong');
        }
        console.log('Err', err.message);
      });
  };

  return (
    <div className='contact' id='contact'>
      <div className='title-container'>
        <h2 className='title-name'>Log In</h2>
        <span className='title-subtitle'>Use Your Blog App Account !</span>
      </div>
      <form className='contact-form' onSubmit={onSubmit}>
        
        <input
          type='email'
          name='email'
          placeholder='Enter a valid email address'
          className='contact-form-email'
          required
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />

        <input
          type='password'
          name='password'
          className='contact-form-message'
          placeholder='Enter your password'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            LogIn
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
          
        </div>
        <span>
        <button className='login-btn' onClick={signInWithGoogle}>
      LogIn with <span>Google</span>
    </button>
        </span>
        <div className='already-acc'>
          Not account yet ?{'   '}
          <span className='already-acc-log'>
            <NavLink to='/emailSignin'>Click here to Register</NavLink>
          </span>
        </div>
        <div className='demoEmail'>
          <p className='demoEmail-title'>Test Credentials</p>
          <div className='trail-email'>
            <div>
              <h4>Email :</h4>
              <p>www.b55@gmail.com</p>
            </div>
            <div>
              <h4>Password :</h4>
              <p>123456</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailLogin;
