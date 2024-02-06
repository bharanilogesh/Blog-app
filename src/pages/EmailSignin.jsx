import '../styles/signUp.css';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const EmailSignin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/emailLogin');
      })
      .catch((err) => {
        if (err.code === `auth/email-already-in-use`) {
          alert(`Email already exists`);
        } else {
          console.log(`Error Occurred while registering`, err.message);
        }
      });
  };
  return (
    <div className='contact'>
      <div className='title-container'>
        <h2 className='title-name'>Sign Up</h2>
        <span className='title-subtitle'>Create a Blog Account !</span>
      </div>
      <form className='contact-form' onSubmit={onSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Enter a New Email Address...'
          className='contact-form-email'
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type='password'
          name='password'
          className='contact-form-message'
          placeholder='Enter New Password...'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <div className='btn-container'>
          <button type='submit' className='btn connect'>
            Register
            <span className='connect-icon'>
              <AiOutlineSend />
            </span>
          </button>
        </div>

        <div className='already-acc'>
          Have an account ?{'   '}
          <span className='already-acc-log'>
            <NavLink to='/emailLogin'>Click here to Login</NavLink>
          </span>
        </div>
      </form>
    </div>
  );
};

export default EmailSignin;
