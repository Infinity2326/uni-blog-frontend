import React, { useEffect, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AiFillEye, AiOutlineMessage, AiOutlineLike } from "react-icons/ai"
import axios from "../utils/axios"
import { checkIsAuth } from "../redux/features/auth/authSlice"
import {
  createNewsComment,
  getNewsComments,
} from "../redux/features/comment/commentSlice"
import { CommentItem } from "../components/CommentItem.jsx"
import { toast } from "react-toastify"
import { getNews, likeNews } from "../redux/features/news/newsSlice.js"

export const SingleNewsPage = () => {
  const [singleNews, setSingleNews] = useState(null)
  const [comment, setComment] = useState("")

  const { comments } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.auth)
  const { news } = useSelector((state) => state.news)

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const id = news?.findIndex((n) => n?._id === params?.id)

  const handleSubmit = () => {
    try {
      if (!isAuth) {
        navigate("/login")
        toast("Для комментирования нужно войти")
      }
      const newsId = params.id
      console.log(newsId)
      console.log(comment)
      dispatch(createNewsComment({ newsId, comment }))
      setComment("")
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    try {
      if (!isAuth) {
        navigate("/login")
        toast("Для оценивания нужно войти")
      }
      const newsId = params.id
      dispatch(likeNews({ newsId, user }))
      dispatch(getNews())
    } catch (error) {}
  }

  const fetchNews = useCallback(async () => {
    const { data } = await axios.get(`/news/${params.id}`)
    setSingleNews(data)
  }, [params.id])

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getNewsComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchNews()
    dispatch(getNews())
  }, [fetchNews, dispatch])

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!singleNews) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/news"}>
          Назад
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className="flex rounded-sm h-80">
              <img
                src={singleNews?.imgUrl}
                alt="post"
                className="object-cover w-full"
              />
            </div>
          </div>
          <div className="text-white text-xl">{singleNews?.title}</div>
          <p className="text-white text-xs opacity-60 pt-4">
            {singleNews?.text}
          </p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button
                className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
                onClick={handleLike}
              >
                <AiOutlineLike /> <span>{news[id]?.likes}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage />
                <span>{singleNews.comments?.length || 0}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{news[id]?.views}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
            >
              Отправить
            </button>
          </form>
          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} username={user.username} />
          ))}
        </div>
      </div>
    </div>
  )
}
