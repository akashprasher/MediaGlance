import React from 'react';

interface VideoPreviewProps {
  src: string;
  controls?: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  src,
  controls = true,
}) => (
  <div className="video-preview">
    <video src={src} controls={controls} style={{ maxWidth: '100%' }} />
  </div>
);

export default VideoPreview;
