import React, { Component, useState } from 'react';



class Card extends Component {
	constructor () {
		super();
		this.state = { color: {color: 'rgb(196, 196, 196)'}};
	}	

	formatDate(date) {
		const [yy, mm, dd] = date.split('-');
		return [dd, mm, yy].join('/');
	};
	
	findGenre(genres, token) {
		const new_list = [];
		const genreDict = { '28': "Action ", '12': "Adventure ", '16': "Animation ", '35': "Comedy ", '80': "Crime ", '99': "Documentary ", '18': "Drama ", '10751': "Family ", '14': "Fantasy ", '36': "History ", '27': "Horror ", '10402': "Music ", '9648': "Mystery ", '10749': "Romance ", '878': "Science Fiction ", '10770': "TV Movie ", '53': "Thriller ", '10752': "War ", '37': "Western "};
		if (token === 1) {
			for (let i = 0; i < genres.length; i++)
				for (let key in genreDict)
					if (genres[i].toString() === key)
						new_list.push(genreDict[key]);
		} else {
			for (let i = 0; i < genres.length; i++)
				new_list.push(genres[i].name)
		}
		return (new_list.map((genre, i) => <li key={i}>{genre}</li>))
	};
	
	handleStorageData(id, token) {
		let data_list = window.localStorage.movie ? window.localStorage.movie.split(',') : [];
		if (!data_list.includes(id.toString()) && token === 1) { // add data to localStorage
			data_list.push(id);
			window.localStorage.movie = data_list;
		} else if (token === 2) { // delete data of localStorage
			let newDataList = data_list.filter((idm) => idm != id);
			window.localStorage.movie = newDataList;
			window.location.reload();
		}
	}
	render() { 
		const movie = this.props.movie;
		return (
			<div className="card">
				{/* <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : "./img/poster.jpg"} alt="movie-poster" /> */}
				<h2>{movie.title}</h2>
				{movie.release_date ? <h5>Release date : {this.formatDate(movie.release_date)}</h5> : <h5>date unavailable</h5>}
				<h4>{movie.vote_average}/10 <span>⭐</span></h4>
				{movie.genre_ids? <ul>{this.findGenre(movie.genre_ids, 1)}</ul> : movie.genres ? <ul>{this.findGenre(movie.genres, 0)}</ul> : ""}
				{movie.overview ? <h3>Synopsis</h3> : ""}
				<p>{movie.overview}</p>
				{movie.genre_ids ? <div className="btn" 
				onClick={() => {
					this.handleStorageData(movie.id, 1); 
					this.setState({color: {color: 'red'}})}
					}><i style={this.state.color} className="fas fa-solid fa-heart"></i></div> : <div className="btn" onClick={() => this.handleStorageData(movie.id, 2)}><i className="fas fa-solid fa-trash"></i>	</div>}
			</div>
		);
	}
}
 
export default Card;