import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components/index"
import './App.css'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(
        () => setLoading(false)
      )
  }, [])

  return (
    <>
      {
        (
          <div className='min-h-screen flex flex-wrap content-between text-white'>
            <div className='w-full block'>
              <Header />
              <main className='min-h-[345px] bg-gray-800 my-2 text-2xl'>
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        )
      }

    </>
  )
}

export default App
