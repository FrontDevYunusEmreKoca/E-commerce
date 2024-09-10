import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const RouterConfig = () => {
  return (
    <div>
      <Routes>
            <Route  path="/" element = {<Home />}></Route>
      </Routes>
    </div>
  )
}

export default RouterConfig
