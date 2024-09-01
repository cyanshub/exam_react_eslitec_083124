import { MdDelete, MdDone } from 'react-icons/md'
import styled from 'styled-components'

const Todos = ({ todos, onEdit, onDelete, onToggleCompleted }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <DivTodo key={todo.id} className="todoRow">
          {/* todo */}
          <div
            className={`todoItem  ${todo.isCompleted ? 'completed' : ''}`}
            // A(1) 監聽點擊事件, 把點選的 todo 傳回 pages 層
            onClick={() => onEdit(todo)}
          >
            {todo.name}
          </div>

          <div>
            {/* 完成 todo */}
            {/* E(1) 監聽點擊事件, 把點選的 todo 傳回 pages 層 */}
            <StyledMdDone onClick={() => onToggleCompleted(todo.id)} />

            {/* 刪除 todo */}
            {/* D(1) 監聽點擊事件, 把點選的 todo 傳回 pages 層 */}
            <StyledMdDelete onClick={() => onDelete(todo.id)} />
          </div>
        </DivTodo>
      ))}
    </div>
  )
}

// 設計元件樣式
const StyledMdDelete = styled(MdDelete)`
  margin-right: 1rem;
  cursor: pointer;
`

const StyledMdDone = styled(MdDone)`
  margin-right: 1rem;
  cursor: pointer;
`

const DivTodo = styled.div`
  margin-top: 0.5rem;
  border-radius: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Todos
