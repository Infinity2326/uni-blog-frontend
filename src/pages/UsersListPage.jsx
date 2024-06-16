import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/features/auth/authSlice"
import { UserItem } from "../components/UserItem"
import { toast } from "react-toastify"
import { checkIsAuth } from "../redux/features/auth/authSlice"

export const UsersListPage = () => {
  // получаем пользователей из стейта
  const dispatch = useDispatch()
  const { users, status } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  toast(status)

  const isAuth = useSelector(checkIsAuth)
  if (!isAuth) {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  if (!(user?.role === "admin")) {
    return (
      <div className="text-xl text-center text-white py-10">Нет доступа</div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="mt-10 w-1/2 text-sm text-left  text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="text-white px-6 py-3 ">
                Имя
              </th>
              <th scope="col" className="text-white px-6 py-3">
                Зарегистрирован
              </th>
              <th scope="col" className="text-white px-6 py-3">
                Роль
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <UserItem className="" user={user} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
