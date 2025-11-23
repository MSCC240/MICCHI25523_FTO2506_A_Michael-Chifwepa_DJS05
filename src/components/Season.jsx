import styles from "./Season.module.css";

export default function Season({ season }) {
  return (
    <div className={styles.season}>
      <h2 className={styles.seasonTitle}>
        {season.title || `Season ${season.season}`}
      </h2>

      <ul className={styles.episodes}>
        {season.episodes.map((ep, index) => (
          <li key={index} className={styles.episode}>
            <img src={ep.image} alt={ep.title} />
            <div>
              <h4>
                Episode {ep.episode}: {ep.title}
              </h4>
              <p>{ep.description.slice(0, 120)}...</p>
              <small>{new Date(ep.date).toLocaleDateString()}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
