import React, { useRef, useEffect } from 'react';

export const SineGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up properties of the wave
    const amplitude = 100; // Height of the wave
    const frequency = 0.01; // Frequency of the wave
    const phaseShift = 0; // Phase shift of the wave

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(20, canvas.height - 20);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw the wave
    ctx.beginPath();
    ctx.moveTo(20, canvas.height / 2);
    for (let x = 20; x < canvas.width; ) {
      const y =
        amplitude * Math.sin(frequency * x + phaseShift) + canvas.height / 2;
      x += 1;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw x-axis labels
    const xInterval = 100; // Interval between x-axis labels
    for (let x = 20; x <= canvas.width; x += xInterval) {
      ctx.fillText((x - 20).toString(), x, canvas.height);
    }

    // Draw y-axis labels
    const yInterval = 50; // Interval between y-axis labels
    for (let y = 0; y <= canvas.height - 20; y += yInterval) {
      ctx.fillText((y - canvas.height / 2).toString(), 0, y);
    }
  }, []);

  return <canvas ref={canvasRef} width="800" height="400" />;
};
