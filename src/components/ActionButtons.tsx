import { Plus, Calculator, Save, Upload, Undo2, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onDraw: () => void;
  onCalculate: () => void;
  onSave: () => void;
  onLoad: () => void;
  onUndo: () => void;
  onClear: () => void;
  canUndo: boolean;
  hasShapes: boolean;
}

export function ActionButtons({
  onDraw,
  onCalculate,
  onSave,
  onLoad,
  onUndo,
  onClear,
  canUndo,
  hasShapes
}: ActionButtonsProps) {
  return (
    <div className="card-blueprint p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onDraw} className="btn-primary flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Draw
        </button>
        
        <button 
          onClick={onCalculate} 
          disabled={!hasShapes}
          className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Calculator className="w-4 h-4" />
          Calculate
        </button>
        
        <button 
          onClick={onSave} 
          disabled={!hasShapes}
          className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        
        <button onClick={onLoad} className="btn-secondary flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" />
          Load
        </button>
        
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Undo2 className="w-4 h-4" />
          Undo
        </button>
        
        <button 
          onClick={onClear} 
          disabled={!hasShapes}
          className="btn-danger flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  );
}
