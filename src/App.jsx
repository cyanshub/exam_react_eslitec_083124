import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import HomePage from './pages/HomePage'

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
