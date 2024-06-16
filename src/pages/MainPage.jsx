import React, { useEffect, useState } from "react"
import { PostItem } from "../components/PostItem"
import { PopularPosts } from "../components/PopularPosts"
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from "../redux/features/post/postSlice"

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)
  const [search, setSearch] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  if (!posts?.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует
      </div>
    )
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
    if (searchValue.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(
        (post) =>
          post?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post?.text.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredPosts(filtered)
    }
  }

  if (posts) {
    return (
      <div className="max-w-[900px] mx-auto py-10">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e)}
          placeholder="Поиск по заголовку или описанию"
          className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white outline-none"
        />
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-10 basis-4/5">
            {filteredPosts
              ?.filter((p) => p?.approved)
              .map((post, idx) => (
                <PostItem key={idx} post={post} />
              ))}
          </div>
          <div className="basis-1/5">
            <div className="text-xs uppercase text-white">Популярное:</div>
            {popularPosts?.map(
              (post, idx) =>
                post?.approved && <PopularPosts key={idx} post={post} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
