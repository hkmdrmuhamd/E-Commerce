import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Routes'
import { Provider } from "react-redux"
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/*En dış katmanda belirlediğimiz bu provider alt componentlerin (router içinde tanımladığımız tüm componentler) kendisine erişmesine izin vermiş olur.*/}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
