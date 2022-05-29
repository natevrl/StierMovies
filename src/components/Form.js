import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Card from './Card.js'

const Form = () => {

  const [moviesData, setMoviesData] = useState([""]);
  const [search, setSearch] = useState("toy story");
  const [sortNote, setSortNote] = useState(null);

  // a chaque fois que [search] change, axios fait une nouvelle requete avec le nouveau lien
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f2325b7f071669430ffa93fbe85df4ad&query=${search}&language=en-US&page=1&include_adult=false`
      ).then(res => setMoviesData(res.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input  type="text" placeholder="Entrez le titre d'un film" 
                  id="search-input" onChange={(e) => setSearch(e.target.value)}/>
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">
          <div className="btn-sort" id="goodToBad" onClick={() => setSortNote("goodToBad")}>Top<span>→</span></div>
          <div className="btn-sort" id="badToGood" onClick={() => setSortNote("badToGood")}>Flop<span>→</span></div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 12)
          .sort(
            (a, b) => {
              if (sortNote === "goodToBad")
                return (b.vote_average - a.vote_average)
              else if (sortNote === "badToGood")
                return (a.vote_average - b.vote_average)
            })
          .map(movie => <Card key={movie.id} movie={movie}/>)}
        
      </div>
    </div>
  );
};

export default Form;
