import { Route, Routes } from "react-router-dom"

import Path from "./paths.JS"

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import PostsList from "./components/posts-list/PostsList.jsx"
import Home from "./components/home/Home.jsx"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path='/posts' element={<PostsList />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
