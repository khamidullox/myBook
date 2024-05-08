import React from "react";
import { About, Contact, Crerate, Home, Login, Singup } from "./pages";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ProucterRouter from "./components/ProucterRouter";
import useGlobalContext from "./hooks/useGlobalContext";
import { useEffect } from "react";
//action
import { action as actionSingup } from "./pages/Singup";
import { actionLogin as actionLogin } from "./pages/Login";
//furebases
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
function App() {
  let { cretae } = useGlobalContext();
  let { user, dispetch, authReady } = cretae;
  let routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProucterRouter user={user}>
          <MainLayout />
        </ProucterRouter>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/create",
          element: <Crerate />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: actionLogin,
    },
    {
      path: "/singup",
      element: user ? <Navigate to="/" /> : <Singup />,
      action: actionSingup,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispetch({ type: "LOG_IN", paylod: user });
      dispetch({ type: "AUTH_READY" });
    });
    let allData = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "myBook"));
      querySnapshot.docs.forEach((itme) => {
        allData.push({ idF: itme.id, ...itme.data() });
      });
      dispetch({ type: "DATA_BASE", paylod: allData });
    }
    getData();
  }, []);
  return <>{authReady && <RouterProvider router={routers} />}</>;
}

export default App;
