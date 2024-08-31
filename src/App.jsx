import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import HomePage from './pages/HomePage'

// 引入sass樣式架構
import './App.scss'

// 引入bootstrap框架樣式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

// 定義專案基礎路徑
const basename = import.meta.env.VITE_PUBLIC_URL

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/todos" element={<TodoPage />}></Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
