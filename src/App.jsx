import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Events from "./components/Events.jsx";
import Schedule from "./components/Schedule.jsx";
import About from "./components/About";
import Registration from "./components/Registration.jsx";
import Contact from "./components/Contact.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Events />
      <Schedule />
      <About />
      <Registration />
      <Contact />
    </div>
  );
}

export default App;