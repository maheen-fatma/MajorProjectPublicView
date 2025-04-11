import React from 'react'

function Logo({fontSize="60px"}) { // here we pass property width as a prop so that we can adjust the width of the logo according to the placce we use it. By default, its value is 100px
  return (
    <>
    <div style={{fontSize}} className='font-devorana font-bold text-customMaroon '>
    chic 
    </div>
    </>
  )
}

export default Logo
