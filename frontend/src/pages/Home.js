import { ToastContainer } from "react-toastify";

// import css
import "../assets/css/home.css";
import HeroSection from "../components/home/HeroSection";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <ToastContainer />
    </div>
  );
}

export default Home;
