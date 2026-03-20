import Hero from "../components/Hero";
import About from "../sections/About";
import Events from "../sections/Events";
import News from "../sections/News";
import RegisterCTA from "../sections/RegisterCTA";
import Contact from "../sections/Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <News />
      <RegisterCTA />
      <Contact />
    </>
  );
}

export default Home;
