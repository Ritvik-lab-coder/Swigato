import Login from './auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import Hero from './components/Hero'
import MainLayout from './Layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'
import Menu from './admin/Menu'
import Orders from './admin/Orders'
import Success from './components/Success'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Hero />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/search/:term',
        element: <SearchPage />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetails />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/orders/status',
        element: <Success />
      },
      {
        path: '/admin/restaurant',
        element: <Restaurant />
      },
      {
        path: '/admin/menu',
        element: <Menu />
      },
      {
        path: '/admin/orders',
        element: <Orders />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  )
}

export default App
