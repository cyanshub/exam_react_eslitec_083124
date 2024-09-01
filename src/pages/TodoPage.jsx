// 載入頁面工具
import { useEffect, useState } from 'react'
import '../styles/TodoPage.scss'

// 載入頁面所需 UI 元件
import { Todos, CreateForm, EditForm } from '../components/TodoPageComponents'
import { todoController } from '../apis/todo-controller'

// Dummy data: 先用測試資料, 後續再帶入資料庫資料
const todosDummy = [
  {
    id: 991,
    name: '範例: 記得運動 30 分鐘',
    content: '去公園慢跑',
    remarks: '記得帶水',
    time: 0.5,
    date: '2024-08-31',
    location: '公園',
    creator: 'Chin-Yang, Huang',
    isCompleted: true
  },
  {
    id: 992,
    name: '範例: 整理專案筆記',
    content: '整理 Node/Express 專案',
    remarks: null,
    time: 1,
    date: '2024-08-31',
    location: null,
    creator: 'Chin-Yang, Huang',
    isCompleted: false
  },
  {
    id: 993,
    name: '範例: 學習樂器',
    content: '練習演奏爵士鼓',
    remarks: '記得預約樂器行教室',
    time: 1,
    date: '2024-08-31',
    location: '樂器行',
    creator: 'Chin-Yang, Huang',
    isCompleted: false
  }
]

const TodoPage = () => {
  const [todos, setTodos] = useState(todosDummy)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  // 設計 useEffect: 第二個參數為[],
  // 表示首次渲染執行一次（只在組件掛載時執行一次）
  useEffect(() => {
    // 向後端 API 發送請求
    // 使用 async function 包裝 await 方法
    const getTodosAsyanc = async () => {
      try {
        // 調用 todoController 的 getTodos 方法
        const todos = await todoController.getTodos()

        // 保留 Dummy data
        const combinedTodos = [...todosDummy, ...todos]

        // 調用 set 方法更新 todos 的狀態值
        setTodos(combinedTodos)
      } catch (error) {
        console.error(error)
      }
    }

    // 調用 async function
    getTodosAsyanc()
  }, [])

  // A(3) 設計事件處理程序 handleEdit, 處理子組件傳過來的參數
  const handleEdit = (todo) => {
    // 不保存當前編輯的內容，僅切換到選中的 todo
    setCurrentTodo(todo)

    // 切換成編輯模式
    setIsEditing(true)
  }

  // B(6) 設計事件處理程序 saveTod, 處理子組件傳過來的參數
  const saveTodo = async (updatedTodo) => {
    // 向後端 API 發送請求
    try {
      // 調用 todoController 的 patchTodo 方法
      await todoController.patchTodo(updatedTodo)

      // 呼叫 set 方法更新 todos 的狀態值
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))

      // 退出編輯模式
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  // C(6) 設計事件處理程序 addTodo, 處理子組件傳過來的參數
  const addTodo = async (newTodo) => {
    // 向後端 API 發送請求
    try {
      // 調用 todoController 的 postTodo 方法
      const createdTodo = await todoController.postTodo(newTodo)

      // 呼叫 set 方法更新 todos 的狀態值
      setTodos([...todos, createdTodo])
    } catch (error) {
      console.error(error)
    }
  }

  // D(3) 設計事件處理程序 handleDelete, 處理子組件傳過來的參數
  const handleDelete = async (id) => {
    // 向後端 API 發送請求
    try {
      // 調用 todoController 的 deleteTodo 方法
      await todoController.deleteTodo(id)

      // 呼叫 set 方法更新 todos 的狀態值
      // 利用 filter 濾除掉指定 id 的 todo
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  // E(3) 設計事件處理程序 handleToggleCompleted, 處理子組件傳過來的參數
  const handleToggleCompleted = async (id) => {
    // 向後端 API 發送請求
    try {
      // 調用 todoController 的 toggleTodoCompleted 方法
      await todoController.toggleTodoCompleted(id)

      // 呼叫 set 方法更新 todos 的狀態值
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="todoPage">
      <h1>任務管理系統</h1>
      <div className="todoContent">
        {isEditing ? (
          // B(5) 將子組件傳過來的參數傳給事件處理程序 saveTodo
          <EditForm todo={currentTodo} saveTodo={saveTodo} />
        ) : (
          // C(5) 將子組件傳過來的參數傳給事件處理程序 addTodo
          <CreateForm addTodo={addTodo} />
        )}

        {/* A(2) 將子組件傳過來的參數傳給事件處理程序 handleEdit */}
        {/* D(2) 將子組件傳過來的參數傳給事件處理程序 handleDelete */}
        {/* E(2) 將子組件傳過來的參數傳給事件處理程序 handleToggleCompleted */}
        <Todos
          todos={todos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleCompleted={handleToggleCompleted}
        />
      </div>
    </div>
  )
}

export default TodoPage
