import axios from 'axios'

// 定義運行後端伺服器的網域位置
const baseUrl = import.meta.env.VITE_API_BASE_URL

// 建立 axios 的物件實例設定通用配置
// 預設使用 node.js/express 的 api
let axiosInstance = axios.create({ baseURL: baseUrl })
console.log(`Backend APIs url has been switched to ${baseUrl}`)

// 動態更新 baseURL
export const updateBaseUrl = (newBaseUrl) => {
  axiosInstance = axios.create({ baseURL: newBaseUrl })
  console.log(`Backend APIs url has been switched to ${newBaseUrl}`)
}

export const todoController = {
  getTodos: async () => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.get(`/todos`)

      // 回傳拿到的資料:
      // res.data 是 axios 的格式
      // 這邊設計的後端則將資料也包裝成 data
      console.log('回傳資料:', res.data.data.todos)
      return res.data.data.todos
    } catch (error) {
      let errorMessage = '無法取得資料，請稍後再試!'

      // axios 的 error.response 對應於 res.data
      if (error.response) {
        // 處理後端回傳的錯誤碼(統一在回傳 data 新增 status 屬性)
        const status = error.response.data.status
        errorMessage = error.response.data.error || errorMessage

        // 根據不同的錯誤狀態碼處理錯誤訊息
        if (status === 404) {
          console.error('找不到資料:', errorMessage)
        } else {
          console.error('[Get Todos failed]:', errorMessage)
        }
      } else {
        // 處理沒有 error.response 的情況
        console.error('[Get Todos failed]:', errorMessage)
      }

      throw new Error(errorMessage)
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
      }, { withCredentials: false })

      // 回傳拿到的資料
      console.log('新增資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      let errorMessage = '無法新增資料，請稍後再試!'

      // axios 的 error.response 對應於 res.data
      if (error.response) {
        // 處理後端回傳的錯誤碼(統一在回傳 data 新增 status 屬性)
        const status = error.response.data.status
        errorMessage = error.response.data.error || errorMessage

        // 根據不同的錯誤狀態碼處理錯誤訊息
        if (status === 422) {
          console.error('驗證錯誤:', errorMessage)
        } else if (status === 404) {
          console.error('找不到資料:', errorMessage)
        } else {
          console.error('[Create Todo failed]:', errorMessage)
        }
      } else {
        // 處理沒有 error.response 的情況
        console.error('[Create Todo failed]:', error)
      }

      throw new Error(errorMessage)
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
      console.log('更新資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      let errorMessage = '無法更新資料，請稍後再試!'

      // axios 的 error.response 對應於 res.data
      if (error.response) {
        // 處理後端回傳的錯誤碼(統一在回傳 data 新增 status 屬性)
        const status = error.response.data.status
        errorMessage = error.response.data.error || errorMessage

        // 根據不同的錯誤狀態碼處理錯誤訊息
        if (status === 422) {
          console.error('驗證錯誤:', errorMessage)
        } else if (status === 404) {
          console.error('找不到資料:', errorMessage)
        } else {
          console.error('[Patch Todo failed]:', errorMessage)
        }
      } else {
        // 處理沒有 error.response 的情況
        console.error('[Patch Todo failed]:', error)
      }

      throw new Error(errorMessage)
    }
  },
  deleteTodo: async (id) => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.delete(`/todos/${id}`)

      // 回傳拿到的資料
      console.log('刪除資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      let errorMessage = '無法刪除資料，請稍後再試!'

      // axios 的 error.response 對應於 res.data
      if (error.response) {
        // 處理後端回傳的錯誤碼(統一在回傳 data 新增 status 屬性)
        const status = error.response.data.status
        errorMessage = error.response.data.error || errorMessage

        // 根據不同的錯誤狀態碼處理錯誤訊息
        if (status === 404) {
          console.error('找不到資料:', errorMessage)
        } else {
          console.error('[Delete Todo failed]:', errorMessage)
        }
      } else {
        // 處理沒有 error.response 的情況
        console.error('[Delete Todo failed]:', error)
      }

      throw new Error(errorMessage)
    }
  },
  toggleTodoCompleted: async (id) => {
    try {
      // 向後端 API 發送請求
      const res = await axiosInstance.patch(`/todos/${id}/toggleTodoCompleted`)

      // 回傳拿到的資料
      console.log('更新資料:', res.data.data.todo)
      return res.data.data.todo
    } catch (error) {
      let errorMessage = '無法變更資料，請稍後再試!'

      // axios 的 error.response 對應於 res.data
      if (error.response) {
        // 處理後端回傳的錯誤碼(統一在回傳 data 新增 status 屬性)
        const status = error.response.data.status
        errorMessage = error.response.data.error || errorMessage

        // 根據不同的錯誤狀態碼處理錯誤訊息
        if (status === 404) {
          console.error('找不到資料:', errorMessage)
        } else {
          console.error('[Toggle isCompleted of Todo failed]:', errorMessage)
        }
      } else {
        // 處理沒有 error.response 的情況
        console.error('[Toggle isCompleted of Todo failed]:', error)
      }

      throw new Error(errorMessage)
    }
  }
}
