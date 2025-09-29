// src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query'

interface User {
  id: number
  name: string
  email: string
}

// Имитация API запроса
const fetchUsers = async (): Promise<User[]> => {
  // В реальном приложении здесь был бы fetch запрос
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Пользователь 1', email: 'user1@example.com' },
        { id: 2, name: 'Пользователь 2', email: 'user2@example.com' },
        { id: 3, name: 'Пользователь 3', email: 'user3@example.com' },
      ])
    }, 1000)
  })
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}