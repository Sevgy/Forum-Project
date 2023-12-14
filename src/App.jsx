import { Route, Routes } from "react-router-dom"

import Path from "./paths.JS"

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import PostsList from "./components/posts-list/PostsList.jsx"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/posts' element={<PostsList />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
