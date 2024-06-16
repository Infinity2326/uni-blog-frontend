import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SuggestedPostItem } from "../components/SuggestedPostItem"
import { getAllPosts } from "../redux/features/post/postSlice"
import { checkIsAuth } from "../redux/features/auth/authSlice"
export const SuggestedPosts = () => {
  // получаем пользователей из стейта
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post)
  const notApproved = posts?.filter((p) => !p.approved)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const isAuth = useSelector(checkIsAuth)

  if (!isAuth) {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  if (user?.role === "user") {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  if (!notApproved?.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует
      </div>
    )
  }
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts
            ?.filter((p) => !p?.approved)
            .map((post, idx) => (
              <SuggestedPostItem
                className="w-1/2 mx-auto py-10 flex flex-col gap-10"
                key={idx}
                post={post}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
