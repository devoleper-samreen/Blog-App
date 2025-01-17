import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedAuthLayout from './components/ProtectedAuthLayout.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>home</h1>
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthLayout authentication={true}>
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
          <ProtectedAuthLayout authentication={false}>
            <h1>all posts</h1>
          </ProtectedAuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <ProtectedAuthLayout authentication={false}>
            <h1>add post</h1>
          </ProtectedAuthLayout>
        )
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
