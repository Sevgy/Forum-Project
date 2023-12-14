import { Route, Routes } from "react-router-dom"

import Path from "./paths.JS"

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import PostsList from "./components/posts-list/PostsList.jsx"
import Home from "./components/home/Home.jsx"
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path={Path.Posts} element={<PostsList />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Register />} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
