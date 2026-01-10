import { Shape, Unit, UnitConverter } from '@/com/shapes/basic/Shape';
import { Ruler, CircleDot } from 'lucide-react';

interface CalculationResultsProps {
  shape: Shape | null;
  unit: Unit;
}

export function CalculationResults({ shape, unit }: CalculationResultsProps) {
  if (!shape) {
    return (
      <div className="card-blueprint p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          Calculations
        </h3>
        <p className="text-muted-foreground text-sm">
          Draw or select a shape to see calculations
        </p>
      </div>
    );
  }

  const { area, perimeter } = shape.calc(unit);

  return (
    <div className="card-blueprint p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Calculations
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Area</span>
          </div>
          <span className="font-mono text-primary glow-text">
            {UnitConverter.format(area, unit === 'cm' ? 'cm' : unit === 'm' ? 'm' : 'inch')}²
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Perimeter</span>
          </div>
          <span className="font-mono text-primary glow-text">
            {UnitConverter.format(perimeter, unit)}
          </span>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p className="capitalize">
              <span className="text-foreground">{shape.type}</span> • ID: {shape.id.slice(-8)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
