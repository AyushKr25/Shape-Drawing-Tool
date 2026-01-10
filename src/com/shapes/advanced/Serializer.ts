import { Shape } from '../basic/Shape';
import { ShapeFactory } from './ShapeFactory';
import { SerializationError } from '../basic/Errors';

/**
 * Design State Interface
 */
export interface DesignState {
  version: string;
  createdAt: string;
  updatedAt: string;
  shapes: object[];
  metadata?: Record<string, any>;
}

/**
 * Serializer - File Handling for Designs
 * Demonstrates: File Handling, Buffered read/write logic
 * Handles save/load of canvas state to JSON
 */
export class Serializer {
  static readonly VERSION = '1.0.0';

  // Private constructor - use static methods
  private constructor() {}

  /**
   * Serialize shapes to JSON string (buffered write concept)
   */
  static serialize(shapes: Shape[], metadata?: Record<string, any>): string {
    try {
      const state: DesignState = {
        version: Serializer.VERSION,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shapes: shapes.map(shape => shape.toJSON()),
        metadata
      };

      return JSON.stringify(state, null, 2);
    } catch (error) {
      throw new SerializationError('save', (error as Error).message);
    }
  }

  /**
   * Deserialize JSON string to shapes (buffered read concept)
   */
  static deserialize(jsonString: string): { shapes: Shape[]; metadata?: Record<string, any> } {
    try {
      const state: DesignState = JSON.parse(jsonString);

      // Validate version
      if (!state.version) {
        throw new Error('Missing version in design file');
      }

      // Reconstruct shapes using factory
      const shapes = state.shapes.map(data => ShapeFactory.fromJSON(data));

      return {
        shapes,
        metadata: state.metadata
      };
    } catch (error) {
      throw new SerializationError('load', (error as Error).message);
    }
  }

  /**
   * Download design as file
   */
  static downloadAsFile(shapes: Shape[], filename: string = 'design.json'): void {
    const json = Serializer.serialize(shapes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Load design from file input
   */
  static async loadFromFile(file: File): Promise<{ shapes: Shape[]; metadata?: Record<string, any> }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = event.target?.result as string;
          const result = Serializer.deserialize(json);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new SerializationError('load', 'Failed to read file'));
      };

      reader.readAsText(file);
    });
  }
}
