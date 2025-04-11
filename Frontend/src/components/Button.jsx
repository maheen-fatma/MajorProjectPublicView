import React from 'react'

function Button({
    children="Button", //the content displayed on Button
    type="button",
    width="",
    textColor,
    className="",
    ...props
}) {
  return (
    <button className={` p-3   ${textColor} ${width} ${className} `} {...props}>
        {children}
    </button>
  )
}

export default Button
