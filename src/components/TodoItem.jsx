import { useState } from 'react'
import { PRIORITIES } from '../interfaces/Todo'

const today = () => new Date().toISOString().slice(0, 10)

const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

// GÜNCELLE (düzenle + tamamla) ve SİL işlemleri
export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const priority = todo.priority || 'medium'
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({
    text: todo.text,
    priority,
    dueDate: todo.dueDate || '',
  })

  const overdue = !todo.done && todo.dueDate && todo.dueDate < today()

  const save = () => {
    if (!draft.text.trim()) return
    onUpdate(todo.id, { ...draft, text: draft.text.trim() })
    setEditing(false)
  }

  const cancel = () => {
    setDraft({ text: todo.text, priority, dueDate: todo.dueDate || '' })
    setEditing(false)
  }

  if (editing) {
    return (
      <li className="todo-item editing">
        <input
          type="text"
          className="edit-input"
          value={draft.text}
          autoFocus
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
        />
        <div className="row">
          <select
            value={draft.priority}
            onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
          >
            {Object.entries(PRIORITIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <input
            type="date"
            value={draft.dueDate}
            onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
          />
        </div>
        <div className="actions">
          <button className="btn btn-small btn-primary" onClick={save}>Kaydet</button>
          <button className="btn btn-small" onClick={cancel}>Vazgeç</button>
        </div>
      </li>
    )
  }

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label="Tamamlandı"
      />
      <div className="todo-body">
        <span className="todo-text">{todo.text}</span>
        <div className="meta">
          <span className={`badge badge-${priority}`}>{PRIORITIES[priority]}</span>
          {todo.dueDate && (
            <span className={`due ${overdue ? 'overdue' : ''}`}>
              {overdue ? 'Gecikti · ' : ''}
              {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-small" onClick={() => setEditing(true)}>Düzenle</button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(todo.id)}>Sil</button>
      </div>
    </li>
  )
}
