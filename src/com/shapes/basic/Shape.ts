import { Coordinate } from './Coordinate';
import { InvalidDimensionError } from './Errors';

/**
 * Drawable Interface (JS-style via TypeScript interface)
 * Defines contract for drawable objects
 */
export interface Drawable {
  draw(ctx: CanvasRenderingContext2D, scale: number): void;
  drawASCII(): string;
}

/**
 * Resizable Interface
 * Defines contract for resizable shapes
 */
export interface Resizable {
  scale(factor: number): void;
  scale(widthFactor: number, heightFactor: number): void;
}

/**
 * Shape Type Union
 */
export type ShapeType = 'rectangle' | 'square' | 'triangle' | 'circle';

/**
 * Unit types for conversion
 */
export type Unit = 'cm' | 'm' | 'inch';

/**
 * Shape - Abstract Base Class
 * Demonstrates: Abstraction, Encapsulation, Interfaces
 * 
 * Abstract methods that subclasses MUST implement:
 * - getArea(): Calculate shape area
 * - getPerimeter(): Calculate shape perimeter
 * - draw(): Render on canvas
 * - drawASCII(): Generate ASCII representation
 */
export abstract class Shape implements Drawable, Resizable {
  // Private fields (Encapsulation)
  #id: string;
  #position: Coordinate;
  #color: string;
  #createdAt: Date;

  // Protected for subclass access
  protected _type: ShapeType;

  constructor(type: ShapeType, x: number = 0, y: number = 0, color: string = '#00d4ff') {
    this.#id = this.generateId();
    this.#position = new Coordinate(x, y);
    this.#color = color;
    this.#createdAt = new Date();
    this._type = type;
  }

  // Generate unique ID
  private generateId(): string {
    return `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public getters (Encapsulation)
  get id(): string {
    return this.#id;
  }

  get position(): Coordinate {
    return this.#position;
  }

  get color(): string {
    return this.#color;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get type(): ShapeType {
    return this._type;
  }

  // Public setters with validation
  set color(value: string) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      throw new Error('Invalid color format. Use hex format (#RRGGBB)');
    }
    this.#color = value;
  }

  // Validate positive dimension
  protected validateDimension(name: string, value: number): void {
    if (typeof value !== 'number' || isNaN(value) || value <= 0) {
      throw new InvalidDimensionError(name, value);
    }
  }

  // Abstract methods (Abstraction) - subclasses MUST implement
  abstract getArea(): number;
  abstract getPerimeter(): number;
  abstract draw(ctx: CanvasRenderingContext2D, scale: number): void;
  abstract drawASCII(): string;
  abstract clone(): Shape;
  abstract toJSON(): object;

  // Method Overloading simulation for scale
  scale(factor: number): void;
  scale(widthFactor: number, heightFactor: number): void;
  scale(factorOrWidth: number, heightFactor?: number): void {
    // This is overridden in subclasses with actual implementation
    console.log('Base scale called', factorOrWidth, heightFactor);
  }

  // Calculate with unit conversion (Overloading concept)
  calc(): { area: number; perimeter: number };
  calc(unit: Unit): { area: number; perimeter: number; unit: Unit };
  calc(unit?: Unit): { area: number; perimeter: number; unit?: Unit } {
    const area = this.getArea();
    const perimeter = this.getPerimeter();

    if (unit) {
      return {
        area: UnitConverter.convert(area, 'cm', unit),
        perimeter: UnitConverter.convert(perimeter, 'cm', unit),
        unit
      };
    }

    return { area, perimeter };
  }

  // Move shape
  move(dx: number, dy: number): void {
    this.#position.translate(dx, dy);
  }

  // Get shape info string
  getInfo(): string {
    return `${this._type.charAt(0).toUpperCase() + this._type.slice(1)} | Area: ${this.getArea().toFixed(2)} | Perimeter: ${this.getPerimeter().toFixed(2)}`;
  }
}

/**
 * UnitConverter - Static Class
 * Demonstrates: Static Members, final concept with Object.freeze
 */
export class UnitConverter {
  // Final constants using Object.freeze
  static readonly CONVERSIONS = Object.freeze({
    cm: 1,
    m: 0.01,
    inch: 0.393701
  });

  // Private constructor to prevent instantiation
  private constructor() {}

  // Static conversion method
  static convert(value: number, from: Unit, to: Unit): number {
    // Convert to cm first, then to target unit
    const inCm = value / UnitConverter.CONVERSIONS[from];
    return inCm * UnitConverter.CONVERSIONS[to];
  }

  // Get all available units
  static getUnits(): Unit[] {
    return Object.keys(UnitConverter.CONVERSIONS) as Unit[];
  }

  // Format value with unit
  static format(value: number, unit: Unit, decimals: number = 2): string {
    return `${value.toFixed(decimals)} ${unit}`;
  }
}
