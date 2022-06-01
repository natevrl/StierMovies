import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";

const UserList = () => {
  const [listData, setlistData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const moviesList = window.localStorage.movie
      ? window.localStorage.movie.split(",")
      : [];
    for (let i = 0; i < moviesList.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesList[i]}external_ids?api_key=f2325b7f071669430ffa93fbe85df4ad`
        )
        .then((res) => setlistData((listData) => [...listData, res.data]));
    }
  }, []);

  function changeStateTest(data) {
    setlistData(data);
  }

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
            funcOfParent={changeStateTest}
            parentListData={listData}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
