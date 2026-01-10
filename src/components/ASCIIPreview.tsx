import { Shape } from '@/com/shapes/basic/Shape';
import { Terminal } from 'lucide-react';

interface ASCIIPreviewProps {
  shape: Shape | null;
}

export function ASCIIPreview({ shape }: ASCIIPreviewProps) {
  return (
    <div className="card-blueprint h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <Terminal className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          ASCII Preview
        </h3>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {shape ? (
          <pre className="ascii-output">{shape.drawASCII()}</pre>
        ) : (
          <p className="text-muted-foreground text-sm">
            Select a shape to see ASCII preview
          </p>
        )}
      </div>
    </div>
  );
}
