import React, { Component } from 'react';

// const Card = ({movie}) => {

// 	const formatDate = (date) => {
// 		const debut = date.split('-');
		
// 		return (debut[0]);
// 	};

// 	return (
// 		<div className="card">
// 			<img src={movie.poster_path ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : "./img/poster.jpg"} alt="movie-poster" />
// 			<h2>{movie.title}</h2>
// 			{movie.release_date ? <p>{formatDate(movie.release_date)}</p> : "date unavaible"}
// 		</div>
// 	);
// };


class Card extends Component {
	
	formatDate(date) {
		const [yy, mm, dd] = date.split('-');
		return [dd, mm, yy].join('/');
	};
	
	findGenre(genres) {
		const new_list = [];
		const genreDict = { '28': "Action ", '12': "Adventure ", '16': "Animation ", '35': "Comedy ", '80': "Crime ", '99': "Documentary ", '18': "Drama ", '10751': "Family ", '14': "Fantasy ", '36': "History ", '27': "Horror ", '10402': "Music ", '9648': "Mystery ", '10749': "Romance ", '878': "Science Fiction ", '10770': "TV Movie ", '53': "Thriller ", '10752': "War ", '37': "Western "};
		for (let i = 0; i < genres.length; i++)
			for (let key in genreDict)
				if (genres[i].toString() === key)
					new_list.push(genreDict[key]);
		return (new_list.map(genre => <li key={genre}>{genre}</li>))
	};
	
	addStorage(id) {
	
		const data_list = window.localStorage.movie ? window.localStorage.movie.split(',') : [];
		if (!data_list.includes(id.toString()))
		{
			data_list.push(id);
			window.localStorage.movie = data_list;
		} else
			alert("DEJA IN");


	}
	render() { 
		const movie = this.props.movie;
		return (
			<div className="card">
				<img src={movie.poster_path ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : "./img/poster.jpg"} alt="movie-poster" />
				<h2>{movie.title}</h2>
				{movie.release_date ? <h5>Release date : {this.formatDate(movie.release_date)}</h5> : <h5>date unavailable</h5>}
				<h4>{movie.vote_average}/10 <span>⭐</span></h4>
				{movie.genre_ids ? <ul>{this.findGenre(movie.genre_ids)}</ul> : ""}
				{movie.overview ? <h3>Synopsis</h3> : ""}
				<p>{movie.overview}</p>
				<div className="btn" onClick={() => this.addStorage(movie.id)}>Add to your favlist</div>
			</div>
		);
	}
}
 
export default Card;