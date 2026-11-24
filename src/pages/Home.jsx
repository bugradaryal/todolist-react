import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Header from '../components/Header'
import Stats from '../components/Stats'
import TodoForm from '../components/TodoForm'
import Toolbar from '../components/Toolbar'
import TodoList from '../components/TodoList'
import { createTodo, isTodo, STORAGE_KEY } from '../interfaces/Todo'

export default function Home() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, [], isTodo)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const addTodo = (text, priority, dueDate) =>
    setTodos([createTodo(text, priority, dueDate), ...todos])

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const updateTodo = (id, changes) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...changes } : t)))

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id))

  const clearDone = () => setTodos(todos.filter((t) => !t.done))

  // TEMİZLE: localStorage'daki tüm görevleri siler
  const clearAll = () => {
    if (todos.length === 0) return
    if (window.confirm('Tüm görevler silinecek. Emin misin?')) {
      setTodos([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const visible = todos.filter((t) => {
    if (filter === 'active' && t.done) return false
    if (filter === 'done' && !t.done) return false
    return t.text.toLowerCase().includes(search.trim().toLowerCase())
  })

  const hasDone = todos.some((t) => t.done)

  return (
    <div className="page">
      <Header />
      <Stats todos={todos} />
      <TodoForm onAdd={addTodo} />

      <section className="panel">
        <h2>Görev Listesi</h2>
        <Toolbar
          filter={filter}
          onFilter={setFilter}
          search={search}
          onSearch={setSearch}
        />
        <TodoList
          todos={visible}
          emptyText={
            todos.length === 0
              ? 'Henüz görev yok. Yukarıdan bir tane ekle.'
              : 'Bu filtreye uyan görev yok.'
          }
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
        <div className="footer">
          <button className="btn" onClick={clearDone} disabled={!hasDone}>
            Tamamlananları Temizle
          </button>
          <button className="btn btn-danger" onClick={clearAll} disabled={todos.length === 0}>
            Temizle (Tümünü Sil - localStorage)
          </button>
        </div>
      </section>
    </div>
  )
}
