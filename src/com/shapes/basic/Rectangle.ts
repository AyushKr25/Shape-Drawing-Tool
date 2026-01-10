import { Polygon } from './Polygon';
import { Shape } from './Shape';

/**
 * Rectangle - Concrete Shape Class
 * Demonstrates: Inheritance, Polymorphism (override draw), Encapsulation
 */
export class Rectangle extends Polygon {
  // Private dimensions (Encapsulation)
  #width: number;
  #height: number;

  constructor(
    width: number,
    height: number,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ) {
    // Call parent constructor (Inheritance via super)
    super('rectangle', 4, x, y, color);
    
    // Validate dimensions (throws InvalidDimensionError)
    this.validateDimension('width', width);
    this.validateDimension('height', height);
    
    this.#width = width;
    this.#height = height;
  }

  // Getters (Encapsulation)
  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  // Setters with validation (Encapsulation)
  set width(value: number) {
    this.validateDimension('width', value);
    this.#width = value;
  }

  set height(value: number) {
    this.validateDimension('height', value);
    this.#height = value;
  }

  // Polymorphism: Override abstract method
  getArea(): number {
    return this.#width * this.#height;
  }

  // Polymorphism: Override abstract method
  getPerimeter(): number {
    return 2 * (this.#width + this.#height);
  }

  // Check if this is a square
  isSquare(): boolean {
    return this.#width === this.#height;
  }

  // Override isRegular from Polygon
  isRegular(): boolean {
    return this.isSquare();
  }

  // Get diagonal length
  getDiagonal(): number {
    return Math.sqrt(this.#width ** 2 + this.#height ** 2);
  }

  // Method Overloading: scale implementation
  scale(factor: number): void;
  scale(widthFactor: number, heightFactor: number): void;
  scale(factorOrWidth: number, heightFactor?: number): void {
    if (heightFactor !== undefined) {
      this.#width *= factorOrWidth;
      this.#height *= heightFactor;
    } else {
      this.#width *= factorOrWidth;
      this.#height *= factorOrWidth;
    }
  }

  // Polymorphism: Override draw for rectangle-specific rendering
  draw(ctx: CanvasRenderingContext2D, scale: number = 1): void {
    const x = this.position.x * scale;
    const y = this.position.y * scale;
    const w = this.#width * scale;
    const h = this.#height * scale;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = `${this.color}20`;
    
    // Draw rectangle with rounded corners for polish
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 4);
    ctx.fill();
    ctx.stroke();

    // Draw dimension labels
    ctx.font = '12px JetBrains Mono';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${this.#width}`, x + w / 2, y - 8);
    ctx.fillText(`${this.#height}`, x + w + 15, y + h / 2);

    ctx.restore();
  }

  // Polymorphism: Override ASCII drawing
  drawASCII(): string {
    const w = Math.min(Math.round(this.#width / 5), 20);
    const h = Math.min(Math.round(this.#height / 5), 10);
    
    let ascii = '';
    
    // Top border
    ascii += '┌' + '─'.repeat(w) + '┐\n';
    
    // Middle rows
    for (let i = 0; i < h; i++) {
      ascii += '│' + ' '.repeat(w) + '│\n';
    }
    
    // Bottom border
    ascii += '└' + '─'.repeat(w) + '┘';
    
    return ascii;
  }

  // Clone this shape
  clone(): Shape {
    return new Rectangle(
      this.#width,
      this.#height,
      this.position.x,
      this.position.y,
      this.color
    );
  }

  // Serialize to JSON
  toJSON(): object {
    return {
      type: this.type,
      id: this.id,
      width: this.#width,
      height: this.#height,
      position: this.position.toJSON(),
      color: this.color,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Static factory method
  static fromJSON(data: any): Rectangle {
    const rect = new Rectangle(
      data.width,
      data.height,
      data.position?.x || 0,
      data.position?.y || 0,
      data.color || '#00d4ff'
    );
    return rect;
  }
}
