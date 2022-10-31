import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { addToFavList, deleteToFavList } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { async } from "@firebase/util";

const Card = ({ movie }) => {

  const dispatch = useDispatch();
  const favList = useSelector((state) => state.favList);
  const fsCollection = collection(db, "fav-users");

  // useEffect(() => {
    // deleteDoc(fsCollection);
  //   addFavToFireStore();
  // }, [favList]);

  function formatDate(date) {
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  }

  


//   if (!isAlreadyInFav) 
  // addDoc(fsCollection, { film_title: title, film_id: id }); 
// else
  // deleteDoc(doc(fsCollection, docId));

  // const isInFireStore = (id) => {
  //   let isAlreadyInFav = false;
  //   getDocs(fsCollection)
  //     .then(data => data.docs.map(doc => { if (doc.data().film_id === id) isAlreadyInFav = true; return;}))
  //     return isAlreadyInFav;

  // };

  function findGenre(genres, token) {
    const new_list = [];
    const genreDict = {
      28: "Action ",
      12: "Adventure ",
      16: "Animation ",
      35: "Comedy ",
      80: "Crime ",
      99: "Documentary ",
      18: "Drama ",
      10751: "Family ",
      14: "Fantasy ",
      36: "History ",
      27: "Horror ",
      10402: "Music ",
      9648: "Mystery ",
      10749: "Romance ",
      878: "Science Fiction ",
      10770: "TV Movie ",
      53: "Thriller ",
      10752: "War ",
      37: "Western ",
    };
    if (token === 1) {
      for (let i = 0; i < genres.length; i++)
        for (let key in genreDict)
          if (genres[i].toString() === key) new_list.push(genreDict[key]);
    } else {
      for (let i = 0; i < genres.length; i++) new_list.push(genres[i].name);
    }
    return new_list.map((genre, i) => <li key={i}>{genre}</li>);
  }

  function isInFavList(id) {
    for (let i = 0; i < favList.length; i++)
      if (favList[i] === id)
        return true;
    return false;
  };

  let isAlreadyInFav = false;

  const addOrDeleteToFireStore = async (id) => {
    let docId = "";
    await getDocs(fsCollection)
      .then(data => data.docs.map(doc => { 
        if (doc.data().film_id === id) {
          docId = doc.id; 
          isAlreadyInFav = !isAlreadyInFav; 
        }}))
     return [isAlreadyInFav, docId];
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="movie-poster"
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>Release date : {formatDate(movie.release_date)}</h5>
      ) : (
        <h5>date unavailable</h5>
      )}
      <h4>
        {movie.vote_average}/10 <span>⭐</span>
      </h4>
      {movie.genre_ids ? (
        <ul>{findGenre(movie.genre_ids, 1)}</ul>
      ) : movie.genres ? (
        <ul>{findGenre(movie.genres, 0)}</ul>
      ) : (
        ""
      )}
      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <Checkbox
          className="btn"
          onClick={() => addOrDeleteToFireStore(movie.id)
            .then(res => res[1] === '' ? addDoc(fsCollection, { film_title: movie.title, film_id: movie.id }) : deleteDoc(doc(fsCollection, res[1])))} // favList.includes(movie.id) ? dispatch(deleteToFavList(movie.id)) : dispatch(addToFavList(movie.id))
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          style={{ color: "#FB2576" }}
          checked={isAlreadyInFav}
        />
      ) : (
        <div className="btn" onClick={() => addOrDeleteToFireStore(movie.id)}>
          <i className="fas fa-solid fa-trash"></i>
        </div>
      )}
    </div>
  );
};

export default Card;
