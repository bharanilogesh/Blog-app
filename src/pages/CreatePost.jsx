import '../styles/createPost.css';
import { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserConsumerCreatePost } from '../context/createPostContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { getUserInput } from '../utils/firebaseFunction';

const CreatePost = () => {
  const {
    isEdit,
    setIsEdit,
    editingObj,
    setEditingObj,
    uploadImage,
    newImage,
    setNewImage,
    dispatch,
    newCategory,
    setNewCategory,
    newDescription,
    setNewDescription,
    newName,
    setNewName,
  } = UserConsumerCreatePost();

  function submitHandler() {
    setNewName('');
    setNewDescription('');
    setNewImage('');
    setNewCategory('');
  }

  const date = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
  };

  date();

  const fetchData = async () => {
    await getUserInput().then((data) => {
      dispatch({ type: 'GET_DATA', blogData: data });
    });
  };

  const navigate = useNavigate();
  const userCollectionRef = collection(db, 'userInput');
  const createPost = async () => {
    if ((newName && newDescription && newCategory) || newImage) {
      if (!isEdit) {
        try {
          await addDoc(userCollectionRef, {
            id: auth.currentUser.uid,
            name: newName,
            description: newDescription,
            image: newImage,
            category: newCategory,
            time: date(),
          });
        } catch (error) {
          console.log(error);
        }
        navigate('/');
        toast.success('Blog Added Successfully!');
      } else {
        try {
          const itemToEditRef = doc(db, 'userInput', editingObj.id);
          await updateDoc(itemToEditRef, {
            id: itemToEditRef.id,
            name: newName,
            description: newDescription,
            image: editingObj.image,
            category: newCategory,
            time: editingObj.time,
          });
        } catch (error) {
          console.log(error);
        }
        setIsEdit(false);
        setEditingObj(null);
        navigate('/');
        toast.success('Blog Updated Successfully!');
      }
    } else {
      alert('Input Field Is Mandatory');
      toast.error('Input Field Is Mandatory!');
    }
    submitHandler();
    fetchData();
  };

  return (
    <div className='createPost'>
      <h1 className='createPost-title'>
        {isEdit ? 'Update Blog' : 'Add Blog'}
      </h1>
      <div className='createPost-form'>
        <input
          type='text'
          name='name'
          placeholder='Blog name'
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
        <textarea
          name='description'
          cols='30'
          rows='10'
          placeholder='Description'
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          required
        ></textarea>
        {isEdit ? null : (
          <div className='createPost-form-img'>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={(event) => uploadImage(event)}
              required
            />
          </div>
        )}
        <input
          type='text'
          name='category'
          placeholder='Category'
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          required
        />
        <div className='createPostBtn'>
          <input
            type='submit'
            value={isEdit ? 'Update' : 'Add'}
            className='createPost-addBtn'
            onClick={(event) => createPost(event.target.value)}
          />

          <input type='submit' value='Cancel' onClick={submitHandler} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
