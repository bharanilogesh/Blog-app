import { UserConsumer } from '../context/userContext';
import '../styles/profile.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

const Profile = () => {
  const {
    name,
    email,
    selectCity,
    address,
    gender,
    image,
    number,
    isEditing,
    setUserLoginData,
    userProfile,
    profileData,
  } = UserConsumer();

  useEffect(() => {
    userProfile();
  }, [profileData]);

  const navigate = useNavigate();

  const signOutGoogle = () => {
    signOut(auth);
    setUserLoginData(null);
    navigate('/');
  };

  const doneBtn = () => {
    navigate('/');
  };

  return (
    <section className='profile'>
      <div className='profile-img'>
        <img src={image} alt='img' />
      </div>

      <from className='profile-data'>
        <h1>Your Profile</h1>
        <div className='profile-row-readonly'>
          
          <div className='profile-name'>
            <label htmlFor='name'>User Name</label>
            <input
              type='text'
              value={name}
              name='name'
              id='name'
              readOnly
              placeholder='nill'
            />
          </div>
        </div>
        <div className='profile-row-readonly'>
          <div className='profile-email'>
            <label htmlFor='id_cmp_email'>Email</label>
            <input
              type='email'
              value={email}
              name='cmp_email'
              id='id_cmp_email'
              readOnly
            />
          </div>
          <div className='profile-phoneNum'>
            <label htmlFor='number'>Phone Number</label>
            <input
              type='number'
              value={number}
              name='number'
              id='number'
              readOnly
              placeholder='nill'
            />
          </div>
        </div>
        <div className='profile-row-readonly'>
          <div className='profile-city'>
            <label htmlFor='city'>Select City</label>
            <select value={selectCity} id='city' readOnly>
              <option>Select City</option>
              <option value='Namakkal'>Namakkal</option>
              <option value='Salem'>Salem</option>
              <option value='Erode'>Erode</option>
              <option value='Chennai'>Chennai</option>
              <option value='Coimbatore'>Coimbatore</option>
              <option value='Thirunelveli'>Thirunelveli</option>
              <option value='Chennai'>Chennai</option>
              <option value='Goa'>Thenkasi</option>
              <option value='Kerala'>Tuticorin</option>
            </select>
          </div>
          
        </div>
        <div className='profile-row-readonly'>
          <div className='profile-address'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              value={address}
              name='address'
              id='address'
              readOnly
              placeholder='nill'
            />
          </div>
          <div className='profile-radio'>
            <label>Gender</label>
            <div className='profile-radioContainer'>
              <div>
                <input
                  type='radio'
                  value='Male'
                  id='Male'
                  name='gender'
                  checked={'Male' === gender}
                  readOnly
                />
                <label htmlFor='Male'>Male</label>
              </div>
              <div>
                <input
                  type='radio'
                  value='Female'
                  id='Female'
                  name='gender'
                  checked={'Female' === gender}
                  readOnly
                />
                <label htmlFor='Female'>Female</label>
              </div>

              <div>
                <input
                  type='radio'
                  value='Other'
                  id='Other'
                  name='gender'
                  checked={'Other' === gender}
                  readOnly
                />
                <label htmlFor='Other'>Other</label>
              </div>
            </div>
          </div>
        </div>
        <div className='profile-btnContainer'>
          <Link to='/editProfile'>
            <button type='submit'>
              {!isEditing ? 'Edit Profile' : 'Edit Profile'}
            </button>
          </Link>
          <button onClick={signOutGoogle}>Logout</button>
          {isEditing && <button onClick={doneBtn}>Done</button>}
        </div>
      </from>
    </section>
  );
};

export default Profile;
