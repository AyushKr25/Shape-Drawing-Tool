import { Polygon } from './Polygon';
import { Shape } from './Shape';

/**
 * Triangle - Concrete Shape Class
 * Demonstrates: Inheritance from Polygon, Polymorphism
 */
export class Triangle extends Polygon {
  // Private dimensions (Encapsulation)
  #base: number;
  #height: number;
  #sideA: number;
  #sideB: number;

  constructor(
    base: number,
    height: number,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ) {
    super('triangle', 3, x, y, color);
    
    this.validateDimension('base', base);
    this.validateDimension('height', height);
    
    this.#base = base;
    this.#height = height;
    
    // Calculate other sides for isoceles triangle
    const halfBase = base / 2;
    this.#sideA = Math.sqrt(halfBase ** 2 + height ** 2);
    this.#sideB = this.#sideA;
  }

  // Getters
  get base(): number {
    return this.#base;
  }

  get height(): number {
    return this.#height;
  }

  get sideA(): number {
    return this.#sideA;
  }

  get sideB(): number {
    return this.#sideB;
  }

  // Setters
  set base(value: number) {
    this.validateDimension('base', value);
    this.#base = value;
    this.recalculateSides();
  }

  set height(value: number) {
    this.validateDimension('height', value);
    this.#height = value;
    this.recalculateSides();
  }

  // Recalculate sides when base or height changes
  private recalculateSides(): void {
    const halfBase = this.#base / 2;
    this.#sideA = Math.sqrt(halfBase ** 2 + this.#height ** 2);
    this.#sideB = this.#sideA;
  }

  // Polymorphism: Implement getArea
  getArea(): number {
    return (this.#base * this.#height) / 2;
  }

  // Polymorphism: Implement getPerimeter
  getPerimeter(): number {
    return this.#base + this.#sideA + this.#sideB;
  }

  // Check if equilateral
  isEquilateral(): boolean {
    const tolerance = 0.001;
    return Math.abs(this.#base - this.#sideA) < tolerance && 
           Math.abs(this.#sideA - this.#sideB) < tolerance;
  }

  // Override isRegular
  isRegular(): boolean {
    return this.isEquilateral();
  }

  // Method Overloading: scale
  scale(factor: number): void;
  scale(baseFactor: number, heightFactor: number): void;
  scale(factorOrBase: number, heightFactor?: number): void {
    if (heightFactor !== undefined) {
      this.#base *= factorOrBase;
      this.#height *= heightFactor;
    } else {
      this.#base *= factorOrBase;
      this.#height *= factorOrBase;
    }
    this.recalculateSides();
  }

  // Polymorphism: Override draw
  draw(ctx: CanvasRenderingContext2D, scale: number = 1): void {
    const x = this.position.x * scale;
    const y = this.position.y * scale;
    const b = this.#base * scale;
    const h = this.#height * scale;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = `${this.color}20`;

    // Draw triangle (isoceles, point at top)
    ctx.beginPath();
    ctx.moveTo(x + b / 2, y); // Top point
    ctx.lineTo(x, y + h); // Bottom left
    ctx.lineTo(x + b, y + h); // Bottom right
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw dimension labels
    ctx.font = '12px JetBrains Mono';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(`${this.#base}`, x + b / 2, y + h + 15);
    ctx.fillText(`${this.#height}`, x + b + 15, y + h / 2);

    ctx.restore();
  }

  // Polymorphism: Override ASCII
  drawASCII(): string {
    const w = Math.min(Math.round(this.#base / 5), 20);
    const h = Math.min(Math.round(this.#height / 5), 10);
    
    let ascii = '';
    
    for (let i = 0; i < h; i++) {
      const spaces = Math.floor(((h - i - 1) * w) / (h * 2));
      const chars = Math.floor(((i + 1) * w) / h);
      ascii += ' '.repeat(spaces) + '/' + '*'.repeat(chars) + '\\' + '\n';
    }
    
    // Base
    ascii += '└' + '─'.repeat(w) + '┘';
    
    return ascii;
  }

  clone(): Shape {
    return new Triangle(
      this.#base,
      this.#height,
      this.position.x,
      this.position.y,
      this.color
    );
  }

  toJSON(): object {
    return {
      type: 'triangle',
      id: this.id,
      base: this.#base,
      height: this.#height,
      position: this.position.toJSON(),
      color: this.color,
      createdAt: this.createdAt.toISOString()
    };
  }

  static fromJSON(data: any): Triangle {
    return new Triangle(
      data.base,
      data.height,
      data.position?.x || 0,
      data.position?.y || 0,
      data.color || '#00d4ff'
    );
  }
}
