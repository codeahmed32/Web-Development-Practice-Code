import React from 'react'
import { useState } from "react";

export const Header = ({officeName}) => {
    const [userName, setUserName] = useState(officeName)
  return (
    <div>
        {userName}
        <h4>This is a header and the students Names Displayed Below</h4>
    </div>
  )
}

export default Header;