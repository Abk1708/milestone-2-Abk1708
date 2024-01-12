// import { ProductContainer } from "@/Container";
import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/ui/navbar";

function App() {
    return (
        <div className="app">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
