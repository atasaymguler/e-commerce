import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setUser } from "../redux/slice/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import type { RegisterUserType } from "../types/Types";

export default function Navbar() {
    
    useEffect(()=>{
        let userString =  localStorage.getItem("user")
        let user : RegisterUserType;
        if(userString){
          user = JSON.parse(userString) as  RegisterUserType
          dispatch(setUser(user))
        }  
   
    },[])
    
    const {user} = useSelector((state:RootState)=> state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        toast.success("Çıkış Yapıldı")
        localStorage.removeItem("user")
        dispatch(setUser(null))
        navigate("/")
    }
    
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plaza
        </Typography>
        <div className="flex justify-center items-center gap-5">
            <p>Hoşgeldin,{user?.username}</p>
          <Button onClick={logout} variant="contained" sx={{ textTransform: "none" }} color="secondary">
            Çıkış Yap
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
