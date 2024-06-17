import React, { useState,useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const video = videoRef.current;

    // Start playing the video when component mounts
    const playPromise = video.play();

    // Handle autoplay policy restrictions
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Autoplay was prevented:', error);
        // Fall back to showing a play button or informing the user
      });
    }

    // Cleanup: Pause the video when component unmounts
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);


  // const slides = ["/images/1.jpg", "/images/2.jpg"];

  // const handlePrev = () => {
  //   setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // };

  // const handleNext = () => {
  //   setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="relative h-96 lg:h-[600px] w-full overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover rounded-lg"
        src="/videos/banner.mp4"
        autoPlay
        loop
        muted={isMuted}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60 flex items-end justify-center rounded-lg dark:from-black/80 dark:via-transparent dark:to-black/80">
        <div className="text-center p-4 md:p-8">
          <Link
            to="/shops"
            type="button"
            className="px-8 py-3 mt-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-red-700 transition duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-blue-600 dark:hover:bg-red-600"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-transparent  border-2 border-white text-white rounded-full focus:outline-none  transition duration-300"
      >
        {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
      </button>
    </div>
  
    </>

    //   <div className="relative w-full lg:my-4" data-carousel="slide">
    //     {/* Carousel wrapper */}
    //     <div className="relative h-40 md:h-80 lg:h-96 overflow-hidden rounded-lg">
    //       {slides.map((slide, index) => (
    //         <div
    //           key={index}
    //           className={`absolute block w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
    //           data-carousel-item
    //         >
    //           <img src={slide} className="w-full" alt={`Slide ${index + 1}`} />
    //         </div>
    //       ))}
    //     </div>

    //     {/* Slider indicators */}
    //     <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
    //       {slides.map((_, index) => (
    //         <button
    //           key={index}
    //           type="button"
    //           className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-slate-400'}`}
    //           aria-current={currentSlide === index ? "true" : "false"}
    //           aria-label={`Slide ${index + 1}`}
    //           onClick={() => setCurrentSlide(index)}
    //           data-carousel-slide-to={index}
    //         ></button>
    //       ))}
    //     </div>

    //     {/* Slider controls */}
    //     <button
    //       type="button"
    //       className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //       onClick={handlePrev}
    //       data-carousel-prev
    //     >
    //       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-slate-800/30 group-hover:bg-white/50 dark:group-hover:bg-slate-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-slate-800/70 group-focus:outline-none">
    //         <svg
    //           className="w-4 h-4 text-white dark:text-slate-800 rtl:rotate-180"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 6 10"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M5 1 1 5l4 4"
    //           />
    //         </svg>
    //         <span className="sr-only">Previous</span>
    //       </span>
    //     </button>
    //     <button
    //       type="button"
    //       className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //       onClick={handleNext}
    //       data-carousel-next
    //     >
    //       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-slate-800/30 group-hover:bg-white/50 dark:group-hover:bg-slate-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-slate-800/70 group-focus:outline-none">
    //         <svg
    //           className="w-4 h-4 text-white dark:text-slate-800 rtl:rotate-180"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 6 10"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="m1 9 4-4-4-4"
    //           />
    //         </svg>
    //         <span className="sr-only">Next</span>
    //       </span>
    //     </button>
    //   </div>
  );
};

export default Banner;
