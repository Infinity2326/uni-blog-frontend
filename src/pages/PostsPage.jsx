import { PostItem } from "../components/PostItem"
import axios from "../utils/axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { checkIsAuth } from "../redux/features/auth/authSlice"
import { Link } from "react-router-dom"

export const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const fetchMyPost = async () => {
    try {
      const { data } = await axios.get("posts/user/me")
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyPost()
  }, [])

  const isAuth = useSelector(checkIsAuth)
  if (!isAuth) {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }
  if (!posts?.length) {
    return (
      <div className="">
        <div className="text-xl text-center text-white py-8">
          У вас нет постов, попробуйте добавить!
        </div>
        <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 w-20 mx-auto">
          <Link to={"/new"}>Добавить</Link>
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, idx) => (
            <PostItem
              className="w-1/2 mx-auto py-10 flex flex-col gap-10"
              post={post}
              key={idx}
            ></PostItem>
          ))}
        </div>
      </div>
    </div>
  )
}
