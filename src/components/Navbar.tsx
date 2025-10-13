import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setUser } from "../redux/slice/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Icon from '../assets/Main1.jpg'

export default function Navbar() {
    
    const {user} = useSelector((state:RootState)=> state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        toast.success("Çıkış Yapıldı")
        localStorage.removeItem("user")
         localStorage.removeItem("currentPage")
        dispatch(setUser(null))
        navigate("/")
    }
 
  return (
    <AppBar className="flex justify-center"  elevation={0} position="fixed" sx={{height:"10vh",bgcolor:"#95afc0"}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        onClick={()=>{navigate("/home")}}
        >
          <img src={Icon} className="w-[50px] h-[50px] rounded-[50%]" />
        </IconButton>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Plaza
        </Typography>
        <div className="flex justify-center items-center gap-5">
            <p className="text-[12px] md:text-[0.85rem] lg:text-[1rem]">Hoşgeldin,{user?.firstName}</p>
          {/* <Button onClick={logout} variant="outlined" sx={{ textTransform: "none" }}  color="inherit">
            Çıkış Yap
          </Button> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
