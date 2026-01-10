import { useState, useCallback, useRef } from 'react';
import { Shape, ShapeType, Unit, UnitConverter } from '@/com/shapes/basic/Shape';
import { ShapeFactory } from '@/com/shapes/advanced/ShapeFactory';
import { ShapeCollection } from '@/com/shapes/advanced/ShapeCollection';
import { UndoManager } from '@/com/shapes/advanced/UndoManager';
import { Serializer } from '@/com/shapes/advanced/Serializer';

interface ShapeManagerState {
  shapes: Shape[];
  selectedShape: Shape | null;
  canUndo: boolean;
}

export function useShapeManager() {
  const collectionRef = useRef(new ShapeCollection());
  const undoManagerRef = useRef(new UndoManager());
  
  const [state, setState] = useState<ShapeManagerState>({
    shapes: [],
    selectedShape: null,
    canUndo: false
  });

  const updateState = useCallback(() => {
    setState({
      shapes: collectionRef.current.getAll(),
      selectedShape: state.selectedShape,
      canUndo: !undoManagerRef.current.isEmpty()
    });
  }, [state.selectedShape]);

  // Add a new shape
  const addShape = useCallback((
    type: ShapeType,
    dimensions: Record<string, number>,
    x: number = 50,
    y: number = 50,
    color: string = '#00d4ff'
  ) => {
    try {
      const shape = ShapeFactory.create(type, dimensions, x, y, color);
      collectionRef.current.add(shape);
      
      // Track action for undo
      undoManagerRef.current.push('add', shape.id, shape.toJSON());
      
      setState({
        shapes: collectionRef.current.getAll(),
        selectedShape: shape,
        canUndo: true
      });

      return shape;
    } catch (error) {
      console.error('Failed to add shape:', error);
      throw error;
    }
  }, []);

  // Remove a shape
  const removeShape = useCallback((shapeId: string) => {
    const shape = collectionRef.current.get(shapeId);
    if (shape) {
      undoManagerRef.current.push('remove', shapeId, shape.toJSON());
      collectionRef.current.remove(shapeId);
      
      setState({
        shapes: collectionRef.current.getAll(),
        selectedShape: state.selectedShape?.id === shapeId ? null : state.selectedShape,
        canUndo: true
      });
    }
  }, [state.selectedShape]);

  // Undo last action
  const undo = useCallback(() => {
    const action = undoManagerRef.current.pop();
    if (!action) return;

    switch (action.type) {
      case 'add':
        // Undo add = remove
        collectionRef.current.remove(action.shapeId);
        break;
      case 'remove':
        // Undo remove = add back
        const shape = ShapeFactory.fromJSON(action.data);
        collectionRef.current.add(shape);
        break;
    }

    setState({
      shapes: collectionRef.current.getAll(),
      selectedShape: null,
      canUndo: !undoManagerRef.current.isEmpty()
    });
  }, []);

  // Select a shape
  const selectShape = useCallback((shapeId: string | null) => {
    setState(prev => ({
      ...prev,
      selectedShape: shapeId ? collectionRef.current.get(shapeId) : null
    }));
  }, []);

  // Calculate shape with optional unit
  const calculate = useCallback((shapeId: string, unit?: Unit) => {
    const shape = collectionRef.current.get(shapeId);
    return shape.calc(unit);
  }, []);

  // Save design to file
  const saveDesign = useCallback((filename?: string) => {
    const shapes = collectionRef.current.getAll();
    Serializer.downloadAsFile(shapes, filename);
  }, []);

  // Load design from file
  const loadDesign = useCallback(async (file: File) => {
    try {
      const { shapes } = await Serializer.loadFromFile(file);
      
      // Clear current and add loaded shapes
      collectionRef.current.clear();
      undoManagerRef.current.clear();
      
      shapes.forEach(shape => collectionRef.current.add(shape));
      
      setState({
        shapes: collectionRef.current.getAll(),
        selectedShape: null,
        canUndo: false
      });
    } catch (error) {
      console.error('Failed to load design:', error);
      throw error;
    }
  }, []);

  // Clear all shapes
  const clearAll = useCallback(() => {
    const shapes = collectionRef.current.getAll();
    shapes.forEach(shape => {
      undoManagerRef.current.push('remove', shape.id, shape.toJSON());
    });
    
    collectionRef.current.clear();
    
    setState({
      shapes: [],
      selectedShape: null,
      canUndo: true
    });
  }, []);

  return {
    ...state,
    addShape,
    removeShape,
    undo,
    selectShape,
    calculate,
    saveDesign,
    loadDesign,
    clearAll,
    getUnits: UnitConverter.getUnits,
    formatWithUnit: UnitConverter.format
  };
}
