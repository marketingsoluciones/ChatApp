import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, onAuthStateChanged, updateProfile,OAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
  authDomain: "auth.bodasdehoy.com",
  //databaseURL: "https://bodasdehoy-1063-default-rtdb.firebaseio.com",
  projectId: "bodasdehoy-1063",
  //storageBucket: "bodasdehoy-1063.appspot.com",
  messagingSenderId: "593952495916",
  appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
  measurementId: "G-GWQ17NF2YR",
};

const firebaseClient = initializeApp(firebaseConfig);
const auth = getAuth()
//const storage = getStorage();

//Providers
const GoogleProvider = () => {
  const provider = new GoogleAuthProvider();
 //provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return provider;
};

const FacebookProvider = new FacebookAuthProvider();

const AppleProvidor = () => {
  try {
    const provider = new OAuthProvider('apple.com');
    console.log("entro", provider)
  return provider
  } catch (error) {
    console.log("123",error)
  }
}

export { firebaseClient, GoogleProvider, FacebookProvider, auth,AppleProvidor };



//storage


/* export async function upload (file:File,currentUser) {
  const fileRef = ref(storage,currentUser.uid +'.png');
  const snapshot = await uploadBytes(fileRef,file)
} */