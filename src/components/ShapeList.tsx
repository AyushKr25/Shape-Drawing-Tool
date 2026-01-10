import { Shape } from '@/com/shapes/basic/Shape';
import { Square, Triangle, Circle, Hexagon, Trash2 } from 'lucide-react';

interface ShapeListProps {
  shapes: Shape[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  rectangle: <Hexagon className="w-4 h-4" />,
  square: <Square className="w-4 h-4" />,
  triangle: <Triangle className="w-4 h-4" />,
  circle: <Circle className="w-4 h-4" />
};

export function ShapeList({ shapes, selectedId, onSelect, onDelete }: ShapeListProps) {
  if (shapes.length === 0) {
    return null;
  }

  return (
    <div className="card-blueprint p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Shapes ({shapes.length})
      </h3>
      
      <div className="space-y-2 max-h-48 overflow-auto">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`
              flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all
              ${selectedId === shape.id
                ? 'bg-primary/20 border border-primary'
                : 'bg-secondary/30 border border-transparent hover:border-border'
              }
            `}
            onClick={() => onSelect(shape.id)}
          >
            <div className="flex items-center gap-2">
              <span className={selectedId === shape.id ? 'text-primary' : 'text-muted-foreground'}>
                {typeIcons[shape.type]}
              </span>
              <span className="text-sm capitalize">{shape.type}</span>
              <span className="text-xs text-muted-foreground font-mono">
                #{shape.id.slice(-4)}
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(shape.id);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
