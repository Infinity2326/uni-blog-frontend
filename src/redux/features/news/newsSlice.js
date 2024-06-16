import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
  news: [],
  loading: false,
}

export const getNews = createAsyncThunk("news/getNews", async () => {
  try {
    const { data } = await axios.get("/news")
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getById = createAsyncThunk("news/getById", async (newsId) => {
  try {
    const { data } = await axios.get(`/news/${newsId}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const likeNews = createAsyncThunk(
  "news/likePost",
  async (newsId, user) => {
    try {
      const { data } = await axios.put(`/news/like/${newsId}`, newsId, user)
      getNews()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // Получение всех новостей
    [getNews.pending]: (state) => {
      state.loading = true
    },
    [getNews.fulfilled]: (state, action) => {
      state.loading = false
      state.news = action?.payload?.news
    },
    [getNews.rejected]: (state) => {
      state.loading = false
    },
    // Лайк поста
    [likeNews.pending]: (state) => {
      state.loading = true
    },
    [likeNews.fulfilled]: (state, action) => {
      state.loading = false
      // Ищем пост по айди, который был изменен и обновляем его
      const index = state.news.findIndex(
        (news) => news._id === action.payload._id
      )
      state.news[index] = action.payload
    },
    [likeNews.rejected]: (state) => {
      state.loading = false
    },
    // Обновить новость
    [getById.pending]: (state) => {
      state.loading = true
    },
    [getById.fulfilled]: (state, action) => {
      state.loading = false
      const index = state?.news?.findIndex((n) => n._id === action.payload._id)
      state.news[index] = action?.payload
    },
    [getById.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default newsSlice.reducer
