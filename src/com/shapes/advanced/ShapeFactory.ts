import { Shape, ShapeType } from '../basic/Shape';
import { Rectangle } from '../basic/Rectangle';
import { Square } from '../basic/Square';
import { Triangle } from '../basic/Triangle';
import { Circle } from '../basic/Circle';
import { InvalidShapeTypeError } from '../basic/Errors';

/**
 * ShapeFactory - Factory Pattern for Shape Creation
 * Creates shapes based on type and parameters
 */
export class ShapeFactory {
  // Private constructor - use static methods only
  private constructor() {}

  /**
   * Create a shape from type and dimensions
   */
  static create(
    type: ShapeType,
    dimensions: Record<string, number>,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ): Shape {
    switch (type) {
      case 'rectangle':
        return new Rectangle(
          dimensions.width,
          dimensions.height,
          x, y, color
        );
      
      case 'square':
        return new Square(
          dimensions.side,
          x, y, color
        );
      
      case 'triangle':
        return new Triangle(
          dimensions.base,
          dimensions.height,
          x, y, color
        );
      
      case 'circle':
        return new Circle(
          dimensions.radius,
          x, y, color
        );
      
      default:
        throw new InvalidShapeTypeError(type);
    }
  }

  /**
   * Create a shape from JSON data
   */
  static fromJSON(data: any): Shape {
    switch (data.type) {
      case 'rectangle':
        return Rectangle.fromJSON(data);
      case 'square':
        return Square.fromJSON(data);
      case 'triangle':
        return Triangle.fromJSON(data);
      case 'circle':
        return Circle.fromJSON(data);
      default:
        throw new InvalidShapeTypeError(data.type);
    }
  }

  /**
   * Get required dimension fields for a shape type
   */
  static getDimensionFields(type: ShapeType): string[] {
    switch (type) {
      case 'rectangle':
        return ['width', 'height'];
      case 'square':
        return ['side'];
      case 'triangle':
        return ['base', 'height'];
      case 'circle':
        return ['radius'];
      default:
        return [];
    }
  }

  /**
   * Get all available shape types
   */
  static getTypes(): ShapeType[] {
    return ['rectangle', 'square', 'triangle', 'circle'];
  }
}
