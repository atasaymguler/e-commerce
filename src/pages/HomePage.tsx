import { Outlet, useLocation } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useEffect } from "react";
import type { RegisterUserType } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice/appSlice";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import type { RootState } from "../redux/store";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user: RegisterUserType;
    if (userString) {
      user = JSON.parse(userString) as RegisterUserType;
      dispatch(setUser(user));
    }
  }, []);

  const {user} = useSelector((state:RootState)=> state.app)

  const location = useLocation();

  const isHomeRoot = location.pathname === "/home"; // Yalnızca tam olarak "/home" ise true olur

  return (
    <>
      {user && <Navbar />}
      <div className="flex !pt-[10vh] min-h-screen">
        <div className="w-1/7  h-[calc(100vh-10vh)] fixed top-[10vh]  left-0  ">
      
       <AppBar />
        </div>
        <div className="!ml-[16.6%] min-h-[90vh] w-5/6 overflow-y-auto !py-4">
          <Container sx={{ height: "100%" }} maxWidth="xl">
            {" "}
            <div className="h-full">
              {isHomeRoot && (
                <div className="w-full flex justify-center items-center">
                  <section className="font-mono text-center">
                    <h1 className="text-4xl font-bold">
                      Plaza E-Ticaret Sitenize Hoşgeldiniz.
                    </h1>
                    <p className="!mt-3">Bu site uygulamalı bir e-ticaret sitesidir</p>
                    <p className="!mt-3 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate beatae voluptates reiciendis atque dolorem libero autem deleniti eaque aperiam nobis, sint quisquam. Autem quasi odit dolores perferendis sunt labore quam recusandae alias, doloribus possimus reprehenderit quidem nam voluptates omnis velit praesentium, ullam iusto dolorum, consequatur impedit! Nulla qui, a nisi voluptatem soluta praesentium facere nobis alias nemo dolores aspernatur nam ex natus esse porro debitis architecto sed eveniet ab assumenda. Magni quod cupiditate laudantium incidunt eum ipsa corporis fugiat architecto adipisci aut a quasi sunt quos nostrum eveniet necessitatibus quia deleniti molestias eos sapiente ipsum, velit reiciendis temporibus! Ducimus</p>
                    <p className="!mt-3 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate beatae voluptates reiciendis atque dolorem libero autem deleniti eaque aperiam nobis, sint quisquam. Autem quasi odit dolores perferendis sunt labore quam recusandae alias, doloribus possimus reprehenderit quidem nam voluptates omnis velit praesentium, ullam iusto dolorum, consequatur impedit! Nulla qui, a nisi voluptatem soluta praesentium facere nobis alias nemo dolores aspernatur nam ex natus esse porro debitis architecto sed eveniet ab assumenda. Magni quod cupiditate laudantium incidunt eum ipsa corporis fugiat architecto adipisci aut a quasi sunt quos nostrum eveniet necessitatibus quia deleniti molestias eos sapiente ipsum, velit reiciendis temporibus! Ducimus</p>
                  </section>
                </div>
              )}
              <Outlet />
            </div>{" "}
          </Container>
        </div>
      </div>
    </>
  );
}
