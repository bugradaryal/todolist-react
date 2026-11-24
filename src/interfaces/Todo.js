// Todo arayüzü:
// { id: number, text: string, done: boolean, priority: 'low'|'medium'|'high', dueDate: string }
// Projede TypeScript yok, bu yüzden arayüz JS fonksiyonlarıyla tanımlandı.

export const STORAGE_KEY = 'todos'

export const PRIORITIES = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

// Yeni bir Todo nesnesi üretir.
export function createTodo(text, priority = 'medium', dueDate = '') {
  return { id: Date.now(), text, done: false, priority, dueDate }
}

// Bir nesnenin Todo arayüzüne uyup uymadığını kontrol eder.
export function isTodo(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.text === 'string' &&
    typeof item.done === 'boolean'
  )
}
