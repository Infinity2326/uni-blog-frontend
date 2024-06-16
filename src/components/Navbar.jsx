import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { checkIsAuth, logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

export const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // объект для хранения цвета активного NavLink'a
  const activeStyles = {
    color: "white",
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
    toast("Вы вышли из системы")
    navigate("/")
  }

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to="/">
        <span className="flex justify-center items-center w-40 h-6 bg-gray-600 text-xs text-white rounded-sm">
          University Blog
        </span>
      </Link>
      {/* Проверка авторизации*/}
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/news"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Новости
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
          {user?.role === "admin" && (
            <>
              <li>
                <NavLink
                  to={"/suggested"}
                  className="text-xs text-gray-400 hover:text-white"
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Предложенные посты
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/users"}
                  className="text-xs text-gray-400 hover:text-white"
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Пользователи
                </NavLink>
              </li>
            </>
          )}
          {user?.role === "moderator" && (
            <>
              <li>
                <NavLink
                  to={"/suggested"}
                  className="text-xs text-gray-400 hover:text-white"
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Предложенные посты
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
      {/* Вывод кнопок в зависимости от авторизации пользователя */}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to={"/login"}>Войти</Link>
        )}
      </div>
    </div>
  )
}
