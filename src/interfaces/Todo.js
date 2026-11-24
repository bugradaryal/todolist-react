// Görev yapısı: { id, text, done, priority, dueDate }

export const PRIORITIES = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

export function createTodo(text, priority = 'medium', dueDate = '') {
  return { id: Date.now(), text, done: false, priority, dueDate }
}