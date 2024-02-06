import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const userCollectionRef = collection(db, 'userInput');
const profileCollectionRef = collection(db, 'profileData');

const getUserInput = async () => {
  const data = await getDocs(userCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const setProfileData = async (data) => {
  const profileRef = doc(db, 'profileData', `${Date.now()}`);
  await setDoc(profileRef, data, { merge: true });
};

const getProfileData = async () => {
  const data = await getDocs(profileCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export { getUserInput, setProfileData, getProfileData };
