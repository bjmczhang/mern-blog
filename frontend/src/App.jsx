import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-primary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <footer className="mt-auto">Footer</footer>
      </div>
    </>
  );
}

export default App;
