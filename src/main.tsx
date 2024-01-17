
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './queries/QueryProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
)
