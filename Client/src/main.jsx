import { createRoot } from 'react-dom/client'
import './index.css'
import router from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
