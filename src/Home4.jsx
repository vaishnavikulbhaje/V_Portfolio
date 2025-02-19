import React from "react";

function Home4() {
  return (
    <div className="py-10">
      <div>
      <h1 className="text-white text-center pt-6 sm:pt-10 md:pt-10 text-3xl sm:text-4xl font-bold font-mono tracking-wider">
      {/* <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"> */}

          Projects
        </h1>
        
        {/* <h1 class="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">Let's Connect!</h1> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 px-10 pt-12 gap-3 sm:gap-20 lg:gap-20">
      <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e] hover:scale-90 ease-in-out duration-300">
      <div className="border border-white bg-cover p-10 bg-[url('src/assets/sapfix-bg.png')] bg-center bg-no-repeat bg-blend-overlay bg-black/80 w-full h-full lg:hover:bg-[#05011f]/100 transition-all duration-500 text-white  hover:text-white rounded-2xl md:hover:bg-transparent hover:scale-80 ease-in-out ">
            <h1 className="text-center font-serif text-4xl ">SnapFix</h1>
            <h3 className="text-center  font-mono">
              React.js | Taildwind | Google-Sheet
            </h3>
            <p className=" text-justify justify-center font-semibold pt-4">
              Built an all-in-one home repair and construction platform using
              React; offering services like plumbing, electrical work, quick
              repairs, renovations, and more.The platform features easy service booking, quick contact options,
              and a seamless, user-friendly design. 
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e] hover:scale-90 ease-in-out duration-300">
          <div className="border border-white bg-cover p-10 bg-[url('src/assets/eastdepo.jpg')] bg-center bg-no-repeat bg-blend-overlay bg-black/80 w-full h-full lg:hover:bg-[#05011f]/100 transition-all duration-500 text-white  hover:text-white rounded-2xl md:hover:bg-transparent hover:scale-80 ease-in-out  ">
            <h1 className="text-center font-serif text-4xl ">Easy- Depot</h1>
            <h3 className="text-center  font-mono">
              React.js | Taildwind | MongoDB | Node.js | Express.js
            </h3>
            <p className=" text-justify justify-center font-semibold pt-4">
              Developed a unified, first-of-its-kind system to streamline
              transactions between newspaper vendors and distributors. Designed
              to achieve reduction in transaction processing time and a boost in
              operational efficiency, this solution eliminates manual
              bottlenecks, enhances accuracy, and ensures seamless, real-time
              transaction management for smoother business operations.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 px-10 pt-3 gap-3 sm:gap-20 lg:gap-20">
      <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e] hover:scale-90 ease-in-out duration-300">
      <div className="border border-white bg-cover p-10 bg-[url('src/assets/passwordgenerator.png')] bg-center bg-no-repeat bg-blend-overlay bg-black/80 w-full h-full lg:hover:bg-[#05011f]/100 transition-all duration-300 text-white ease-in-out hover:text-white rounded-2xl md:hover:bg-transparent hover:scale-80 ">
            <h1 className="text-center font-serif text-4xl ">
              Password Generator
            </h1>
            <h3 className="text-center  font-mono">
              React.js | Taildwind
            </h3>
            <p className=" text-justify justify-center font-semibold pt-4">
              Built a dynamic password generator with adjustable length and
              character options, allowing you to scale passwords from a minimum
              of 8 to a maximum of 100 characters, supporting up to 72-character
              diversity. You can dynamically add special characters and numbers
              to customize your password. Designed for smooth performance and
              real-time updates, it offers an intuitive, user-friendly
              experience for generating strong, secure passwords effortlessly.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-[2px] bg-gradient-to-r from-blue-800 via-blue-900 to-[#06002e] hover:scale-90 ease-in-out duration-300">
          <div className="border border-white bg-cover p-10 bg-[url('src/assets/payrollsystem.png')] bg-center bg-no-repeat bg-blend-overlay bg-black/80 w-full h-full lg:hover:bg-[#05011f]/100 transition-all duration-300 text-white ease-in-out hover:text-white rounded-2xl md:hover:bg-transparent hover:scale-80 ">
            <h1 className="text-center font-serif text-4xl ">
              Employee-Management System
            </h1>
            <h3 className="text-center  font-mono">
              java | Oops
            </h3>
            <p className=" text-justify justify-center font-semibold pt-4">
              This Employee Management System helps manage employee details
              efficiently, including adding, removing, and displaying employee
              information. It handles both full-time and part-time employees,
              allowing easy tracking of their names, IDs, and salaries. The
              system ensures smooth payroll management by calculating salaries
              based on employee type and maintaining an organized record of all
              employees.
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10">
       <p className="text-white  md:text-white lg:text-white text-center text-md md:text-2xl lg:text-2xl border border-blue-400 mx-1 sm:mx-24 bg-blue-900 md:bg-blue-900  lg:bg-transparent   lg:mx-96 py-1.5  rounded-xl  md:rounded-2xl lg:rounded-2xl hover:bg-blue-900 hover:border-2 transition-all duration-500 hover:text-white">I'm Open to work, Tech Opportunities are welcome!</p>
      </div>
    </div>
  );
}

export default Home4;
