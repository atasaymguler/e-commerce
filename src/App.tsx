import './App.css'
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import RouterConfig from './config/RouterConfig';
import MyModal from './components/MyModal';
import AddProductModal from './components/AddProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import ControlModal from './components/ControlModal';
import UpdateProductModal from './components/UpdateProductModal';
import './css/toastify.css'
import BasketDetails from './components/BasketDetails';
import BuyModal from './components/BuyModal';

function App() {

  return (
  <> 
      <RouterConfig  /> 
      <ToastContainer  position='bottom-right' autoClose={2000} />
      <Spinner />
      <MyModal />
      <ControlModal />
      <AddProductModal />
      <DeleteProductModal />
      <UpdateProductModal />
      <BasketDetails />
      <BuyModal />
    </>
  )
}

export default App
