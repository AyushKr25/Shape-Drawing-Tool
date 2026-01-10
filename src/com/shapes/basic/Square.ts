import { Rectangle } from './Rectangle';
import { Shape } from './Shape';

/**
 * Square - Specialized Rectangle
 * Demonstrates: Inheritance (extends Rectangle), Method override
 * A square is a rectangle with equal sides
 */
export class Square extends Rectangle {
  constructor(
    side: number,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ) {
    // Call Rectangle constructor with equal width and height
    super(side, side, x, y, color);
    // Override type
    this._type = 'square';
  }

  // Getter for side (alias for width/height)
  get side(): number {
    return this.width;
  }

  // Setter for side - maintains square property
  set side(value: number) {
    this.validateDimension('side', value);
    this.width = value;
    this.height = value;
  }

  // Override scale to maintain square property
  scale(factor: number): void;
  scale(widthFactor: number, heightFactor: number): void;
  scale(factorOrWidth: number, heightFactor?: number): void {
    // For a square, always use uniform scaling
    const factor = heightFactor !== undefined 
      ? (factorOrWidth + heightFactor) / 2 
      : factorOrWidth;
    
    this.width *= factor;
    this.height = this.width; // Maintain square
  }

  // Override isRegular - squares are always regular
  isRegular(): boolean {
    return true;
  }

  // Override ASCII drawing with square aesthetic
  drawASCII(): string {
    const size = Math.min(Math.round(this.side / 5), 15);
    
    let ascii = '';
    
    // Top border
    ascii += '╔' + '═'.repeat(size) + '╗\n';
    
    // Middle rows
    for (let i = 0; i < size; i++) {
      ascii += '║' + ' '.repeat(size) + '║\n';
    }
    
    // Bottom border
    ascii += '╚' + '═'.repeat(size) + '╝';
    
    return ascii;
  }

  // Clone
  clone(): Shape {
    return new Square(
      this.side,
      this.position.x,
      this.position.y,
      this.color
    );
  }

  // Serialize
  toJSON(): object {
    return {
      type: 'square',
      id: this.id,
      side: this.side,
      position: this.position.toJSON(),
      color: this.color,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Factory method
  static fromJSON(data: any): Square {
    return new Square(
      data.side,
      data.position?.x || 0,
      data.position?.y || 0,
      data.color || '#00d4ff'
    );
  }
}
