import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
  comments: [],
  loading: false,
}

export const createPostComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/posts/${postId}`, {
        postId,
        comment,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const createNewsComment = createAsyncThunk(
  "comment/createComment",
  async ({ newsId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/news/${newsId}`, {
        newsId,
        comment,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getNewsComments = createAsyncThunk(
  "comment/getPostComments",
  async (newsId) => {
    try {
      const { data } = await axios.get(`/news/comments/${newsId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [createPostComment.pending]: (state) => {
      state.loading = true
    },
    [createPostComment.fulfilled]: (state, action) => {
      state.loading = false
      state.comments.push(action.payload)
    },
    [createPostComment.rejected]: (state) => {
      state.loading = false
    },
    [createNewsComment.pending]: (state) => {
      state.loading = true
    },
    [createNewsComment.fulfilled]: (state, action) => {
      state.loading = false
      state.comments.push(action.payload)
    },
    [createNewsComment.rejected]: (state) => {
      state.loading = false
    },
    [getPostComments.pending]: (state) => {
      state.loading = true
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false
      state.comments = action.payload
    },
    [getPostComments.rejected]: (state) => {
      state.loading = false
    },
    [getNewsComments.pending]: (state) => {
      state.loading = true
    },
    [getNewsComments.fulfilled]: (state, action) => {
      state.loading = false
      state.comments = action.payload
    },
    [getNewsComments.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default commentSlice.reducer
