import { Route, Routes } from 'react-router-dom';

import Path from './paths.JS';
import { AuthProvider} from './context/authContext.jsx';

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
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}

export default App
