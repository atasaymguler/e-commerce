import './App.css'
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import RouterConfig from './config/RouterConfig';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import MyModal from './components/MyModal';
import AddProductModal from './components/AddProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import ControlModal from './components/ControlModal';
import UpdateProductModal from './components/UpdateProductModal';
import { useEffect } from 'react';
import BasketDetails from './components/BasketDetails';
import BuyModal from './components/BuyModal';

function App() {

  const {user} = useSelector((state:RootState)=> state.app)

  return (
  <div >
     <>
     {user && <Navbar />}
  <RouterConfig  /> 
      </>
      <ToastContainer position='bottom-right' autoClose={2000} />
      <Spinner />
      <MyModal />
      <ControlModal />
      <AddProductModal />
      <DeleteProductModal />
      <UpdateProductModal />
      <BasketDetails />
      <BuyModal />
    </div>
  )
}

export default App
