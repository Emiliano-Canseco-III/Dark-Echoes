// ==== IMPORTS ==== //
import { useState } from "react";
import PropTypes from "prop-types";
import { episodeList } from "./data";
import "./index.css";

function App() {
  // State: keep the imported array and the selected episode
  const [allEpisodes] = useState(episodeList);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  // Component: Single list item
  function EpisodeListItem({ episode, onSelect }) {
    return (
      <li className="episode-item" onClick={() => onSelect(episode)}>
        {episode.title}
      </li>
    );
  }
  EpisodeListItem.propTypes = {
    episode: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  // Component: list of episodes
  function EpisodeList({ episodes, onSelect }) {
    return (
      <ul className="episode-list">
        {episodes.map((ep) => (
          <EpisodeListItem key={ep.id} episode={ep} onSelect={onSelect} />
        ))}
      </ul>
    );
  }

  EpisodeList.propTypes = {
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  // Component: details panel
  function EpisodeDetails({ episode }) {
    if (!episode) {
      return (
        <p className="select-prompt">Pick an episode to see more details!</p>
      );
    }

    return (
      <section className="episode-details">
        <h2>
          episode {episode.id}: {episode.title}
        </h2>
        <p>{episode.description}</p>
      </section>
    );
  }
  EpisodeDetails.propTypes = {
    episode: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  };

  // Main render
  return (
    <div className="App">
      <header>
        <h1>Dark Echoes</h1>
      </header>

      <main className="main-grid">
        <aside className="left-col">
          <h3>Episodes</h3>
          <EpisodeList episodes={allEpisodes} onSelect={setSelectedEpisode} />
        </aside>

        <section className="right-col">
          <h3>Details</h3>
          <EpisodeDetails episode={selectedEpisode} />
        </section>
      </main>
    </div>
  );
}

export default App;
