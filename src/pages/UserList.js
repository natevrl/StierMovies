import axios from "axios";
import React, { useEffect, useState } from "react";
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
  // const favList = useSelector((state) => state.favList);


  const fsCollection = collection(db, "users");


  // async function getFireStoreFavList(uid) {
  //    const docData = await getDoc(doc(fsCollection, uid))
  //    return docData.data().film_id;
  // }

  useEffect(() => {
    auth.onAuthStateChanged(authObj => {
      if (authObj) {
        const getFireStoreFavList = async () => {
          const docData = await getDoc(doc(fsCollection, authObj.uid))
          setFirestoreFavList(docData.data().film_id)

        }
        getFireStoreFavList().catch(err => console.log(err));
      }
    })
  }, [getFireStoreFavList]);


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
      {/* {firestoreFavList.map(fav => {return (
        <div>{fav} : {fav.film_id}</div>
      )})} */}
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
