import { Badge, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "../css/accountDetails.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAddProductModal, setUser } from "../redux/slice/appSlice";
import type { RootState } from "../redux/store";
import { setBasketDrawer } from "../redux/slice/productSlice";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AppBar() {
  const { user } = useSelector((state: RootState) => state.app);
  const { selectedProducts } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    toast.success("Çıkış Yapıldı");
    localStorage.removeItem("user");
    localStorage.removeItem("currentPage");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <div className="w-full bg-[#95afc0] min-h-[90vh] text-[#fff] flex  flex-col items-center ">
      <div className="!mt-5 flex flex-col items-start ">
        <div className="flex items-center  !mb-3 ">
          {user?.isAdmin && (
            <Button
              size="large"
              color="inherit"
              variant="text"
              sx={{
                textTransform: "none",
                display: "flex",
                alignItems: "center",

                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
              }}
              onClick={() => dispatch(setAddProductModal(true))}
            >
              <div className="md:hidden">
                <AddIcon sx={{ fontSize: "22px" }} />
              </div>
              <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
                Ürün Ekle
              </p>
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center  !mb-3 ">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
            component={Link}
            to="/home/products"
          >
            <div className="md:hidden">
              <ShoppingCartIcon sx={{ fontSize: "22px" }} />
            </div>
            <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
              Ürünler
            </p>
          </Button>
        </div>

        <div className="flex items-center justify-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
            onClick={() => dispatch(setBasketDrawer(true))}
          >
            <div className="md:hidden">
              <Badge
                badgeContent={selectedProducts.length}
                max={9}
                color="primary"
              >
                <ShoppingBasketIcon sx={{ fontSize: "22px" }} />
              </Badge>
            </div>

            <div className="hidden  md:block">
              <Badge
                badgeContent={selectedProducts.length}
                max={9}
                color="primary"
              >
                <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
                  Sepetim
                </p>
              </Badge>
            </div>
          </Button>
        </div>

        <div className="flex  items-center   justify-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
            component={Link}
            to="/home/past-orders"
          >
            <div className="md:hidden">
              <ContentPasteIcon sx={{ fontSize: "22px" }} />
            </div>

            <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
              Geçmiş Siparişler
            </p>
          </Button>
        </div>
        <div className="flex  items-center  justify-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
            component={Link}
            to="/home/account-details"
          >
            <div className="md:hidden">
              <AccountBoxIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            </div>

            <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
              Hesap Bilgileri
            </p>
          </Button>
        </div>
        <div className="flex items-center justify-center !mb-3">
          <Button
            size="large"
            color="inherit"
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
            component={Link}
            to="/home/privacy"
          >
            <div className="md:hidden">
              <LockIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            </div>

            <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
              Gizlilik
            </p>
          </Button>
        </div>
        <div className="!mb-3">
          <Button
            size="large"
            color="inherit"
            onClick={logout}
            variant="text"
            sx={{
              textTransform: "none",
              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "center",
                md: "flex-start",
              },
            }}
          >
            <div className="md:hidden">
              <LogoutIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            </div>

            <p className="hidden  text-[#fff] md:block md:text-[0.6rem]  lg:text-[0.85rem] xl:text-[1rem]">
              Çıkış Yap
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
