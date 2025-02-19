
import React, { useState, useEffect, useRef } from "react";
import { div } from "three/tsl";
import WAVES from "vanta/dist/vanta.waves.min";
import * as Yup from "yup";

const Mhome = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message:"",
    
  });

  // Initialize errors as an empty object instead of undefined
  const [error, setErrors] = useState({});

  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Sometimes Names can be interesting too!")
      .max(50, "Must be less than 50 characters"),
 
      contact: Yup.string()
      .matches(/^[6-9]\d{9}$/, "You faked! You are Caught.")
      .required("Your Phone No Please?"),
    message: Yup.string()
      .required("say, I won't Judge..!")
    
  });

  const handlePost = async (e) => {
    

    setIsLoading(true);
    const formDataObj = new FormData();
    
    // Explicitly add each field with proper keys matching your Google Apps Script
    formDataObj.append("name", formData.name);
    formDataObj.append("contact", formData.contact.toString()); // Ensure phone is sent as string
    formDataObj.append("message", formData.message);
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbw2fmj2rX6UKEglydeMuM9IISVjHFqxNyimGXN43mPlI0o8PDr-76O0pnK3BmT-QYZ2/exec",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formDataObj,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSuccess("Form Submitted Sucessfully!");
          setFormData({
            name: "",
            contact: "",
            message: "",
           
          });
        });
    } catch (error) {
      console.log(error);
      setFailure("Form Not Submited");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setFailure("");

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted");
      setErrors({}); // Clear errors on successful validation
      handlePost(formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          maxHeight: 600.0,
          maxWidth: 1440.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x5011f,
          shininess: 33.0,
          waveHeight: 15.5,
          waveSpeed: 2.0,
          zoom: 1.75,
        })
      );
    }
    return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);
  return (
    <div ref={myRef}>
      <div className="text-center p-4 py-6 md:py-10 md:p-10 text-blue-400 lg:text-4xl md:text-4xl text-3xl font-mono font-semibold">
       Want to know more ?
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2  gap-10 md:gap-0 lg:gap-20 mx-6 sm:px-0 lg:px-36 pb-10">
        <div className=" ">
          <div className=" flex items-center justify-center ">
            <div className="flex item-center border border-[#071dfc] hover:border-2 rounded-3xl w-full sm:w-4/5 lg:w-full h-full py-8 px-6 sm:px-3  lg:px-20 bg-transparent shadow-xl hover:shadow-2xl">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-lg text-blue-400">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    className="border  text-white hover:border-2 border-gray-400 px-2 pb-1 rounded-lg text-lg bg-transparent w-full placeholder:text-base placeholder:bg-transparent placeholder:text-gray-500"
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    
                  />
                    {error.name &&( 
                    <p className="text-red-500 text-sm">{error.name}</p>)}

                </div>
                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-lg pt-4 text-blue-400"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="contact"
                    value={formData.contact}
                    name="contact"
                    className="border  text-white hover:border-2 border-gray-400 px-2 pb-1 rounded-lg bg-transparent text-lg font-medium w-full placeholder:text-base placeholder:bg-transparent placeholder:text-gray-500"
                    placeholder="Enter Phone Number"
                    onChange={handleChange}
                   
                  />
                  {error.contact &&( 
                    <p className="text-red-500 text-sm">{error.contact}</p>)}
                  
                </div>
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg pt-4 text-blue-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    name="message"
                    className="border  text-white hover:border-2 border-gray-400 w-full rounded-lg bg-transparent text-lg p-3 font-medium focus:outline-none focus:ring-1 focus:ring-black placeholder:text-base placeholder:text-gray-500"
                    rows="4"
                    onChange={handleChange}
                    placeholder="Type your Message/Query Here"
                   
                  />
                  {error.message &&( 
                    <p className="text-red-500 text-sm">{error.message}</p>)}
                </div>
                {/* Submit Button */}


                {success && (
                  <div className=" pl-1">
                  <p className="text-green-600">Your Response Reached Successfully..!</p>
                  </div>
                )}

                {failure && (
                  <p className="text-green-600">Response not Submitted due to Network Issue </p>
                )}
                <button
                  type="submit"
                  className=" w-full sm:w-auto  bg-blue-800 hover:bg-blue-900 hover:scale-95  text-white px-10 py-3 rounded-lg font-normal transition-all duration-500 ease-in-out hover:text-black"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="grid grid-rows-1  sm:grid-rows-2 lg-grid-rows-2 items-center gap-3 place-content-center">
          <div className="text-white flex flex-col gap-3 text-center px-2 sm:px-10  lg:px-10 ">
            <p className=" text-md  sm:text-md md:text-xl lg:text-xl font-mono ">
              Email : vaishnavikulbhaje7@gmail.com
            </p>
            <p className=" text-md  sm:text-md md:text-xl pb-3 lg:text-xl font-mono">Phone No : +91 7385860023</p>
            </div>
            <div className="flex flex-row gap-5 place-content-center ">
              <a href="https://github.com/vaishnavikulbhaje" target="_blank">
              <img
                alt="svgImg"
                className="  h-15 w-15  lg:h-18 lg:w-18 md:h-18 md:w-18 hover:transition-all hover:scale-125 duration-500 ease-in-ou "
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgOTYgOTYiIHdpZHRoPSI5NnB4IiBoZWlnaHQ9Ijk2cHgiPjxwYXRoIGZpbGw9IiMwZmQyZmYiIGQ9Ik01Ni45OTksODMuODI3Yy0wLjg4NSwwLTEuNjk0LTAuNTkyLTEuOTMyLTEuNDg4Yy0wLjI4My0xLjA2NywwLjM1My0yLjE2MiwxLjQyLTIuNDQ1IEM3MC45Miw3Ni4wNjIsODEsNjIuOTQ3LDgxLDQ4YzAtMTguMTk2LTE0LjgwNC0zMy0zMy0zM1MxNSwyOS44MDQsMTUsNDhjMCwxNC4wNjMsOC45MjQsMjYuNTA1LDIyLDMxLjExOHYtNS41NjcgYy0zLjAxMiwwLjM3Ni02LjAwMS0wLjI5Ny04LjQ2NS0xLjkyYy0xLjg1Ni0xLjIyNy0zLjI3OC0yLjkyOS00LjAwNi00Ljc5M2MtMC4wODQtMC4yMDItMC4xOC0wLjQ1NS0wLjI3NS0wLjcxIGMtMC4xNDMtMC4zOC0wLjI3Ny0wLjczOS0wLjQyMi0xLjAxOGMtMC41MzMtMS4xMDYtMS41NDMtMS45NjItMi42NjctMi4yOTJjLTAuMDM0LTAuMDEtMC4wNjctMC4wMjEtMC4xMDEtMC4wMzIgYy0xLjM0NC0wLjQ3NC0yLjEzOC0xLjgwMy0xLjkzMS0zLjIzMWMwLjIwNy0xLjQzLDEuMzQzLTIuNDc5LDIuNzY0LTIuNTUyYzMuNzc1LTAuMjc4LDcuNDkxLDIuMDU1LDkuNDIyLDUuOTI3IGMwLjAxOCwwLjAzNSwwLjAzNCwwLjA3MSwwLjA1LDAuMTA3YzAuNDQ2LDEuMDQ2LDEuNTMzLDEuNzcsMi43NjksMS44NDRjMC4wNDQsMC4wMDIsMC4wODksMC4wMDcsMC4xMzMsMC4wMTIgYzAuOTU1LDAuMTI2LDEuOTkxLTAuMTE5LDIuODg2LTAuNjUzYzAuMDg2LTAuNDgzLDAuMjA4LTAuOTU4LDAuMzYyLTEuNDJDMjkuMzE3LDYxLjYxNSwyMyw1NC41MzEsMjMsNDZ2LTIgYzAtNC4xNzIsMS4yNjgtOC4xMzgsMy42NzUtMTEuNTI5Yy0wLjQ0NS0yLjIzNS0wLjYzNi01LjM4OSwwLjQwMi05LjAyMWMwLjIxNy0wLjc2MiwwLjg2NC0xLjMyMiwxLjY0OC0xLjQzMiBjMC4yMDEtMC4wMjcsNC42NDYtMC41OTUsOC44NDMsMi43NDdDMzkuMzU0LDI0LjI1Nyw0MS4xNzYsMjQsNDMsMjRjMS4xMDQsMCwyLDAuODk2LDIsMnMtMC44OTYsMi0yLDIgYy0xLjc2LDAtMy41MjQsMC4zMDMtNS4yNDMsMC44OThjLTAuNzA5LDAuMjQzLTEuNDkzLDAuMDc0LTIuMDM0LTAuNDRjLTEuODcxLTEuNzgtMy44NzEtMi4zMDktNS4xNDQtMi40NSBjLTAuNSwyLjY3OS0wLjE5Nyw0LjkyNSwwLjE4Nyw2LjQyMmMwLjE1NSwwLjYwMiwwLjAyMSwxLjI0LTAuMzYyLDEuNzI5QzI4LjE3NywzNy4wMDUsMjcsNDAuNDA4LDI3LDQ0djJjMCw3LjE2OCw1LjgzMiwxMywxMywxMyBoMC43NmMwLjc3LDAsMS40NywwLjQ0MSwxLjgwMywxLjEzNWMwLjMzMywwLjY5MywwLjIzOCwxLjUxNy0wLjI0MywyLjExN2MtMC43NTUsMC45NC0xLjIwNCwyLjA3MS0xLjI5OSwzLjI3IGMtMC4wNDMsMC41NDMtMC4zMDUsMS4wNDQtMC43MjcsMS4zOWMtMS44NTEsMS41MTUtNC4yMDEsMi4yMjMtNi40NjIsMS45NThjLTIuMDMxLTAuMTQtMy44NDMtMS4wNjQtNS4wNzItMi41MjMgYzAuNDg2LDAuNzQxLDEuMTYyLDEuNDA3LDEuOTc4LDEuOTQ3YzEuNzYsMS4xNTksMy45NDIsMS42MDEsNi4xMzUsMS4yMzRjMC4wNDgtMC4wMDgsMC4wOTYtMC4wMTQsMC4xNDQtMC4wMTggYzAuMTUtMC4wMTUsMC41NzktMC4wNzQsMS4zMDgtMC4zMzZjMC42MTItMC4yMTcsMS4yOTQtMC4xMjcsMS44MjYsMC4yNDdDNDAuNjgzLDY5Ljc5Niw0MSw3MC40MDYsNDEsNzEuMDU3djEwLjc3IGMwLDAuNjIxLTAuMjg5LDEuMjA3LTAuNzgxLDEuNTg1Yy0wLjQ5MiwwLjM3OS0xLjEzMSwwLjUwNy0xLjczMiwwLjM0OEMyMi4zMDMsNzkuNDY0LDExLDY0Ljc1OSwxMSw0OGMwLTIwLjQwMiwxNi41OTgtMzcsMzctMzcgczM3LDE2LjU5OCwzNywzN2MwLDE2Ljc1OS0xMS4zMDMsMzEuNDY0LTI3LjQ4NywzNS43NTlDNTcuMzQxLDgzLjgwNSw1Ny4xNjgsODMuODI3LDU2Ljk5OSw4My44Mjd6IE0yMi4xNzIsNjAuOTkzIGMtMC4wMSwwLTAuMDIsMC4wMDEtMC4wMywwLjAwMkMyMi4xNTIsNjAuOTk0LDIyLjE2Myw2MC45OTQsMjIuMTcyLDYwLjk5M3oiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzBmZDJmZiIgZD0iTTU2Ljk5OCw4NC44MjdjLTEuMzI3LDAtMi41NDEtMC44ODgtMi44OTctMi4yMzFjLTAuNDI1LTEuNjAyLDAuNTI4LTMuMjQ0LDIuMTMtMy42NjkgQzcwLjIyNiw3NS4yMTIsODAsNjIuNDk0LDgwLDQ4YzAtMTcuNjQ1LTE0LjM1NS0zMi0zMi0zMmMtNi4zMTMsMC0xMi4yMDYsMS44MzgtMTcuMTcsNS4wMDdjMS45NzYsMC4xODQsNC41NDEsMC44OTIsNi45NTEsMi42NjQgQzM5LjUsMjMuMjI2LDQxLjI0OSwyMyw0MywyM2MxLjY1NywwLDMsMS4zNDMsMywzcy0xLjM0MywzLTMsM2MtMS42NDgsMC0zLjMwMiwwLjI4My00LjkxNiwwLjg0MyBjLTEuMDYxLDAuMzY3LTIuMjM4LDAuMTEzLTMuMDUxLTAuNjZjLTEuMjUzLTEuMTkzLTIuNTcxLTEuNzUzLTMuNjIxLTIuMDExYy0wLjI0MSwyLjA2OCwwLjAxMiwzLjgwMSwwLjMyMiw1LjAwOSBjMC4yMzEsMC45MDIsMC4wMzEsMS44NjEtMC41NDMsMi41OTVDMjkuMTA0LDM3LjQ0NCwyOCw0MC42MzQsMjgsNDR2MmMwLDYuNjE3LDUuMzgzLDEyLDEyLDEyaDAuNzYgYzEuMTU0LDAsMi4yMDYsMC42NjIsMi43MDUsMS43MDJjMC41LDEuMDQxLDAuMzU3LDIuMjc1LTAuMzY1LDMuMTc1Yy0wLjYyOCwwLjc4NC0xLjAwMiwxLjcyNi0xLjA4MiwyLjcyNCBjLTAuMDY0LDAuODEzLTAuNDU4LDEuNTY2LTEuMDksMi4wODRjLTAuMjU5LDAuMjExLTAuNTI2LDAuNDA5LTAuODAxLDAuNTkyYzAuMjA5LDAuMDg1LDAuNDEsMC4xOTQsMC41OTksMC4zMjcgQzQxLjUyNSw2OS4xNjUsNDIsNzAuMDgsNDIsNzEuMDU3djEwLjc3YzAsMC45MzItMC40MzMsMS44MS0xLjE3MSwyLjM3OGMtMC43MzksMC41NjktMS42OTksMC43Ni0yLjU5OSwwLjUyMSBDMjEuNjA5LDgwLjMxNCwxMCw2NS4yMTIsMTAsNDhjMC0yMC45NTMsMTcuMDQ3LTM4LDM4LTM4czM4LDE3LjA0NywzOCwzOGMwLDE3LjIxMi0xMS42MDksMzIuMzE0LTI4LjIzLDM2LjcyNiBDNTcuNTEyLDg0Ljc5NCw1Ny4yNTMsODQuODI3LDU2Ljk5OCw4NC44Mjd6IE0xOS45MTcsNjMuMzM1QzIzLjQxMiw2OS43MjksMjkuMDQ2LDc0Ljg2MiwzNiw3Ny42NzF2LTMuMDMyIGMtMi44NjMsMC4xMTctNS42NTktMC42MjItOC4wMTUtMi4xNzJjLTIuMDI5LTEuMzQyLTMuNTg1LTMuMjEtNC4zODgtNS4yNjZjLTAuMDgxLTAuMTkyLTAuMTgtMC40NTYtMC4yOC0wLjcyMiBjLTAuMTMyLTAuMzUyLTAuMjU2LTAuNjgzLTAuMzczLTAuOTA2Yy0wLjQyOS0wLjg4OS0xLjIwMi0xLjU0My0yLjA2Mi0xLjc5NmMtMC4wNTEtMC4wMTUtMC4xMDEtMC4wMzEtMC4xNTEtMC4wNDkgQzIwLjQ0LDYzLjYyNiwyMC4xNjgsNjMuNDkzLDE5LjkxNyw2My4zMzV6IE0zMi4wMzgsNjIuMTQyYzAuMDYxLDAuMTEyLDAuMTE5LDAuMjI3LDAuMTc3LDAuMzQxIGMwLjAyNiwwLjA1NCwwLjA1MSwwLjEwNywwLjA3NSwwLjE2MmMwLjI5OSwwLjcsMS4wNDgsMS4xODcsMS45MDksMS4yMzhjMC4wNjcsMC4wMDQsMC4xMzMsMC4wMSwwLjIsMC4wMTkgYzAuNTk1LDAuMDc3LDEuMjMxLTAuMDM1LDEuODI1LTAuM0MzNC43NTQsNjMuMjg2LDMzLjM1MSw2Mi43OTIsMzIuMDM4LDYyLjE0MnogTTIyLjI2Myw2MS45ODkgYy0wLjAxNiwwLjAwMS0wLjAzMywwLjAwMi0wLjA0OSwwLjAwM0MyMi4yMyw2MS45OTEsMjIuMjQ3LDYxLjk5LDIyLjI2Myw2MS45ODl6IE0yNS42NjEsMjUuMTA4QzE5LjcwNCwzMC45MjQsMTYsMzkuMDM3LDE2LDQ4IGMwLDQuMDE3LDAuNzUsNy44OTYsMi4xMzMsMTEuNDg2YzAuMDAzLTAuMDI1LDAuMDA3LTAuMDUsMC4wMS0wLjA3NWMwLjI3Ni0xLjkwOCwxLjc5OS0zLjMxLDMuNzAzLTMuNDA3IGMxLjE3Ni0wLjA4MiwyLjM1MiwwLjA2LDMuNDc2LDAuNDA0QzIzLjIzMSw1My40NjgsMjIsNDkuODc1LDIyLDQ2di0yYzAtNC4yMzcsMS4yNDUtOC4yNzIsMy42MTUtMTEuNzU2IEMyNS4yMDMsMjkuOTEyLDI1LjIxOSwyNy40OTMsMjUuNjYxLDI1LjEwOHoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzBmZDJmZiIgZD0iTTU3LDgyLjgyNmMtMC40NDIsMC0wLjg0Ny0wLjI5Ni0wLjk2Ni0wLjc0M2MtMC4xNDItMC41MzQsMC4xNzYtMS4wODIsMC43MS0xLjIyNCBDNzEuNjE0LDc2LjkxMyw4Miw2My40LDgyLDQ4YzAtMTguNzQ4LTE1LjI1Mi0zNC0zNC0zNFMxNCwyOS4yNTIsMTQsNDhjMCwxNC45NjIsOS44MDUsMjguMTQzLDI0LDMyLjV2LTguMTE0IGMtMC4yNTIsMC4wNTQtMC40OSwwLjA5MS0wLjcwOSwwLjExMWMtMi44NzEsMC40NzktNS44MS0wLjEyNC04LjIwNi0xLjcwMWMtMS42ODUtMS4xMTMtMi45NzEtMi42NDctMy42MjUtNC4zMjIgYy0wLjA4OC0wLjIxMi0wLjE3OS0wLjQ1My0wLjI3MS0wLjY5NmMtMC4xNTQtMC40MS0wLjI5OS0wLjc5OC0wLjQ3Mi0xLjEzYy0wLjY0Ni0xLjM0NC0xLjg2NC0yLjM3NS0zLjI3MS0yLjc4OSBjLTAuOTM4LTAuMzI4LTEuNDYyLTEuMjExLTEuMzI0LTIuMTYxYzAuMTM3LTAuOTUsMC44ODgtMS42NDcsMS44MjYtMS42OTZjMy4zOTQtMC4yNDYsNi43MjcsMS44NjgsOC40NzcsNS4zNzUgYzAuNjI3LDEuNDY3LDIuMDE4LDIuNDA0LDMuNjU0LDIuNTAzYzEuMzgsMC4xNzIsMi44MzItMC4yMTcsNC0xLjA0OGMwLjEzLTEuMDAzLDAuNDI3LTEuOTY5LDAuODc4LTIuODY0IEMzMC42MTksNjEuNDI3LDI0LDU0LjQ3MiwyNCw0NnYtMmMwLTQuMTA2LDEuMjkzLTguMDAzLDMuNzQ2LTExLjMwMmMtMC40OC0yLjEzMS0wLjc1OS01LjI5MSwwLjI5My04Ljk3MyBjMC4xMDktMC4zODEsMC40MzItMC42NjIsMC44MjQtMC43MTZjMC4xODctMC4wMyw0LjUwNC0wLjU3Niw4LjQ3OSwyLjg2N0MzOS4xOTgsMjUuMjk1LDQxLjA5OSwyNSw0MywyNWMwLjU1MiwwLDEsMC40NDcsMSwxIHMtMC40NDgsMS0xLDFjLTEuODcyLDAtMy43NDYsMC4zMjEtNS41NzEsMC45NTNjLTAuMzUyLDAuMTIzLTAuNzQ2LDAuMDM5LTEuMDE3LTAuMjJjLTIuNTgzLTIuNDU3LTUuMzktMi43NzEtNi42MzEtMi43NzMgYy0wLjc4MiwzLjIzNS0wLjQzNSw1Ljk1OSwwLjAxNyw3LjcxOGMwLjA3NywwLjMwMSwwLjAxLDAuNjIxLTAuMTgxLDAuODY1QzI3LjI1LDM2LjU2NiwyNiw0MC4xODMsMjYsNDR2MmMwLDcuNzIsNi4yOCwxNCwxNCwxNCBoMC43NmMwLjM4NSwwLDAuNzM1LDAuMjIxLDAuOTAxLDAuNTY3YzAuMTY3LDAuMzQ3LDAuMTE5LDAuNzU5LTAuMTIyLDEuMDU5Yy0wLjg4LDEuMDk4LTEuNDA0LDIuNDE3LTEuNTE1LDMuODE2IGMtMC4wMjEsMC4yNzEtMC4xNTMsMC41MjItMC4zNjMsMC42OTRjLTEuNjU4LDEuMzU3LTMuNzYyLDEuOTg2LTUuNzY5LDEuNzMyYy0yLjMzMS0wLjEzOC00LjM4LTEuNTQtNS4yODItMy42NTQgYy0xLjAyOC0yLjA1Ny0zLjM3OS00LjQzNy02LjUzOS00LjIxOGMxLjg4MSwwLjUxNCwzLjU2MiwxLjkzOCw0LjQzNSwzLjc1NGMwLjIxNSwwLjQxMiwwLjM4OSwwLjg3NiwwLjU1OCwxLjMyNCBjMC4wODMsMC4yMjEsMC4xNjUsMC40MzksMC4yNTIsMC42NWMwLjUxMywxLjMxNCwxLjUyOSwyLjUxNSwyLjg3MSwzLjQwMWMxLjk3MywxLjI5OSw0LjQwNywxLjc5Miw2Ljg1LDEuMzg4IGMwLjQ3Ni0wLjA0NywxLjAyOC0wLjE4NSwxLjYyNi0wLjM5OWMwLjMwNS0wLjEwOSwwLjY0Ni0wLjA2MywwLjkxMywwLjEyNEMzOS44NDIsNzAuNDI2LDQwLDcwLjczMSw0MCw3MS4wNTd2MTAuNzcgYzAsMC4zMTEtMC4xNDQsMC42MDQtMC4zOSwwLjc5M3MtMC41NjcsMC4yNTQtMC44NjYsMC4xNzRDMjIuOTk3LDc4LjYxMywxMiw2NC4zMDcsMTIsNDhjMC0xOS44NTEsMTYuMTQ5LTM2LDM2LTM2IHMzNiwxNi4xNDksMzYsMzZjMCwxNi4zMDctMTAuOTk3LDMwLjYxMy0yNi43NDQsMzQuNzkzQzU3LjE3LDgyLjgxNSw1Ny4wODQsODIuODI2LDU3LDgyLjgyNnoiLz48Zz48cGF0aCBmaWxsPSIjMGZkMmZmIiBkPSJNNTcsODMuODI2Yy0xLjEwNCwwLTItMC44OTYtMi0yVjY2YzAtMS4zNzYtMC40NTctMi42NzItMS4zMi0zLjc0OCBjLTAuNDgxLTAuNjAxLTAuNTc2LTEuNDI0LTAuMjQzLTIuMTE3QzUzLjc3LDU5LjQ0MSw1NC40Nyw1OSw1NS4yNCw1OUg1NmM3LjE2OCwwLDEzLTUuODMyLDEzLTEzdi0yIGMwLTMuNDYzLTEuMTA2LTYuNzcxLTMuMTk4LTkuNTY1Yy0wLjM3Mi0wLjQ5Ni0wLjQ5Mi0xLjEzNy0wLjMyNi0xLjczNGMwLjQzMi0xLjU1MiwwLjc4My0zLjg5LDAuMjU3LTYuNjk0IGMtMS4yODUsMC4xNDQtMy4zMjMsMC42ODMtNS4yMTcsMi41MjFjLTAuNTQ5LDAuNTM0LTEuMzU0LDAuNzA4LTIuMDc1LDAuNDQ1QzU2LjY2NCwyOC4zMjcsNTQuODMzLDI4LDUzLDI4aC0yLjUgYy0xLjEwNCwwLTItMC44OTYtMi0yczAuODk2LTIsMi0ySDUzYzEuOTA1LDAsMy44MDMsMC4yNzksNS42NTksMC44MzNjNC4yMi0zLjQxOCw4LjcyNi0yLjgzOSw4LjkyOS0yLjgxNCBjMC43ODQsMC4xMDksMS40MzEsMC42NzEsMS42NDgsMS40MzJjMS4wODMsMy43OTMsMC44MzcsNy4wNjcsMC4zMyw5LjM3NUM3MS44MTUsMzYuMTQ1LDczLDM5Ljk4Nyw3Myw0NHYyIGMwLDguNTMzLTYuMzE5LDE1LjYxNy0xNC41MjMsMTYuODJDNTguODIsNjMuODQsNTksNjQuOTE1LDU5LDY2djE1LjgyNkM1OSw4Mi45MzEsNTguMTA0LDgzLjgyNiw1Nyw4My44MjZ6IiBvcGFjaXR5PSIuMyIvPjxwYXRoIGZpbGw9IiMwZmQyZmYiIGQ9Ik01Nyw4NC44MjZjLTEuNjU3LDAtMy0xLjM0My0zLTNWNjZjMC0xLjE0Ni0wLjM4LTIuMjI2LTEuMS0zLjEyMyBjLTAuNzIyLTAuODk5LTAuODY0LTIuMTM1LTAuMzY1LTMuMTc1QzUzLjAzNCw1OC42NjIsNTQuMDg2LDU4LDU1LjI0LDU4SDU2YzYuNjE3LDAsMTItNS4zODMsMTItMTJ2LTIgYzAtMy4yNDUtMS4wMzctNi4zNDYtMi45OTktOC45NjZjLTAuNTU4LTAuNzQ0LTAuNzM4LTEuNzA1LTAuNDg5LTIuNjAyYzAuMzUxLTEuMjYyLDAuNjQ0LTMuMDgxLDAuMzg3LTUuMjY0IGMtMS4wNjMsMC4yNjMtMi40MTEsMC44MzctMy42ODcsMi4wNzVjLTAuODI1LDAuOC0yLjAzMywxLjA2LTMuMTEzLDAuNjY4QzU2LjQzMiwyOS4zMDcsNTQuNzE2LDI5LDUzLDI5aC0yLjUgYy0xLjY1NywwLTMtMS4zNDMtMy0zczEuMzQzLTMsMy0zSDUzYzEuODMyLDAsMy42NTYsMC4yNDYsNS40NDUsMC43MzJjNC40MzYtMy4zMjYsOS4wNjQtMi43MzIsOS4yOC0yLjcwNCBjMS4xNzcsMC4xNjMsMi4xNDYsMS4wMDYsMi40NzMsMi4xNDdjMS4wNzUsMy43NjMsMC45MDMsNy4wNDQsMC40MzIsOS40NDRDNzIuODM5LDM2LjAyMiw3NCwzOS45MjgsNzQsNDR2MiBjMCw4LjY0Ni02LjEyNiwxNS44ODctMTQuMjY1LDE3LjYxQzU5LjkxLDY0LjM5Miw2MCw2NS4xOTMsNjAsNjZ2MTUuODI2QzYwLDgzLjQ4Myw1OC42NTcsODQuODI2LDU3LDg0LjgyNnoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzBmZDJmZiIgZD0iTTU3LDgyLjgyNmMtMC41NTIsMC0xLTAuNDQ3LTEtMVY2NmMwLTEuNjA1LTAuNTMzLTMuMTE4LTEuNTQtNC4zNzQgYy0wLjI0MS0wLjMtMC4yODgtMC43MTItMC4xMjItMS4wNTlDNTQuNTA0LDYwLjIyMSw1NC44NTUsNjAsNTUuMjQsNjBINTZjNy43MiwwLDE0LTYuMjgsMTQtMTR2LTIgYzAtMy42ODEtMS4xNzUtNy4xOTUtMy4zOTctMTAuMTY0Yy0wLjE4Ni0wLjI0OC0wLjI0Ni0wLjU2OC0wLjE2My0wLjg2N2MwLjUwNS0xLjgxNywwLjkwOC00LjYzOCwwLjA5Mi04LjAxIGMtMS4yNTEsMC4wMDMtNC4xMDUsMC4zMi02LjcxMSwyLjg1MWMtMC4yNzUsMC4yNjYtMC42NzksMC4zNTMtMS4wMzgsMC4yMjNDNTYuODk1LDI3LjM0Nyw1NC45NSwyNyw1MywyN2gtMi41IGMtMC41NTIsMC0xLTAuNDQ3LTEtMXMwLjQ0OC0xLDEtMUg1M2MxLjk4MywwLDMuOTU5LDAuMzE5LDUuODg0LDAuOTUxYzMuOTk4LTMuNTI2LDguMzc1LTIuOTcsOC41NjYtMi45NDEgYzAuMzkzLDAuMDU0LDAuNzE1LDAuMzM1LDAuODI0LDAuNzE2YzEuMDk2LDMuODM2LDAuNzU4LDcuMTA3LDAuMjE2LDkuMzA1QzcwLjc4OCwzNi4yNjQsNzIsNDAuMDQ1LDcyLDQ0djIgYzAsOC40NzMtNi42MiwxNS40MjktMTQuOTU5LDE1Ljk2N0M1Ny42NjYsNjMuMjEzLDU4LDY0LjU5OCw1OCw2NnYxNS44MjZDNTgsODIuMzc5LDU3LjU1Miw4Mi44MjYsNTcsODIuODI2eiIvPjwvZz48L3N2Zz4="
              />{" "}</a>
              <a href="https://www.linkedin.com/in/vaishnavi-kulbhaje/" target="_blank">
              <img
                alt="svgImg"
                className="h-14 w-14  lg:h-17 lg:w-17 md:h-17 md:w-17 hover:transition-all hover:scale-125 duration-500 ease-in-out"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIGJhc2VQcm9maWxlPSJiYXNpYyI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgcj0iMyIgZmlsbD0iIzAwYTRmZiIvPjxwYXRoIGZpbGw9IiMxNmQ2ZmEiIGQ9Ik0zNy43MTgsNDdIMTIuMjgyQzcuMTY0LDQ3LDMsNDIuODM2LDMsMzcuNzE4VjEyLjI4MkMzLDcuMTY0LDcuMTY0LDMsMTIuMjgyLDNoMjUuNDM2CUM0Mi44MzYsMyw0Nyw3LjE2NCw0NywxMi4yODJ2MjUuNDM2QzQ3LDQyLjgzNiw0Mi44MzYsNDcsMzcuNzE4LDQ3eiBNMTIuMjgyLDdDOS4zNjksNyw3LDkuMzY5LDcsMTIuMjgydjI1LjQzNglDNyw0MC42MzEsOS4zNjksNDMsMTIuMjgyLDQzaDI1LjQzNkM0MC42MzEsNDMsNDMsNDAuNjMxLDQzLDM3LjcxOFYxMi4yODJDNDMsOS4zNjksNDAuNjMxLDcsMzcuNzE4LDdIMTIuMjgyeiIvPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjE5IiB4PSIxMiIgeT0iMTkiIGZpbGw9IiMxNmQ2ZmEiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxOSIgeD0iMjEiIHk9IjE5IiBmaWxsPSIjMTZkNmZhIi8+PHBhdGggZmlsbD0iIzE2ZDZmYSIgZD0iTTM4LDM4aC00VjI3LjVjMC0xLjA1Ni0wLjI1Mi00LjUtMy41LTQuNWMtMi40NjgsMC01LjUsMy4wMzItNS41LDUuNVYzOGgtNHYtOS41CWMwLTQuNzA2LDQuNzk0LTkuNSw5LjUtOS41YzQuNDE2LDAsNy41LDMuNDk1LDcuNSw4LjVWMzh6Ii8+PC9zdmc+"
              />
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
   
  );
};


export default Mhome;
