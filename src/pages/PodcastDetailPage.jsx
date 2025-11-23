import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GENRE_MAP } from "../data";
import Season from "../components/Season";
import styles from "./PodcastDetailPage.module.css";

export default function PodcastDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    async function loadShow() {
      try {
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!res.ok) throw new Error("Failed to load podcast.");

        const data = await res.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadShow();
  }, [id]);

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!show) return <p>Podcast not found.</p>;

  const seasonOptions = show.seasons.map((s, index) => ({
    label: `Season ${s.season}`,
    value: index,
  }));

  const currentSeason = show.seasons[selectedSeason];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className={styles.header}>
        <img src={show.image} alt={show.title} className={styles.coverImage} />

        <div className={styles.headerInfo}>
          <h1>{show.title}</h1>
          <p className={styles.description}>{show.description}</p>

          <div className={styles.detailsGrid}>
  <div>
    <strong>GENRES</strong>
    <div className={styles.tagRow}>
      {show.genres.map((gid) => (
        <span key={gid} className={styles.tag}>
          {GENRE_MAP[gid]}
        </span>
      ))}
    </div>
  </div>

  <div>
    <strong>LAST UPDATED</strong>
    <p>{new Date(show.updated).toLocaleDateString()}</p>
  </div>

  <div>
    <strong>TOTAL SEASONS</strong>
    <p>{show.seasons.length} Seasons</p>
  </div>

  <div>
    <strong>TOTAL EPISODES</strong>
    <p>
      {show.seasons.reduce(
        (total, s) => total + s.episodes.length,
        0
      )}{" "}
      Episodes
    </p>
  </div>
</div>
        </div>
      </div>

      {/* Season Selector */}
      <div className={styles.seasonSelector}>
        <label>Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasonOptions.map((season) => (
            <option key={season.value} value={season.value}>
              {season.label}
            </option>
          ))}
        </select>
      </div>

      {/* Episodes for selected season */}
      <Season season={currentSeason} forceOpen />
    </div>
  );
}
