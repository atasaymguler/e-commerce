
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import theme from "./theme.ts";
import { ThemeProvider } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>
  </BrowserRouter>,
)
