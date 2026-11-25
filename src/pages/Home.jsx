import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Stats from '../components/Stats'
import TodoForm from '../components/TodoForm'
import Toolbar from '../components/Toolbar'
import TodoList from '../components/TodoList'
import { createTodo } from '../interfaces/Todo'
import Footer from '../components/Footer'

// localStorage'dan görevleri oku
function load() {
  try {
    return JSON.parse(localStorage.getItem('todos')) || []
  } catch {
    return []
  }
}

export default function Home() {
  const [todos, setTodos] = useState(load)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // görevler her değiştiğinde kaydet, liste boşsa localStorage'dan sil
  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem('todos')
    } else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = (text, priority, dueDate) =>
    setTodos([createTodo(text, priority, dueDate), ...todos])

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const updateTodo = (id, changes) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...changes } : t)))

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id))

  const clearDone = () => setTodos(todos.filter((t) => !t.done))

  // Temizle: hepsini sil (useEffect localStorage'daki anahtarı da kaldırır)
  const clearAll = () => {
    if (window.confirm('Tüm görevler silinecek. Emin misin?')) {
      setTodos([])
    }
  }

  const visible = todos.filter((t) => {
    if (filter === 'active' && t.done) return false
    if (filter === 'done' && !t.done) return false
    return t.text.toLowerCase().includes(search.trim().toLowerCase())
  })

  return (
    <>
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
        <div className="alt-foot-button">
          <button className="btn" onClick={clearDone} disabled={!todos.some((t) => t.done)}>
            Tamamlananları Temizle
          </button>
          <button className="btn btn-danger" onClick={clearAll} disabled={todos.length === 0}>
            Temizle (Tümünü Sil)
          </button>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  )
}