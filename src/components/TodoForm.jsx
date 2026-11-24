import { useState } from 'react'
import { PRIORITIES } from '../interfaces/Todo'

// EKLE işlemi
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim(), priority, dueDate)
    setText('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form className="panel todo-form" onSubmit={handleSubmit}>
      <h2>Yeni Görev Ekle</h2>
      <label>
        Görev *
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Örn: Proje sunumunu hazırla"
          maxLength={120}
        />
      </label>
      <div className="row">
        <label>
          Öncelik
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {Object.entries(PRIORITIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          Son Tarih
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Görev Ekle</button>
    </form>
  )
}
