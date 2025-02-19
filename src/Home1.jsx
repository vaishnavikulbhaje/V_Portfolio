import React, { useState, useEffect, useRef } from "react";
import DOTS from "vanta/dist/vanta.dots.min";

const Home1 = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        DOTS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          maxHeight: 600.0,
          maxWidth: 1440,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xa0aff,
          color2: 0x71dfc,
          backgroundColor: 0x5011f,
          size: 2.3,
          spacing: 29.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef} className="min-h-screen flex items-center   px-4 sm:px-7 md:px-8 lg:px-24">
      <div className="text-white text-center sm:text-left max-w-full sm:max-w-lg lg:max-w-2xl mx-auto sm:mx-0">
        <h1 className="text-2xl sm:text-3xl sm:text-left md:text-4xl lg:text-5xl font-mono">
          Hi <br /> I'm Vaishnavi Kulbhaje <br/>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl"> BE-IT'24 </span>
        </h1>
        <h1 className="text-lg sm:text-xl md:text-2xl py-3 font-mono">Web Developer</h1>
        <a href="https://drive.google.com/file/d/1noqR5WQ-I8KMiWqjrsEUqRwaGPGyxjlC/view?usp=sharing" target="_blank" >
        <button   
          className="border border-blue-500 rounded-2xl hover:transition-all duration-500 hover:scale-90 text-base sm:text-lg md:text-xl px-3 sm:px-4 py-2 mt-4 hover:text-blue-800 transition "
          >
          Resume
        </button>
        </a>
      </div>
    </div>
  );
};

export default Home1;

















