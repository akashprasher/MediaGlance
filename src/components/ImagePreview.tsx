import React, { useState } from 'react';
import {
  ZoomInIcon,
  ZoomOutIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ResetIcon,
  CloseIcon,
} from '../assets/icons/';

interface ImagePreviewProps {
  src: string;
  alt: string;
  onClose?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0); // State for rotation

  const handleZoomIn = () =>
    setScale((prevScale) => Math.min(prevScale * 1.2, 5));
  const handleZoomOut = () =>
    setScale((prevScale) => Math.max(prevScale * 0.8, 0.5));
  const handleReset = () => {
    setScale(1);
    setRotation(0); // Reset rotation
  };

  const handleRotateLeft = () =>
    setRotation((prevRotation) => prevRotation - 90);
  const handleRotateRight = () =>
    setRotation((prevRotation) => prevRotation + 90);

  return (
    <div
      className={`image-preview ${'fixed inset-0 z-50 flex flex-col justify-center items-center h-screen w-screen'}`}
    >
      <div className={`relative ${'w-full h-full overflow-hidden'}`}>
        <div className="overflow-hidden w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <img
            src={src}
            alt={alt}
            className={`transform transition-transform duration-200`}
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`, // Apply rotation
              width: 'auto',
              height: '95vh',
            }}
          />
        </div>
      </div>
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white cursor-pointer bg-black bg-opacity-50 rounded-full p-1 hover:bg-white hover:bg-opacity-100"
        >
          <CloseIcon
            height={20}
            width={20}
            color="white"
            className="hover:text-black"
          />
        </button>
      )}
      {/* Controls */}
      <div
        className={
          'fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center space-x-8 bg-white p-3 rounded-full opacity-90'
        }
      >
        <button onClick={handleZoomIn}>
          <ZoomInIcon height={16} width={16} color="black" />
        </button>
        <button onClick={handleZoomOut}>
          <ZoomOutIcon height={16} width={16} color="black" />
        </button>
        <button onClick={handleRotateLeft}>
          <RotateLeftIcon height={16} width={16} color="black" />
        </button>
        <button onClick={handleRotateRight}>
          <RotateRightIcon height={16} width={16} color="black" />
        </button>
        <button onClick={handleReset}>
          <ResetIcon height={16} width={16} color="black" />
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
