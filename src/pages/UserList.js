import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { addDoc, collection, getDocs, deleteField, doc, deleteDoc } from 'firebase/firestore';


const UserList = () => {
  const [listData, setlistData] = useState([]);
  const [users, setUsers] = useState([]);
  const favList = useSelector((state) => state.favList);

  const fsCollection = collection(db, "fav-users");
  
  useEffect(() => {
        getDocs(fsCollection)
        .then(data => setUsers(data.docs.map(doc => [doc.data().film_id])))
  }, []);

  deleteDoc(doc(fsCollection, "test"));


  useEffect(() => {
    setlistData([]);
    users.map((user) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${user}external_ids?api_key=f2325b7f071669430ffa93fbe85df4ad`
        )
        .then((res) => setlistData((listData) => [...listData, res.data]));
    })
  }, [users]);
  return (
    <div className="user-list-page">
      <Header />
      <h2>
        <span>❤️</span> My Favlist
      </h2>
      {users.map(user => {return (
        <div>{user} : {user.film_id}</div>
      )})}
      
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
