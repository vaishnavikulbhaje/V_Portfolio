import React from "react";

function Home3() {
  return (
    <div className="py-10">
      <div>
      <h1 className="text-white text-center pt-6 sm:pt-10 md:pt-10 text-3xl sm:text-4xl font-bold font-mono tracking-wider">
      Experience
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 items-center px-6 sm:px-20 lg:px-20 border pt-12 gap-3">
        <div className="  rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e]  ">
        <div className="  rounded-2xl  bg-[#05011f]" m-1>  
          <a href="https://www.ayatifoundation.org/" target="_blank">        
          <img
            className="rounded-2xl  h-[334px]" 
            src="src/assets/Ayati-bg.png" alt="Ayati.png" />
            </a>  
          </div>
        </div>
        <div className=" rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e]  ">
          <div className="  rounded-2xl  bg-[#05011f]" m-1> 
            <p className="text-white px-7 pt-7 text-lg rounded-lg text-justify  justify-center">
              Developed a responsive website to boost Ayati Foundation's online
              presence and showcase its impactful work. The site highlights the
              NGO’s projects, focus areas, and mission through engaging visuals
              and user-friendly navigation. Designed to inspire action, it
              features a dedicated volunteer registration form, making it
              effortless for passionate individuals to join the cause. Optimized
              for performance and mobile responsiveness, the website serves as a
              powerful platform to attract donors, volunteers, and partners,
              driving meaningful connections and community growth.
            </p>
            <p className="text-purple-600 p-7  text-lg rounded-lg text-justify  justify-center">
              You can view my work here :{" "}
              <a
                href="https://www.ayatifoundation.org/"
                class="text-blue-600 visited:text-purple-600 ..."
              >
                {" "}
                Ayati Foundation{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home3;
