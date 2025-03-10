import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedAuthLayout, Login } from './components/index.js';

//pages
import Signup from './pages/Signup.jsx';
import Home from "./pages/Home.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import MyPosts from "./pages/MyPosts.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthLayout authentication={false}>
            <Login />
          </ProtectedAuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <ProtectedAuthLayout authentication={false}>
            <Signup />
          </ProtectedAuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedAuthLayout authentication>
            {" "}
            <AllPosts />

          </ProtectedAuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <ProtectedAuthLayout authentication>
            {" "}
            <AddPost />
          </ProtectedAuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedAuthLayout authentication>
            {" "}
            <EditPost />
          </ProtectedAuthLayout>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <ProtectedAuthLayout authentication>
            {" "}
            <MyPosts />
          </ProtectedAuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
