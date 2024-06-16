import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

// данные по умолчанию
const initialState = {
  user: null,
  users: [],
  token: null,
  isLoading: false,
  status: null,
}

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  // принимаем имя и пароль
  async ({ username, password }) => {
    try {
      // отправляем логин и пароль
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      })
      // если в ответе есть токен, то он будет записан в локалсторедж, для того что бы был выполнен вход после регистрации
      if (data.token) {
        window.localStorage.setItem("token", data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
// Вход пользователя
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  // принимаем имя и пароль
  async ({ username, password }) => {
    try {
      // отправляем логин и пароль
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      })
      // если в ответе есть токен, то он будет записан в локалсторедж, для того что бы был выполнен вход после регистрации
      if (data.token) {
        window.localStorage.setItem("token", data.token)
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

// Проверка на токен
export const getMe = createAsyncThunk("auth/loginUser", async () => {
  try {
    // проверка входа
    const { data } = await axios.get("/auth/me")
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  try {
    const { data } = await axios.get("/auth/users")
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ u, r }) => {
    try {
      const { data } = await axios.put(`/auth/users/${u._id}`, {
        u,
        r,
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoading = false
      state.status = null
    },
  },
  // управление состоянием, которое было объявлено в initialState
  extraReducers: {
    // registerUser
    // запрос отправляется
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    // запрос выполнен
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    },
    // в запросе ошибка [registerUser.rejected]
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    // loginUser
    // запрос отправляется
    [loginUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    // запрос выполнен
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    },
    // в запросе ошибка [loginUser.rejected]
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    // getMe
    // проверка авторизации
    [getMe.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    // запрос выполнен
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false
      state.status = null
      state.user = action.payload?.user
      state.token = action.payload?.token
    },
    // в запросе ошибка [loginUser.rejected]
    [getMe.rejectWithValue]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    // Получение всех юзеров
    [getAllUsers.pending]: (state) => {
      state.loading = true
      state.status = null
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.users = action.payload.users
      state.status = action.payload?.message
    },
    [getAllUsers.rejectWithValue]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    }, // Обновление юзера
    [updateUser.pending]: (state) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      )
      state.users[index] = action.payload
    },
    [updateUser.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer
