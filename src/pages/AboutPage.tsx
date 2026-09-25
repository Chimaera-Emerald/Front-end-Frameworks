import { Link } from "react-router-dom";

function AboutPage() { return <main className="main-container session-heading"><p className="eyebrow">About CineGrid</p><h1>Movie discovery, kept simple.</h1><p className="results-summary">Browse popular TMDB movies, search titles, and save your favourites.</p><p><Link className="btn-primary" to="/">Back to Home</Link></p></main>; }

export default AboutPage;