import { Link } from "react-router-dom";

function NotFoundPage() { return <main className="main-container session-heading"><p className="eyebrow">404</p><h1>Page not found</h1><p className="results-summary">The page you requested does not exist.</p><Link className="btn-primary" to="/">Back to Home</Link></main>; }

export default NotFoundPage;