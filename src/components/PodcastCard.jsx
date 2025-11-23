import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import { Link } from "react-router-dom";

/**
 * Renders a single podcast preview card with image, title, number of seasons,
 * genres (as styled tags), and the last updated date.
 */
export default function PodcastCard({ podcast, genres }) {
  if (!podcast) return null;

  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  return (
    <div className={styles.card}>
      <Link to={`/show/${podcast.id}`}>
        <img src={podcast.image} alt={podcast.title} />
      </Link>

      <h3>{podcast.title}</h3>
      <p className={styles.seasons}>{podcast.seasons} seasons</p>

      <div className={styles.tags}>{genreSpans}</div>

      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );
}
