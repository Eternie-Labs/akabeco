import React, { ReactNode } from "react"
import {LayoutProps} from "./layoutProps"

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="container mx-auto">
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

export default Layout
