import TodoItem from './TodoItem'

// LİSTELE işlemi
export default function TodoList({ todos, emptyText, ...handlers }) {
  if (todos.length === 0) {
    return <p className="empty">{emptyText}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...handlers} />
      ))}
    </ul>
  )
}
