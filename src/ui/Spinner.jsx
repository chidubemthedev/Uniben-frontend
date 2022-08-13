import React from 'react'
import { HashLoader } from 'react-spinners'


const Spinner = () => {


  return (
<div className="sweet-loading">
      <HashLoader className='spinner_positioning' color='white' size={20}/>
    </div>  )
}

export default Spinner