import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Spinner } from '../components/Spinner';
import { get } from '../utils/httpClient';
import styles from './MovieDetails.module.css';
import { useQuery } from '../hooks/useQuery';
import { getMovieImg } from '../utils/getMovieImg';

export function MovieDetails() {

	const { movieId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [movie, setMovie] = useState(null);

	const query = useQuery();
	const search = query.get("search");

	useEffect(() => {
		setIsLoading(true);
		get("/movie/" + movieId).then((data) => {
			setIsLoading(false);
			setMovie(data);
		});
	}, [movieId])

	if (isLoading) {
		return <Spinner />;
	}
	
	const imageUrl = getMovieImg(movie.poster_path, 300);
	return(
		<div className={styles.detailsContainer}>
			<img className={`${styles.col} ${styles.movieImage}`} src={imageUrl} alt={movie.title} />
			<div className={`${styles.col} ${styles.movieDetails}`}>
				<p className={styles.firstItem}><strong>Title: </strong>{movie.title}</p>
				<p><strong>Genres: </strong>{movie.genres.map(genre => genre.name).join(", ")}</p>
				<p><strong>Description: </strong>{movie.overview}</p>
			</div>
		</div>
	);
}