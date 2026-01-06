import "../css/esqueletoCao.css";

function EsqueletoCao() {
  return (
    <div className="card h-100 skeleton-card">
      <div className="skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  );
}

export default EsqueletoCao;
