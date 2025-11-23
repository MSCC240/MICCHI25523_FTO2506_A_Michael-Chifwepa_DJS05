import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import SortSelect from "./components/SortSelect";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import PodcastDetailPage from "./pages/PodcastDetailPage";
import styles from "./App.module.css";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <Router>
      <PodcastProvider initialPodcasts={podcasts}>
        <Header />

        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <main className={styles.main}>
                <section className={styles.controls}>
                  <SearchBar />
                  <GenreFilter genres={genres} />
                  <SortSelect />
                </section>

                {loading && (
                  <div className={styles.messageContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading podcasts...</p>
                  </div>
                )}

                {error && (
                  <div className={styles.message}>
                    <div className={styles.error}>
                      Error occurred while fetching podcasts: {error}
                    </div>
                  </div>
                )}

                {!loading && !error && (
                  <>
                    <PodcastGrid genres={genres} />
                    <Pagination />
                  </>
                )}
              </main>
            }
          />

          {/* PODCAST DETAIL PAGE */}
          <Route path="/show/:id" element={<PodcastDetailPage />} />

        </Routes>
      </PodcastProvider>
    </Router>
  );
}
