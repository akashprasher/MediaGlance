import React from 'react';

interface AudioPreviewProps {
  src: string;
  controls?: boolean;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({
  src,
  controls = true,
}) => (
  <div className="audio-preview">
    <audio src={src} controls={controls} />
  </div>
);

export default AudioPreview;
