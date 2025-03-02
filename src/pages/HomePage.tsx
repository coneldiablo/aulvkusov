import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import AnimatedPage from '../components/animation/AnimatedPage';

const HomePage: React.FC = () => {
  return (
    <AnimatedPage>
      <Hero />
      <About />
      <Menu />
      <Contact />
    </AnimatedPage>
  );
};

export default HomePage;