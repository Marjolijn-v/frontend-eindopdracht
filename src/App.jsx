import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import NavBar from "./components/navBar/navBar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import MyAccount from "./pages/MyAccount/MyAccount.jsx";
import Register from "./pages/Register/Register.jsx";
import Search from "./pages/Search/Search.jsx";
import PlantDetails from "./pages/PlantDetails/PlantDetails.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import NewPlant from "./pages/NewPlant/NewPlant.jsx";


function App() {
    const { authentication } = useContext(AuthContext);


    return (
        <>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={authentication === true ? <MyAccount /> : <Navigate to="/"/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/plant/:id" element={<PlantDetails />} />
                    <Route path="/newplant" element={authentication === true ? <NewPlant /> : <Navigate to="/"/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
