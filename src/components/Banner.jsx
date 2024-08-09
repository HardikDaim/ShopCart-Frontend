import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Banner = ({ loader }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const video = videoRef.current;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg">
    {loader ? (
      <Skeleton
        height="100%"
        width="100%"
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    ) : (
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover rounded-lg"
        src="/videos/banner.mp4"
        autoPlay
        loop
        muted={isMuted}
      />
    )}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60 flex items-end justify-center rounded-lg dark:from-black/80 dark:via-transparent dark:to-black/80">
      <div className="text-center p-4 md:p-8">
        {!loader && (
          <Link
            to="/shops"
            type="button"
            className="p-2 md:px-6 md:py-3 mt-4 text-xs rounded-lg bg-blue-600 text-white font-semibold hover:bg-red-700 transition duration-300 hover:-translate-y-1 hover:scale-105 dark:bg-blue-600 dark:hover:bg-red-600"
          >
            Shop Now
          </Link>
        )}
      </div>
    </div>
    {!loader && (
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-transparent border-2 border-white text-white rounded-full focus:outline-none transition duration-300"
      >
        {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
      </button>
    )}
  </div>
  );
};

export default Banner;
