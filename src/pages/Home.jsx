import Hero from "../components/Hero";
import About from "../sections/About";
import Events from "../sections/Events";
import Schedule from "../sections/Schedule";
import RegisterCTA from "../sections/RegisterCTA";
import Contact from "../sections/Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Schedule />
      <RegisterCTA />
      <Contact />
    </>
  );
}

export default Home;
