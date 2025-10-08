import {  Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "../css/accountDetails.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAddProductModal,  setUser } from "../redux/slice/appSlice";
import type { RootState } from "../redux/store";
import { setBasketDrawer } from "../redux/slice/productSlice";

export default function AppBar() {
  const { user } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    toast.success("Çıkış Yapıldı");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <div className="w-full bg-[#646161] h-[90vh] text-[#fff] flex justify-between flex-col items-center ">
      <div className="!mt-5 ">
        <div className="flex justify-between items-center !mb-3 ">
          {user?.isAdmin && (
            <Button
              size="large"
              color="inherit"
              variant="text"
              sx={{ textTransform: "none" }}
              onClick={() => dispatch(setAddProductModal(true))}
            >
              <AddIcon />
              <span className="!mx-5 text-[#fff]">Ürün Ekle</span>
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center !mb-3 ">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/home/products"
          >
            <ShoppingCartIcon />
            <span className="!mx-5 text-[#fff]">Ürünler</span>
          </Button>
        </div>
        <div className="flex justify-between items-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{ textTransform: "none" }}
            // component={Link}
            // to="/home/basket"
            onClick={()=> dispatch(setBasketDrawer(true))}
          >
            <ShoppingBasketIcon />
            <span className="!mx-5 text-[#fff]">Sepetim</span>
          </Button>
        </div>

        <div className="flex justify-between items-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/home/past-orders"
          >
            <ContentPasteIcon />
            <span className="!mx-5 text-[#fff]">Geçmiş Siparişler</span>
          </Button>
        </div>
        <div className="flex justify-between items-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/home/account-details"
          >
            <AccountBoxIcon />
            <span className="!mx-5 text-[#fff]">Hesap Bilgileri</span>
          </Button>
        </div>
        <div className="flex justify-between items-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{ textTransform: "none" }}
            component={Link}
            to="/home/privacy"
          >
            <LockIcon />
            <span className="!mx-5 text-[#fff]">Gizlilik</span>
          </Button>
        </div>
      </div>

      {/* <Box sx={{ p: 2,display:"none" }}>
    <Button onClick={logout} fullWidth variant="outlined" color='inherit'>
      Çıkış Yap
    </Button>
  </Box> */}
    </div>
  );
}
