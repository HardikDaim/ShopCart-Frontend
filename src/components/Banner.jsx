import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Banner = ({ loader }) => {
  const [isMuted, setIsMuted] = useState(true); // Start with audio muted
  const [isPlaying, setIsPlaying] = useState(true); // Control video playback based on scroll
  const videoRef = useRef(null);
  const bannerRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Load mute state from localStorage on component mount
  useEffect(() => {
    const savedMuteState = localStorage.getItem("isMuted");
    if (savedMuteState !== null) {
      setIsMuted(JSON.parse(savedMuteState)); // Set to saved mute state
    }
  }, []);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState); // Toggle mute state
    localStorage.setItem("isMuted", JSON.stringify(newMuteState)); // Save mute state to localStorage
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        // Ensure the video plays automatically when it's in view
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Autoplay was prevented:", error);
          });
        }
      } else {
        // Pause the video when it goes out of view
        video.pause();
      }
    }
  }, [isPlaying]); // Ensure the video starts or pauses when the `isPlaying` state changes

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true); // Start playing when 10% of the banner is visible
        } else {
          setIsPlaying(false); // Pause when less than 10% is visible
        }
      },
      { threshold: 0.1 } // Adjusted threshold for earlier triggering
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div className="mx-2 md:mx-4 mt-2 md:mt-4">
      <div
        ref={bannerRef}
        className="relative h-56 sm:h-80 md:h-[500px] lg:h-[600px] xl:h-[550px] 2xl:h-[640px] w-full overflow-hidden rounded-lg"
      >
        {loader ? (
          <Skeleton
            height="100%"
            width="100%"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        ) : (
          <>
            {!isVideoReady && (
              <img
                src="/images/banner-image.jpg" // Your fallback banner image
                alt="Banner"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            )}
            <video
              ref={videoRef}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover rounded-lg ${
                isVideoReady ? "" : "hidden"
              }`}
              src="/videos/banner.mp4"
              loop
              muted={isMuted}
              autoPlay // Ensure autoplay on load
              onCanPlay={() => setIsVideoReady(true)} // Set video as ready when it can play
            />
          </>
        )}
        <div
          className={`${
            isVideoReady
              ? "absolute top-0 left-0 w-full h-full flex items-end justify-center rounded-lg"
              : "hidden"
          }`}
        >
          <div className="text-center p-4 md:p-8">
            {!loader && (
              <Link
                to="/shops"
                type="button"
                className="p-2 md:px-6 md:py-3 mt-4 text-[8px] md:text-xs rounded-tr rounded-bl rounded-lg bg-gradient-to-tr from-blue-500 to-blue-700 xl:hover:from-red-500 xl:hover:to-red-700 text-white font-semibold transition-colors duration-300"
              >
                Shop Now
              </Link>
            )}
          </div>
        </div>
        {!loader && (
          <button
            onClick={toggleMute}
            className="absolute top-2 md:top-4 right-2 md:right-4 p-2 bg-transparent text-xs md:text-sm border md:border-2 border-white text-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-900 focus:outline-none transition duration-300"
          >
            {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
