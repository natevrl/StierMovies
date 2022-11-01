import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { addToFavList, deleteToFavList } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../Firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc, arrayUnion, updateDoc, arrayRemove, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


const Card = ({ movie }) => {

  const dispatch = useDispatch();
	const [user, loading, error]= useAuthState(auth);
  const favList = useSelector((state) => state.favList);
  const fsCollection = collection(db, "users");

  function formatDate(date) {
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

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
          if (genres[i].toString() === key) 
            new_list.push(genreDict[key]);
    } else {
        for (let i = 0; i < genres.length; i++) 
          new_list.push(genres[i].name);
    }
    return new_list.map((genre, i) => <li key={i}>{genre}</li>);
  }

  async function isInFireStore(id) {
    let isIn = false;
    const docData = await getDoc(doc(fsCollection, user.uid));
    docData.data().film_id.map(film => {if (film === id) isIn = true;});
    return isIn;
  };

  function addOrRemoveField(bool) {
    return updateDoc(doc(fsCollection, user.uid), bool ? {film_id: arrayRemove(movie.id)} : {film_id: arrayUnion(movie.id)}) 
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
          onClick={() => isInFireStore(movie.id).then(retour => retour === true ? addOrRemoveField(true) : addOrRemoveField(false))}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          style={{ color: "#FB2576" }}
          // checked={isAlreadyInFav}
        />
      ) : (
        <div className="btn" onClick={() => {}}>
          <i className="fas fa-solid fa-trash"></i>
        </div>
      )}
    </div>
  );
};

export default Card;
