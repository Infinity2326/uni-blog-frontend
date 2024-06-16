import React, { useCallback, useEffect, useState } from "react"
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
  AiOutlineLike,
} from "react-icons/ai"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removePost } from "../redux/features/post/postSlice"
import { toast } from "react-toastify"
import Moment from "react-moment"
import axios from "../utils/axios"
import {
  createPostComment,
  getPostComments,
} from "../redux/features/comment/commentSlice"
import { likePost, getAllPosts } from "../redux/features/post/postSlice.js"
import { CommentItem } from "../components/CommentItem.jsx"
import { checkIsAuth } from "../redux/features/auth/authSlice"

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState("")

  const { comments } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.auth)
  const { posts } = useSelector((state) => state.post)

  const currentUrl = window.location.href.slice(22)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const id = posts.findIndex((p) => p._id === params.id)

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast("Пост был удален")
      navigate("/posts")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      if (!isAuth) {
        navigate("/login")
        toast("Для комментирования нужно войти")
      }
      const postId = params.id
      dispatch(createPostComment({ postId, comment }))
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
      const postId = params.id
      dispatch(likePost({ postId, user }))
    } catch (error) {}
  }

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchPost()
    dispatch(getAllPosts())
  }, [fetchPost, dispatch])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }

  if (post._id !== currentUrl) {
    return (
      <div className="text-xl text-center text-white py-10">
        Поста не существует
      </div>
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
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="post"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment data={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white text-xs opacity-60 pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              {post.approved && (
                <>
                  <button
                    className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
                    onClick={handleLike}
                  >
                    <AiOutlineLike />
                    <span>{posts[id]?.likes}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiOutlineMessage />
                    <span>{post.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiFillEye />
                    <span>{posts[id]?.views}</span>
                  </button>
                </>
              )}
            </div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2 text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
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
            <CommentItem key={cmt._id} cmt={cmt} username={user?.username} />
          ))}
        </div>
      </div>
    </div>
  )
}
