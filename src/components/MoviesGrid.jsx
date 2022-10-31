import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import styles from './MoviesGrid.module.css';

export function MoviesGrid() {

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/discover/movie", {
			headers: {
				Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGIyZjE2NDU1NTdjMmI4NTczMTVlY2RmNGRjMTk0NyIsInN1YiI6IjYzNWY0NWNiZmQ2MzAwMDA3ZTQxMTQ1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KQ7GCiKgImOePdB2-sBBr37-0iQE-rHNPqnC_wAIZR0",
				"Content-Type": "application/json;charset=utf-8",
			},
		}).then(result => result.json()).then(data => {
			setMovies(data.results);
		});
	}, []);

	return(
		<ul className={styles.moviesGrid}>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</ul>
	);
}