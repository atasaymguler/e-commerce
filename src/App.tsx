import './App.css'
import Spinner from './components/Spinner';
import RouterConfig from './config/RouterConfig'
  import { ToastContainer } from 'react-toastify';

function App() {
 
  return (
    <div >
    <RouterConfig />
     <ToastContainer position='bottom-right' autoClose={2000} />
     <Spinner />
    </div>
  )
}

export default App
