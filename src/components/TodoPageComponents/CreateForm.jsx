import { useState } from 'react'
import '../../styles/CreateEditForm.scss'
import styled from 'styled-components'

const CreateForm = ({ addTodo }) => {
  const dateDefault = new Date()
    .toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-')

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [remarks, setRemarks] = useState('')
  const [time, setTime] = useState(1)
  const [date, setDate] = useState(dateDefault)
  const [location, setLocation] = useState('')
  const [creator, setCreator] = useState('')

  // C(3) 設計事件處理程序 handleAdd, 當表單的提交事件觸發時執行
  const handleAdd = (e) => {
    e.preventDefault()

    // 非空檢查
    if (
      !name.trim() ||
      !content.trim() ||
      !time ||
      !date ||
      isNaN(new Date(date).getTime()) ||
      !creator
    ) {
      alert('請填寫所有必填項目')
      return
    }

    // 資料檢查
    if (time <= 0) {
      alert('任務時間需為大於 0 的數字')
      return
    }

    // C(4) 把新增的 todo, 透過 props 傳回 pages 層
    const newTodo = {
      id: Date.now(), // 確保新任務有一個唯一的ID
      name,
      content,
      remarks,
      time,
      date,
      location,
      creator,
      isCompleted: false
    }

    addTodo(newTodo)

    // 清空表單
    setName('')
    setContent('')
    setRemarks('')
    setTime(1)
    setDate(dateDefault)
    setLocation('')
    setCreator('')
  }

  return (
    // C(1) 透過控制項的 onChange 和 set 方法即時更新各個狀態變數的狀態值
    // C(2) 監聽表單按鈕的提交事件, 觸發事件處理程序 handleAdd
    <form className="createForm" onSubmit={handleAdd}>
      <div className="form-group">
        <label>待辦任務名稱</label>
        <input
          type="text"
          placeholder="輸入待辦任務名稱(必填)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>內容</label>
        <input
          type="text"
          placeholder="輸入任務內容(必填)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>備註</label>
        <input
          type="text"
          placeholder="輸入任務備註(選填)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          預計時間 (小時) <small>接受小數點</small>
        </label>
        <input
          type="number"
          placeholder="輸入任務所需時間(必填)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>日期</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>地點</label>
        <input
          type="text"
          placeholder="輸入任務地點(選填)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>創建者</label>
        <input
          type="text"
          placeholder="輸入創建者(必填)"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
      </div>
      <button type="submit">加入</button>
    </form>
  )
}

export default CreateForm
