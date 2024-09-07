import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import './styles/index.css';

import {
  AudioPreview,
  ImagePreview,
  PDFPreview,
  VideoPreview,
} from './components';
// import PDFPreview from './components/PDFPreview';

// Export components for use in other projects
export { ImagePreview, VideoPreview, AudioPreview, PDFPreview };

// Optional: Render a demo component locally for testing purposes
const Demo = () => (
  <div>
    {/* <h1>MediaGlance Demo</h1> */}
    {/* <ImagePreview
      src="https://images.unsplash.com/photo-1724141973274-f3a90b9aa7d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Sample Image"
      onClose={() => console.log('closed')}
    /> */}
    {/* <VideoPreview src="https://example.com/video.mp4" /> */}
    {/* <AudioPreview src="https://example.com/audio.mp3" /> */}
    <PDFPreview src="https://pdfobject.com/pdf/sample.pdf" />
  </div>
);

// Render the demo component if this script is run directly
if (process.env.NODE_ENV === 'development') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Demo />);
  }
}
