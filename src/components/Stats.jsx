export default function Stats({ todos }) {
  const total = todos.length
  const done = todos.filter((t) => t.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <section className="stats">
      <div className="stat">
        <strong>{total}</strong>
        <span>Toplam</span>
      </div>
      <div className="stat">
        <strong>{total - done}</strong>
        <span>Bekleyen</span>
      </div>
      <div className="stat">
        <strong>{done}</strong>
        <span>Tamamlanan</span>
      </div>
      <div className="progress" title={`%${percent} tamamlandı`}>
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}
