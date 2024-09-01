// 載入頁面工具
import { useState } from 'react'
import '../styles/TodoPage.scss'

// 載入頁面所需 UI 元件
import { Todos, CreateForm, EditForm } from '../components/TodoPageComponents'

// Dummy data: 先用測試資料, 後續再帶入資料庫資料
const todosDummy = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

  // A(3) 設計事件處理程序 handleEdit, 處理子組件傳過來的參數
  const handleEdit = (todo) => {
    // 不保存當前編輯的內容，僅切換到選中的 todo
    setCurrentTodo(todo)

    // 切換成編輯模式
    setIsEditing(true)
  }

  // B(6) 設計事件處理程序 saveTod, 處理子組件傳過來的參數
  const saveTodo = (updatedTodo) => {
    // 呼叫 set 方法更新 todos 的狀態值
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))

    // 退出編輯模式
    setIsEditing(false)
  }

  // C(6) 設計事件處理程序 addTodo, 處理子組件傳過來的參數
  const addTodo = (newTodo) => {
    // 呼叫 set 方法更新 todos 的狀態值
    setTodos([...todos, newTodo])
  }

  // D(3) 設計事件處理程序 handleDelete, 處理子組件傳過來的參數
  const handleDelete = (id) => {
    // 呼叫 set 方法更新 todos 的狀態值
    // 利用 filter 濾除掉指定 id 的 todo
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // E(3) 設計事件處理程序 handleToggleCompleted, 處理子組件傳過來的參數
  const handleToggleCompleted = (id) => {
    setTodos(
      // 呼叫 set 方法更新 todos 的狀態值
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    )
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
          onToggleCompleted={ handleToggleCompleted }
        />
      </div>
    </div>
  )
}

export default TodoPage
