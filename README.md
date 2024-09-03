# React Frontend Interacting with NodeJS and Python APIs
![導覽圖片](/introduce.png)


# 簡介
此專案是一個使用 React 建立的前端網頁, 能分別與 NodeJs API 或 Python API 進行互動。React 負責構建使用者介面(User Interface), 並通過串接後端 API 來處理 TODO 任務項目。 此專案亦展示了如何在一個應用程式中, 整合來自不同技術棧的後端服務


## 前端網站互動
+ 您可以透過網站來與後端 API 進行互動, 操作 TODO 任務管理系統提供的功能：
[REACT WEBSITE](https://cyanshub.github.io/exam_react_eslitec_083124/todos)

+ 本專案保留了前 3 筆資料, 作為管理 TODO 資料的 DEMO
+ 這 3 筆資料並非來自後端 API 查詢 MySQL 的資料; 而是寫在本專案 TodoPage 組件的 Dummy Data


## 即時切換後端 API Server
+ 本專案預設使用的後端 API Server 為 `NodeJS/Express`
+ 如想切換後端 API Server, 可以點選 `Switch APIs to Python` 按鈕
![導覽圖片](/introduce1.png)

+ 從開發者工具可以觀察到切換流程
![導覽圖片](/introduce2.png)


### 如何檢查
+ (1) 打開瀏覽器的開發者工具（通常可以通過按 `F12` 或 `Ctrl+Shift+I` 打開）
+ (2) 切換到 `Network` 面板, 並刷新頁面或執行相關操作來觸發 API 請求
+ (3) 選擇其中一個 API 請求, 並查看 `Headers` 部分
+ (4) 找到 `x-Render-Origin-Server` 或 `X-Powered-By: Express` 的標頭, 查看它的值來確認目前的 API 來源
    - 當您看到 `X-Powered-By: Express` 時, 這表示目前使用的是 `NodeJS/Express API`
    - 當您看到 `x-Render-Origin-Server: Python` 時, 這表示目前使用的是 `Python API`


## 專案開發思路
+ (1) 使用 Vite 建置專案環境, 並根據開發習慣整理專案架構
+ (2) 納入開發 React 專案常用的工具及樣式設定, 例如：
   - 使用 `sass` 進行樣式預處理, 提升 CSS 編寫的靈活性
   - 使用 `styled-components` 創建基於組件的樣式, 提高樣式和組件的整合性
   - 引入 `bootstrap` 作為 UI 框架, 提供現成的樣式和元件, 提升開發效率
   - 使用 `react-router-dom` 管理應用中的路由, 實現不同頁面的導航和組件切換
   - 安裝並配置其他必要的 npm 套件, 如 `axios` 用於 API 請求處理等

+ (3) 設計 `TodoPage` 組件作為 Page 層
+ (4) 思考 `TodoPage` 層可能會用到的 UI 組件, 例如：`Todo`, `EditForm`, `CreateForm`
+ (5) 使用 Dummy Data, 讓不同 UI 組件的資料能夠順利傳遞, 包括：
    - 建立適當的 `State` 變數, 並利用 `useState` 即時更新畫面資料
    - 設置事件監聽器, 利用回調函數觸發事件處理程序
    - 設計事件處理程序, 完成對應 API 功能的操作
    - 利用 `props` 參數達成資料在組件之間的傳遞


+ (6) 設計 API Services, `src/apis/todo-controller`, 負責在 TodoPage 頁面串接後端 APIs 功能：
    - 當串接後端 API 後, 因為涉及與資料庫溝通的非同步操作, 因此需要將事件處理程序（handler）改為 `async/await` 語法結構
    - 在調用 `src/apis/todo-controller` 的 `getTodos`、`postTodo`、`patchTodo`、`deleteTodo`、`toggleTodoCompleted` 等方法時, 需使用 `await` 前綴等待資料回傳
    - 這些使用 `await` 前綴的函數, 必須包裝在 `async` 函數內, 並透過觸發 `async function` 來執行
    - 備註: 在 TodoPage 組件的程式碼中, 可見 `A, B, C, D, E` 及阿拉伯數字等註解, 記錄設計 TODO 資料在 props 或 callback function 之間傳遞時的思考脈絡


## 開始使用
+ 請在本機安裝 `Node.js` 與 npm 套件管理系統
+ 假設使用 Visual Studio Code, 建議先打開編譯器: Bash 指令 `code .`  在 `Terminal` 切換 node 版本
+ 本專案使用 `Vite` 作為 `React` 的開發環境, 請確認 Node.js 版本的一致性：Bash 指令 `node -v, nvm install 18.20.4, nvm use 18.20.4`
+ 複製專案到本機: Bash 指令 `git clone https://github.com/cyanshub/exam_react_eslitec_083124.git`
+ 進入專案資料夾: Bash 指令 `cd exam_react_eslitec_083124`
+ 安裝套件: Bash 指令 `npm install`
+ 確認套件齊全（可參考下方開發工具）
+ 確認 `.env` 檔案內容
+ 啟動專案：Bash 指令 `npm run dev`
+ 看到以下訊息，可至瀏覽器輸入下列網址開啟 `Local: http://localhost:3000/exam_react_eslitec_083124`
+ 其中的 `exam_react_eslitec_083124` 網址, 是根據應用程式的基礎路徑自動帶入的


## 開發工具
### 依賴項目 (Dependencies)
+ axios: 1.7.7
+ bootstrap: 5.3.3
+ dotenv: 16.4.5
+ gh-pages: 4.0.0
+ react: 18.3.1
+ react-bootstrap: 2.10.4
+ react-dom: 18.3.1
+ react-icons: 5.2.1
+ react-router-dom: 6.4.1
+ sass: 1.56.2
+ styled-components: 6.1.12
+ vite-plugin-svgr: 4.2.0

### 開發依賴項目 (Dev Dependencies)
+ @eslint/js: 9.9.0
+ @types/react: 18.3.3
+ @types/react-dom: 18.3.0
+ @vitejs/plugin-react: 4.3.1
+ eslint: 9.9.0
+ eslint-plugin-react: 7.35.0
+ eslint-plugin-react-hooks: 5.1.0-rc.0
+ eslint-plugin-react-refresh: 0.4.9
+ globals: 15.9.0
+ vite: 5.4.1


    

