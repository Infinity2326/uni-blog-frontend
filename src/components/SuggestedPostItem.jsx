import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import "moment/locale/ru"

export const SuggestedPostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }

  return (
    <Link to={`/suggested/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div
          className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
        >
          {post?.imgUrl && (
            <img
              src={`http://localhost:3002/${post?.imgUrl}`}
              alt="post"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">{post?.username}</div>
          <div className="text-xs text-white opacity-50">
            <Moment date={post?.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-white text-xl">{post?.title}</div>
        <p className="text-white text-xs opacity-60 pt-4 line-clamp-4">
          {post?.text}
        </p>
      </div>
    </Link>
  )
}
