import { useRef } from "react";
import {video} from '../assets'

const VideoComponent = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video on mouse leave
    }
  };

  return (
    <video
      ref={videoRef}
      src={video} // Place your video inside public/ or use an import
      muted
      className=" w-80 h-50 rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default VideoComponent;
