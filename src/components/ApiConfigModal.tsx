import { useState } from "react";
import { getApiKey, setApiKey } from "../utils/storage";

interface ApiConfigModalProps { onClose: () => void; onSaved: () => void; }

function ApiConfigModal({ onClose, onSaved }: ApiConfigModalProps) {
  const [apiKey, setKey] = useState(getApiKey());
  const save = () => { setApiKey(apiKey); onSaved(); onClose(); };
  return <div className="modal-overlay active" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-dialog api-config-dialog" role="dialog" aria-modal="true" aria-labelledby="api-config-title"><button className="modal-close-btn" type="button" aria-label="Close" onClick={onClose}>×</button><div className="modal-content-details"><h2 id="api-config-title" className="modal-title">TMDB API Key</h2><p className="modal-overview">Paste your TMDB v3 API key here. It is stored only in this browser.</p><label htmlFor="api-key-input">API key</label><input id="api-key-input" className="search-input" type="password" value={apiKey} onChange={(event) => setKey(event.target.value)} placeholder="Paste your API key" /><div className="modal-footer-actions"><button className="btn-primary" type="button" onClick={save}>Save API Key</button><button className="btn-secondary" type="button" onClick={onClose}>Cancel</button></div></div></div></div>;
}

export default ApiConfigModal;