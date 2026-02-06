import './App.css'
import {Routes, Route} from "react-router-dom";
import NavBar from "./components/navBar/navBar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import MyAccount from "./pages/MyAccount/MyAccount.jsx";
import Register from "./pages/Register/Register.jsx";
import Search from "./pages/Search/Search.jsx";
import PlantDetails from "./pages/PlantDetails/PlantDetails.jsx";


function App() {


    return (
        <>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<MyAccount />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/plant" element={<PlantDetails />} />
                </Routes>
            </div>
        </>
    )
}

export default App
