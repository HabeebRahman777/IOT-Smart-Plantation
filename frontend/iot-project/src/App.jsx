import Home from './pages/Home';
import background_video from "./assets/forest_background.mp4" 
import { Routes,Route } from "react-router-dom"
import Navbar from './components/Navbar';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div className="relative min-h-screen">
      <Toaster/>
      <Navbar/>
      {/* Background Video */}
      <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover -z-10">
        <source src={background_video} type="video/mp4" />
      </video>
  
      {/* Content */}
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
}

export default App;
