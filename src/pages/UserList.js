import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";


const UserList = () => {
  const [listData, setlistData] = useState([]);
  const favList = useSelector((state) => state.favList);
  
  useEffect(() => {
    setlistData([]);
    for (let i = 0; i < favList.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${favList[i]}external_ids?api_key=f2325b7f071669430ffa93fbe85df4ad`
        )
        .then((res) => setlistData((listData) => [...listData, res.data]));
    }
  }, [favList]);

console.log(listData);
  return (
    <div className="user-list-page">
      <Header />
      <h2>
        <span>❤️</span> My Favlist
      </h2>
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
