import { useState } from 'react';
import { Square, Triangle, Circle, Hexagon } from 'lucide-react';
import { ShapeType } from '@/com/shapes/basic/Shape';
import { ShapeFactory } from '@/com/shapes/advanced/ShapeFactory';

interface ShapeSelectorProps {
  selectedType: ShapeType;
  onSelect: (type: ShapeType) => void;
}

const shapeIcons: Record<ShapeType, React.ReactNode> = {
  rectangle: <Hexagon className="w-6 h-6" />,
  square: <Square className="w-6 h-6" />,
  triangle: <Triangle className="w-6 h-6" />,
  circle: <Circle className="w-6 h-6" />
};

export function ShapeSelector({ selectedType, onSelect }: ShapeSelectorProps) {
  const types = ShapeFactory.getTypes();

  return (
    <div className="card-blueprint p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Select Shape
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200
              ${selectedType === type
                ? 'bg-primary/20 border-2 border-primary glow-cyan text-primary'
                : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary hover:border-border text-foreground'
              }
            `}
          >
            {shapeIcons[type]}
            <span className="text-xs font-medium capitalize">{type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
