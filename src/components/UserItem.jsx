import React, { useState } from "react"
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../redux/features/auth/authSlice"
import "moment/locale/ru"
import { Dropdown } from "flowbite-react"
import { toast } from "react-toastify"

export const UserItem = ({ user }) => {
  const roles = ["user", "moderator", "admin"]
  const [role, setRole] = useState(user?.role)

  const { user: u } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const changeRole = (r) => {
    if (u?.role === "user") {
      toast("Нет доступа")
    }
    setRole(r)
    dispatch(updateUser({ u: user, r }))
  }

  return (
    <tr className="border-b bg-gray-800 border-gray-700">
      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
        {user.username}
      </td>
      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
        <Moment date={user.createdAt} format="D MMM YYYY" />
      </td>
      <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
        <Dropdown
          className="bg-gray-400 outline-none border-0 opacity-90"
          label={role}
          inline
        >
          {roles
            .filter((r) => r !== role)
            .map((r, idx) => (
              <Dropdown.Item
                key={idx}
                className="text-black cursor-pointer"
                onClick={() => changeRole(r)}
              >
                {r}
              </Dropdown.Item>
            ))}
        </Dropdown>
      </td>
    </tr>
  )
}
