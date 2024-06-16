import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
}

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts")
    return data
  } catch (error) {
    console.log(error)
  }
})

export const removePost = createAsyncThunk("post/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const approvePost = createAsyncThunk(
  "post/approvePost",
  async (post) => {
    try {
      const { data } = await axios.put(`/posts/suggested/${post._id}`, post)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId, user) => {
    try {
      const { data } = await axios.put(`/posts/like/${postId}`, postId, user)
      getAllPosts()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    [createPost.rejected]: (state) => {
      state.loading = false
    },
    // Получение всех постов
    [getAllPosts.pending]: (state) => {
      state.loading = true
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action?.payload?.posts
      state.popularPosts = action?.payload?.popularPosts
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false
    },
    // Удаление поста
    [removePost.pending]: (state) => {
      state.loading = true
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false
      // метод filter возвращает новый массив в котором нет поста, который берется из айди экшена
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      )
    },
    [removePost.rejected]: (state) => {
      state.loading = false
    },
    // Обновление поста
    [updatePost.pending]: (state) => {
      state.loading = true
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false
      // Ищем пост по айди, который был изменен и обновляем его
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      )
      state.posts[index] = action.payload
    },
    [updatePost.rejected]: (state) => {
      state.loading = false
    },
    // Одобрение поста
    [approvePost.pending]: (state) => {
      state.loading = true
    },
    [approvePost.fulfilled]: (state, action) => {
      state.loading = false
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      )
      state.posts[index] = action.payload
    },
    [approvePost.rejected]: (state) => {
      state.loading = false
    },
    // Лайк поста
    [likePost.pending]: (state) => {
      state.loading = true
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = false
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      )
      state.posts[index] = action.payload
    },
    [likePost.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default postSlice.reducer
