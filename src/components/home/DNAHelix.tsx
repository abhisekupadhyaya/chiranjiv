import { useEffect, useRef } from 'react';

export function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helix Configuration
    const particleCount = 45;
    const helixRadius = 100; // Radius of the helix tube
    // const helixLength = 800; // Unused variable
    const rotationSpeed = 0.02; // Speed of the helix spinning on its own axis
    
    // Additional axes rotation speeds
    const rotateZSpeed = 0.005; // Slow tilt/rotation in screen plane

    // Theme Colors
    const colorStrand1 = 'rgba(85, 133, 86, 0.8)'; // Primary
    const colorStrand2 = 'rgba(46, 139, 187, 0.8)'; // Secondary
    const colorConnection = 'rgba(94, 155, 153, 0.3)'; // Accent

    const render = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Update time
      time += 1;

      const angleY = time * rotationSpeed;
      const angleZ = time * rotateZSpeed + Math.PI / 6; // Initial tilt + rotation

      // Pre-calculate rotation matrices terms
      const cz = Math.cos(angleZ), sz = Math.sin(angleZ);

      // Draw Particles
      for (let i = 0; i < particleCount; i++) {
        const iNorm = i / particleCount; // 0 to 1
        
        // Base Helix Generation (Vertical along Y)
        const helixAngle = (iNorm * Math.PI * 6) + angleY;
        const baseY = (iNorm * 600) - 300; // Centered vertically, range -300 to 300
        const baseX1 = Math.cos(helixAngle) * helixRadius;
        const baseZ1 = Math.sin(helixAngle) * helixRadius;
        
        const baseX2 = Math.cos(helixAngle + Math.PI) * helixRadius;
        const baseZ2 = Math.sin(helixAngle + Math.PI) * helixRadius;

        // Function to apply 3D rotation (only Z) to a point
        const rotatePoint = (x: number, y: number, z: number) => {
            // Rotate around Z
            // x' = x*cz - y*sz
            // y' = x*sz + y*cz
            // z' = z (no change)
            const x1 = x * cz - y * sz;
            const y1 = x * sz + y * cz;
            const z1 = z;

            return { x: x1, y: y1, z: z1 };
        };

        const p1 = rotatePoint(baseX1, baseY, baseZ1);
        const p2 = rotatePoint(baseX2, baseY, baseZ2);

        // Perspective Projection
        const perspective = 400;
        
        const scale1 = perspective / (perspective + p1.z);
        const scale2 = perspective / (perspective + p2.z);

        const projX1 = centerX + p1.x * scale1;
        const projY1 = centerY + p1.y * scale1;
        
        const projX2 = centerX + p2.x * scale2;
        const projY2 = centerY + p2.y * scale2;

        // Draw Connection
        ctx.beginPath();
        ctx.moveTo(projX1, projY1);
        ctx.lineTo(projX2, projY2);
        ctx.strokeStyle = colorConnection;
        ctx.lineWidth = 1 * Math.min(scale1, scale2);
        ctx.stroke();

        // Draw Strand 1
        const size1 = 4 * scale1;
        ctx.beginPath();
        ctx.arc(projX1, projY1, Math.max(0, size1), 0, Math.PI * 2);
        ctx.fillStyle = colorStrand1;
        ctx.globalAlpha = Math.max(0.1, scale1 * 0.5); 
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw Strand 2
        const size2 = 4 * scale2;
        ctx.beginPath();
        ctx.arc(projX2, projY2, Math.max(0, size2), 0, Math.PI * 2);
        ctx.fillStyle = colorStrand2;
        ctx.globalAlpha = Math.max(0.1, scale2 * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ opacity: 0.6, filter: 'blur(1px)' }} 
    />
  );
}
