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
    <div ref={bannerRef} className="relative h-96 w-full overflow-hidden rounded-lg">
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
          src="/videos/banner.mov"
          loop
          muted={isMuted}
          autoPlay // Ensure autoplay on load
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
          className="absolute top-4 right-4 p-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-900 focus:outline-none transition duration-300"
        >
          {isMuted ? <IoVolumeMuteOutline /> : <VscUnmute />}
        </button>
      )}
    </div>
  );
};

export default Banner;
