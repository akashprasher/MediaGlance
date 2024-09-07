import React, { useState, useEffect, useRef } from 'react';

// Replace with your SVG imports
import {
  ZoomInIcon,
  ZoomOutIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ResetIcon,
  DownloadIcon,
  NextPageIcon,
  PreviousPageIcon,
  CloseIcon,
} from '../assets/icons/';

interface PDFPreviewProps {
  src: string; // PDF URL or file
  onClose?: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ src, onClose }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pdf, setPdf] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [textContent, setTextContent] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        setPdf(new Uint8Array(arrayBuffer));
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    fetchPDF();
  }, [src]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPage = async (pageNum: number) => {
      try {
        const pdfjsLib = (window as any).pdfjsLib; // Access global PDF.js library
        if (!pdfjsLib) {
          console.error('pdfjsLib is not available');
          return;
        }

        const pdfDoc = await pdfjsLib.getDocument({ data: pdf }).promise;
        setNumPages(pdfDoc.numPages);

        const page = await pdfDoc.getPage(pageNum + 1);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };
        await page.render(renderContext).promise;

        // Extract text content
        const textContent = await page.getTextContent();
        setTextContent(
          textContent.items.map((item: any) => item.str).join(' '),
        );
      } catch (error) {
        console.error('Error rendering page:', error);
      }
    };

    renderPage(pageIndex);
  }, [pdf, pageIndex, scale, rotation]);

  const handleZoomIn = () =>
    setScale((prevScale) => Math.min(prevScale * 1.2, 5));
  const handleZoomOut = () =>
    setScale((prevScale) => Math.max(prevScale * 0.8, 0.5));
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };
  const handleRotateLeft = () =>
    setRotation((prevRotation) => prevRotation - 90);
  const handleRotateRight = () =>
    setRotation((prevRotation) => prevRotation + 90);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'document.pdf';
    link.click();
  };
  const handleNextPage = () =>
    setPageIndex((prevPage) => Math.min(prevPage + 1, numPages - 1));
  const handlePreviousPage = () =>
    setPageIndex((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className="pdf-preview fixed inset-0 z-50 flex flex-col justify-center items-center h-screen w-screen">
      <canvas
        ref={canvasRef}
        style={{
          width: 'auto',
          height: '95vh',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
      />
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
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-white p-3 rounded-full opacity-90 space-y-2">
        <div className="flex space-x-2 items-center">
          <button
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
            className={`p-2 ${pageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PreviousPageIcon height={16} width={16} color="black" />
          </button>
          <span>
            Page {pageIndex + 1} of {numPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageIndex >= numPages - 1}
            className={`p-2 ${pageIndex >= numPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <NextPageIcon height={16} width={16} color="black" />
          </button>
        </div>
        <div className="flex space-x-2 items-center">
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
          <button onClick={handleDownload}>
            <DownloadIcon height={16} width={16} color="black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
