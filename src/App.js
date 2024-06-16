import { Layout } from "./components/Layout.jsx"
import { Routes, Route } from "react-router-dom"
import { MainPage } from "./pages/MainPage.jsx"
import { PostsPage } from "./pages/PostsPage.jsx"
import { PostPage } from "./pages/PostPage.jsx"
import { AddPostPage } from "./pages/AddPostPage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import { EditPostPage } from "./pages/EditPostPage.jsx"
import { UsersListPage } from "./pages/UsersListPage.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMe } from "./redux/features/auth/authSlice.js"
import { SuggestedPosts } from "./pages/SuggestedPosts.jsx"
import { SuggestedPost } from "./pages/SuggestedPost.jsx"
import { NewsPage } from "./pages/NewsPage.jsx"
import { SingleNewsPage } from "./pages/SingleNewsPage.jsx"

// Создается общий лэйаут для хранения навбара и дочерний элементов
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="users" element={<UsersListPage />} />
        <Route path="suggested" element={<SuggestedPosts />} />
        <Route path="suggested/:id" element={<SuggestedPost />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<SingleNewsPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  )
}

export default App
