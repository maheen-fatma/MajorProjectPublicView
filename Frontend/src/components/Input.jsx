import React, { useId } from 'react'

function Input({
    label,
    type="text",
    className="",
    overallClassName,
    ...props
}, ref
) {
    const id= useId()
  return (
    <div className={`${overallClassName}`}>
      {
        label &&  //if label exists
        <label htmlFor={id} className='pr-2'>
            {label}
        </label>
      }
      <input 
        type={type}
        className={`${className} `}
        {...props}
        id={id}
        ref={ref} //reference taken from the user where this component is called is used here
      />
    </div>
  )
}

export default React.forwardRef(Input)
