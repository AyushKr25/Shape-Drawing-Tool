import { useEffect, useRef } from 'react';
import { Shape } from '@/com/shapes/basic/Shape';
import { CanvasManager } from '@/com/shapes/advanced/CanvasManager';
import { Grid3X3 } from 'lucide-react';

interface CanvasPreviewProps {
  shapes: Shape[];
  selectedShapeId: string | null;
  onSelectShape: (id: string | null) => void;
}

export function CanvasPreview({ shapes, selectedShapeId, onSelectShape }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<CanvasManager | null>(null);

  useEffect(() => {
    if (canvasRef.current && !managerRef.current) {
      managerRef.current = new CanvasManager();
      managerRef.current.attachElement(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (managerRef.current) {
      managerRef.current.setScale(2);
      managerRef.current.render(shapes);
    }
  }, [shapes]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && managerRef.current) {
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          managerRef.current.resize(rect.width, rect.height);
          managerRef.current.render(shapes);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [shapes]);

  return (
    <div className="card-blueprint h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Grid3X3 className="w-4 h-4 text-primary" />
          Canvas Preview
        </h3>
        <span className="text-xs text-muted-foreground font-mono">
          {shapes.length} shape{shapes.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="flex-1 relative min-h-[300px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-b-lg"
          style={{ background: '#0a1628' }}
        />
        
        {shapes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No shapes yet. Click "Draw" to add one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
