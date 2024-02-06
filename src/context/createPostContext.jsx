import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react';
const UserContextCreatePost = createContext();
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import reducer from '../utils/createPostReducer';
import { getUserInput } from '../utils/firebaseFunction';

const initialState = {
  blogData: null,
};

const UserProviderCreatePost = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [list, setList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingObj, setEditingObj] = useState(null);
  const [mainBlogObj, setMainBlogObj] = useState(null);
  const [searchItems, setSearchItems] = useState([]);

  const [newImage, setNewImage] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const fetchData = async () => {
    await getUserInput().then((data) => {
      dispatch({ type: 'GET_DATA', blogData: data });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchItem = (e) => {
    if (e !== '') {
      dispatch({ type: 'FILTER', payload: { e: e } });
    } else {
      fetchData();
    }
  };

  const showMainBlog = (id) => {
    const getMainBlogObj = state.blogData.find((item) => item.id === id);
    setMainBlogObj(getMainBlogObj);
  };

  const deleteItem = async (id) => {
    try {
      const itemToDeleteRef = doc(db, 'userInput', id);
      await deleteDoc(itemToDeleteRef);
      fetchData();

      toast.success('Blog Deleted Successfully !');
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (id) => {
    const filteredEditObj = state.blogData.find((item) => item.id === id);
    setIsEdit(true);
    setEditingObj(filteredEditObj);
    setNewName(filteredEditObj.name);
    setNewDescription(filteredEditObj.description);
    setNewCategory(filteredEditObj.category);
  };

  const uploadImage = (event) => {
    const imageFile = event.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            toast.info('Upload is Paused!');
            break;
          case 'running':
            toast.warning('Waiting for Image Upload!!');
            break;
        }
      },
      (error) => {
        console.log('Error', error);
        toast.error('Error... Try Again!');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewImage(downloadURL);
          toast.success('Image Uploaded Successfully!');
        });
      }
    );
  };

  return (
    <UserContextCreatePost.Provider
      value={{
        ...state,
        dispatch,
        list,
        setList,
        deleteItem,
        editItem,
        isEdit,
        setIsEdit,
        editingObj,
        setEditingObj,
        mainBlogObj,
        showMainBlog,
        searchItem,
        uploadImage,
        newImage,
        setNewImage,
        newCategory,
        setNewCategory,
        newDescription,
        setNewDescription,
        newName,
        setNewName,
      }}
    >
      {children}
    </UserContextCreatePost.Provider>
  );
};

const UserConsumerCreatePost = () => {
  return useContext(UserContextCreatePost);
};

export {
  UserContextCreatePost,
  UserProviderCreatePost,
  UserConsumerCreatePost,
};
