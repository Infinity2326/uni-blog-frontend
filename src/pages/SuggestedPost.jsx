import React, { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Moment from "react-moment"
import axios from "../utils/axios"
import { checkIsAuth } from "../redux/features/auth/authSlice"
import { approvePost, removePost } from "../redux/features/post/postSlice"
import "moment/locale/ru"

export const SuggestedPost = () => {
  const [post, setPost] = useState(null)
  // строка браузера
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const { user } = useSelector((state) => state.auth)

  const handleApprove = () => {
    try {
      dispatch(approvePost(post))
      navigate("/suggested")
      toast("Пост опубликован на главной.")
    } catch (error) {
      console.log(error)
    }
  }

  const handleDecline = () => {
    try {
      dispatch(removePost(post._id))
      navigate("/suggested")
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }
  if (!isAuth) {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  if (user.role === "user") {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Назад
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post.imgUrl && (
                <img
                  src={`https://uni-blog-backend-production.up.railway.app/${post?.imgUrl}`}
                  alt="post"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">
              {post?.username}
            </div>
            <div className="text-xs text-white opacity-50">
              <Moment data={post?.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post?.title}</div>
          <p className="text-white text-xs opacity-60 pt-4">{post?.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                onClick={() => handleApprove(true)}
                className="flex justify-center items-center bg-green-700 text-xs text-white rounded-sm py-2 px-4"
              >
                Одобрить
              </button>
              <button
                type="submit"
                onClick={() => handleDecline(false)}
                className="flex justify-center items-center bg-red-700 text-xs text-white rounded-sm py-2 px-4"
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
