import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Path from './paths.JS';
import * as authService from './services/authService.js';
import AuthContext from './context/authContext.js';

import Footer from './components/footer/Footer.jsx';
import Header from './components/header/Header.jsx';
import PostsList from './components/post-list/PostList.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import PostCreate from './components/post-create/PostCreate.jsx';
import Logout from './components/logout/Logout.jsx';
import Thread from './components/thread/Thread.jsx';
import PostEdit from './components/post-edit/PostEdit.jsx';

function App() {
    const navigate = useNavigate();

    const [auth, setAuth] = useState(() => {
        localStorage.removeItem('accessToken');

        return {};
    });

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(Path.Home);
    }

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(Path.Home);
    }

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            <>
                <Header />

                <Routes>
                    <Route path={Path.Home} element={<Home />} />
                    <Route path={Path.Posts} element={<PostsList />} />
                    <Route path={Path.Thread} element={<Thread />} />
                    <Route path={Path.Create} element={<PostCreate />} />
                    <Route path={Path.Login} element={<Login />} />
                    <Route path={Path.Register} element={<Register />} />
                    <Route path={Path.Logout} element={<Logout />} />
                    <Route path={Path.Edit} element={<PostEdit />}/> 
                </Routes>

                <Footer />
            </>
        </AuthContext.Provider>
    )
}

export default App
