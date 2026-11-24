const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'active', label: 'Bekleyen' },
  { key: 'done', label: 'Tamamlanan' },
]

// Arama ve filtre çubuğu
export default function Toolbar({ filter, onFilter, search, onSearch }) {
  return (
    <div className="toolbar">
      <div className="tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`tab ${filter === f.key ? 'active' : ''}`}
            onClick={() => onFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        type="search"
        className="search"
        placeholder="Görevlerde ara..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
