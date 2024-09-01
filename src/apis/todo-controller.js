import axios from 'axios'

// 定義運行後端伺服器的網域位置
const baseUrl = import.meta.env.VITE_API_BASE_URL

// 建立 axios 的物件實例設定通用配置
const axiosInstance = axios.create({ baseURL: baseUrl })

export const todoController = {
  getTodos: async () => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.get(`/todos`)

      // 回傳拿到的資料:
      // res.data 是 axios 的格式
      // 這邊設計的後端則將資料也包裝成 data
      console.log('測試拿到的資料:', res.data.data.todos)
      return res.data.data.todos
    } catch (error) {
      console.error('[Get Todos failed]:', error)
    }
  },
  postTodo: async (payload) => {
    // 從 payload 拿取打包資料, 用來發送給後端伺服器
    const { name, content, remarks, time, date, location, creator } = payload

    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.post(`/todos`, {
        name,
        content,
        remarks,
        time,
        date,
        location,
        creator
      })

      // 回傳拿到的資料
      console.log('測試拿到的資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      console.error('[Create Todo failed]:', error)
    }
  },
  patchTodo: async (payload) => {
    // 從 payload 拿取打包資料, 用來發送給後端伺服器
    const { id, name, content, remarks, time, date, location, creator } = payload

    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.patch(`/todos/${id}`, {
        name,
        content,
        remarks,
        time,
        date,
        location,
        creator
      })

      // 回傳拿到的資料
      console.log('測試拿到的資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      console.error('[Patch Todo failed]:', error)
    }
  },
  deleteTodo: async (id) => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.delete(`/todos/${id}`)

      // 回傳拿到的資料
      console.log('測試拿到的資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      console.error('[Delete Todo failed]:', error)
    }
  },
  toggleTodoCompleted: async (id) => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.patch(`/todos/${id}/toggleTodoCompleted`)

      // 回傳拿到的資料
      console.log('測試拿到的資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      console.error('[Toggle isCompleted of Todo failed]:', error)
    }
  }
}
