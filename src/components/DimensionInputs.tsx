import { useEffect, useState } from 'react';
import { ShapeType, Unit, UnitConverter } from '@/com/shapes/basic/Shape';
import { ShapeFactory } from '@/com/shapes/advanced/ShapeFactory';

interface DimensionInputsProps {
  shapeType: ShapeType;
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
  onDimensionsChange: (dimensions: Record<string, number>) => void;
}

export function DimensionInputs({ 
  shapeType, 
  unit, 
  onUnitChange,
  onDimensionsChange 
}: DimensionInputsProps) {
  const fields = ShapeFactory.getDimensionFields(shapeType);
  const units = UnitConverter.getUnits();
  
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(field => {
      initial[field] = '50';
    });
    return initial;
  });

  // Reset values when shape type changes
  useEffect(() => {
    const newValues: Record<string, string> = {};
    fields.forEach(field => {
      newValues[field] = '50';
    });
    setValues(newValues);
    onDimensionsChange(parseValues(newValues));
  }, [shapeType]);

  const parseValues = (vals: Record<string, string>): Record<string, number> => {
    const parsed: Record<string, number> = {};
    Object.entries(vals).forEach(([key, value]) => {
      parsed[key] = parseFloat(value) || 0;
    });
    return parsed;
  };

  const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onDimensionsChange(parseValues(newValues));
    }
  };

  const formatLabel = (field: string): string => {
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

  return (
    <div className="card-blueprint p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Dimensions
      </h3>
      
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field}>
            <label className="block text-xs text-muted-foreground mb-1">
              {formatLabel(field)}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={values[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="input-field flex-1 font-mono"
                min="1"
                step="1"
              />
              <span className="input-field w-16 text-center text-muted-foreground">
                {unit}
              </span>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <label className="block text-xs text-muted-foreground mb-1">
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as Unit)}
            className="select-field w-full"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u === 'cm' ? 'Centimeters (cm)' : u === 'm' ? 'Meters (m)' : 'Inches (inch)'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
