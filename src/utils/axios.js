import axios from "axios"

// создание отдельного инстанса axios для приложения

const instance = axios.create({
  baseURL: "https://uni-blog-backend-production.up.railway.app/api/",
  validateStatus: () => true,
})

// добавление в запрос хедера токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token")
  return config
})

export default instance
