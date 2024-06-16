import React from "react"
import { AiFillEye, AiOutlineMessage, AiOutlineLike } from "react-icons/ai"
import { Link } from "react-router-dom"
export const NewsItem = ({ n }) => {
  if (n?.title) {
    return (
      <Link to={`/news/${n?._id}`}>
        <div className="flex flex-col basis-1/4 flex-grow">
          <div className="flex rounded-sm h-80">
            <img src={n?.imgUrl} alt="news" className="object-cover w-full" />
          </div>
          <div className="text-white text-xl">{n?.title}</div>
          <p className="text-white text-xs opacity-60 pt-4 line-clamp-4">
            {n?.text}
          </p>
          <div className="flex gap-3 items-center mt-2">
            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
              <AiOutlineLike /> <span>{n.likes}</span>
            </button>
            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
              <AiOutlineMessage /> <span>{n?.comments?.length || 0}</span>
            </button>
            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
              <AiFillEye /> <span>{n?.views}</span>
            </button>
          </div>
        </div>
      </Link>
    )
  }
}
