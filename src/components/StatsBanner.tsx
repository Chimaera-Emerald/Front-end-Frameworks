interface StatsBannerProps { count: number; averageRating: number; genreName: string; isLiveApi: boolean; }

function StatsBanner({ count, averageRating, genreName, isLiveApi }: StatsBannerProps) {
  return <div className="stats-banner"><div className="stat-card"><div className="stat-info"><span className="stat-value">{count}</span><span className="stat-label">Available Titles</span></div></div><div className="stat-card"><div className="stat-info"><span className="stat-value">{averageRating.toFixed(1)} / 10</span><span className="stat-label">Average Rating</span></div></div><div className="stat-card"><div className="stat-info"><span className="stat-value">{genreName}</span><span className="stat-label">Selected Genre</span></div></div><div className="stat-card"><div className="stat-info"><span className="stat-value">{isLiveApi ? "Live TMDB" : "Local Sample"}</span><span className="stat-label">Data Source</span></div></div></div>;
}

export default StatsBanner;