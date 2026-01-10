import { useState, useRef } from 'react';
import { ShapeType, Unit } from '@/com/shapes/basic/Shape';
import { useShapeManager } from '@/hooks/useShapeManager';
import { Header } from '@/components/Header';
import { ShapeSelector } from '@/components/ShapeSelector';
import { DimensionInputs } from '@/components/DimensionInputs';
import { ActionButtons } from '@/components/ActionButtons';
import { CanvasPreview } from '@/components/CanvasPreview';
import { ASCIIPreview } from '@/components/ASCIIPreview';
import { CalculationResults } from '@/components/CalculationResults';
import { ConsoleOutput, useConsole } from '@/components/ConsoleOutput';
import { ShapeList } from '@/components/ShapeList';
import { toast } from 'sonner';

const Index = () => {
  const [selectedType, setSelectedType] = useState<ShapeType>('rectangle');
  const [unit, setUnit] = useState<Unit>('cm');
  const [dimensions, setDimensions] = useState<Record<string, number>>({
    width: 50,
    height: 30
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const console = useConsole();
  
  const {
    shapes,
    selectedShape,
    canUndo,
    addShape,
    removeShape,
    undo,
    selectShape,
    saveDesign,
    loadDesign,
    clearAll
  } = useShapeManager();

  const handleDraw = () => {
    try {
      const shape = addShape(selectedType, dimensions, 50, 50);
      console.success(`Created ${selectedType} - Area: ${shape.getArea().toFixed(2)}`);
      toast.success(`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} created!`);
    } catch (error) {
      console.error(`Failed to create shape: ${(error as Error).message}`);
      toast.error((error as Error).message);
    }
  };

  const handleCalculate = () => {
    if (selectedShape) {
      const result = selectedShape.calc(unit);
      console.info(`${selectedShape.type}: Area = ${result.area.toFixed(2)} ${unit}², Perimeter = ${result.perimeter.toFixed(2)} ${unit}`);
    } else if (shapes.length > 0) {
      shapes.forEach(shape => {
        const result = shape.calc(unit);
        console.info(`${shape.type}: Area = ${result.area.toFixed(2)} ${unit}², Perimeter = ${result.perimeter.toFixed(2)} ${unit}`);
      });
    }
  };

  const handleSave = () => {
    saveDesign(`design-${Date.now()}.json`);
    console.success('Design saved to file');
    toast.success('Design saved!');
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await loadDesign(file);
        console.success(`Loaded design from ${file.name}`);
        toast.success('Design loaded!');
      } catch (error) {
        console.error(`Failed to load: ${(error as Error).message}`);
        toast.error('Failed to load design');
      }
    }
    e.target.value = '';
  };

  const handleUndo = () => {
    undo();
    console.info('Undo successful');
  };

  const handleClear = () => {
    clearAll();
    console.warning('Canvas cleared');
    toast.info('Canvas cleared');
  };

  const handleDeleteShape = (id: string) => {
    removeShape(id);
    console.info('Shape deleted');
  };

  return (
    <div className="min-h-screen bg-background blueprint-grid">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-3 space-y-4">
            <ShapeSelector
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
            
            <DimensionInputs
              shapeType={selectedType}
              unit={unit}
              onUnitChange={setUnit}
              onDimensionsChange={setDimensions}
            />
            
            <ActionButtons
              onDraw={handleDraw}
              onCalculate={handleCalculate}
              onSave={handleSave}
              onLoad={handleLoad}
              onUndo={handleUndo}
              onClear={handleClear}
              canUndo={canUndo}
              hasShapes={shapes.length > 0}
            />
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
          
          {/* Center - Canvas */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-[400px]">
              <CanvasPreview
                shapes={shapes}
                selectedShapeId={selectedShape?.id || null}
                onSelectShape={selectShape}
              />
            </div>
            
            <ConsoleOutput logs={console.logs} onClear={console.clear} />
          </div>
          
          {/* Right Sidebar - Info */}
          <div className="lg:col-span-3 space-y-4">
            <CalculationResults shape={selectedShape} unit={unit} />
            
            <div className="h-48">
              <ASCIIPreview shape={selectedShape} />
            </div>
            
            <ShapeList
              shapes={shapes}
              selectedId={selectedShape?.id || null}
              onSelect={selectShape}
              onDelete={handleDeleteShape}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            Built with OOP principles: Abstraction, Inheritance, Encapsulation, Polymorphism
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
