import React, { useEffect, useState } from "react"
import { NewsItem } from "../components/NewsItem"
import { useDispatch, useSelector } from "react-redux"
import { getNews } from "../redux/features/news/newsSlice"

export const NewsPage = () => {
  const dispatch = useDispatch()
  const { news } = useSelector((state) => state.news)
  const [search, setSearch] = useState("")
  const [filteredNews, setFilteredNews] = useState([])

  useEffect(() => {
    dispatch(getNews())
  }, [dispatch])

  useEffect(() => {
    setFilteredNews(news)
  }, [news])

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
    if (searchValue.trim() === "") {
      setFilteredNews(news)
    } else {
      const filtered = news.filter(
        (n) =>
          (n?.title &&
            n?.title.toLowerCase().includes(searchValue.toLowerCase())) ||
          (n?.text && n?.text.toLowerCase().includes(searchValue.toLowerCase()))
      )
      setFilteredNews(filtered)
    }
  }

  if (!news || !news.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Новостей не существует
      </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <input
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Поиск по заголовку или описанию"
        className="w-[720px] p-3 mb-6 border-2 border-gray-300 rounded-lg bg-gray-100 focus:border-gray-500 focus:bg-white outline-none"
      />
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {filteredNews && filteredNews?.length > 0 ? (
            filteredNews.map((n, idx) => <NewsItem key={idx} n={n} />)
          ) : (
            <div className="text-xl text-center text-white py-10">
              Новостей не существует
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
