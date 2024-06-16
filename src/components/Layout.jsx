import React from "react"
import { Navbar } from "./Navbar"

// В лэйауте создается навбар, который будет на каждой странице и после него будут идти все дочерние элементы
export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </React.Fragment>
  )
}
