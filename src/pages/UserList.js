import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../Firebase";
import { addDoc, collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';



const UserList = () => {
	const [user, loading, error]= useAuthState(auth);
  const [listData, setlistData] = useState([]);
  const [firestoreFavList, setFirestoreFavList] = useState([]);
  const trashTrigger = useSelector(state => state.isTriggered);

  const fsCollection = collection(db, "users");


  const getFireStoreFavList = useCallback(async (uid) => {
    const docData = await getDoc(doc(fsCollection, uid))
    setFirestoreFavList(docData.data().film_id)
  }, []);
  
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authObj => {
      if (authObj)
          getFireStoreFavList(authObj.uid).catch(err => console.error(err));
      });
      return () => {unlisten()};
  }, [trashTrigger]);


  useEffect(() => {
    setlistData([]);
    firestoreFavList.map((fav) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${fav}external_ids?api_key=f2325b7f071669430ffa93fbe85df4ad`
        )
        .then((res) => setlistData((listData) => [...listData, res.data]));
    })
  }, [firestoreFavList]);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        <span>❤️</span> My Favlist
      </h2>
      <div>faaaav {user?.uid}</div>
      
      <div className="result">
        {listData.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
