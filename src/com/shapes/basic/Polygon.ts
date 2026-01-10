import { Shape, ShapeType } from './Shape';

/**
 * Polygon - Intermediate Abstract Class
 * Extends Shape for multi-sided shapes
 * Demonstrates: Inheritance hierarchy (Shape → Polygon → Rectangle/Triangle)
 */
export abstract class Polygon extends Shape {
  // Protected fields for subclass access
  protected _sides: number;

  constructor(
    type: ShapeType,
    sides: number,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ) {
    // Call parent constructor using super() (Inheritance)
    super(type, x, y, color);
    this._sides = sides;
  }

  // Getter for number of sides
  get sides(): number {
    return this._sides;
  }

  // Common method for all polygons
  isRegular(): boolean {
    // Override in subclasses to determine if regular polygon
    return false;
  }

  // Get interior angle sum (shared logic using super concept)
  getInteriorAngleSum(): number {
    return (this._sides - 2) * 180;
  }

  // Abstract methods still need implementation in concrete classes
  abstract getArea(): number;
  abstract getPerimeter(): number;
  abstract draw(ctx: CanvasRenderingContext2D, scale: number): void;
  abstract drawASCII(): string;
  abstract clone(): Shape;
  abstract toJSON(): object;
}
