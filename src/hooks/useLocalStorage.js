import { useEffect, useState } from 'react'

// State'i localStorage ile senkron tutan basit hook.
// validate verilirse, localStorage'dan okunan bozuk kayıtlar ayıklanır.
export default function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key))
      if (!Array.isArray(saved)) return initialValue
      return validate ? saved.filter(validate) : saved
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
