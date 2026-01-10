import { Shape } from './Shape';

/**
 * Circle - Concrete Shape Class
 * Demonstrates: Direct inheritance from Shape (not Polygon)
 * Shape → Circle hierarchy
 */
export class Circle extends Shape {
  // Private radius (Encapsulation)
  #radius: number;

  // Final constant - PI is frozen (final concept)
  static readonly PI = Object.freeze(Math.PI);

  constructor(
    radius: number,
    x: number = 0,
    y: number = 0,
    color: string = '#00d4ff'
  ) {
    super('circle', x, y, color);
    
    this.validateDimension('radius', radius);
    this.#radius = radius;
  }

  // Getters
  get radius(): number {
    return this.#radius;
  }

  get diameter(): number {
    return this.#radius * 2;
  }

  // Setters
  set radius(value: number) {
    this.validateDimension('radius', value);
    this.#radius = value;
  }

  // Polymorphism: Implement getArea using frozen PI constant
  getArea(): number {
    return Circle.PI * this.#radius ** 2;
  }

  // Polymorphism: Implement getPerimeter (circumference)
  getPerimeter(): number {
    return 2 * Circle.PI * this.#radius;
  }

  // Get circumference (alias)
  getCircumference(): number {
    return this.getPerimeter();
  }

  // Method Overloading: scale (for circle, both factors treated as radius scale)
  scale(factor: number): void;
  scale(widthFactor: number, heightFactor: number): void;
  scale(factorOrWidth: number, heightFactor?: number): void {
    // For circles, use average if two factors given
    const factor = heightFactor !== undefined 
      ? (factorOrWidth + heightFactor) / 2 
      : factorOrWidth;
    
    this.#radius *= factor;
  }

  // Polymorphism: Override draw
  draw(ctx: CanvasRenderingContext2D, scale: number = 1): void {
    const x = (this.position.x + this.#radius) * scale;
    const y = (this.position.y + this.#radius) * scale;
    const r = this.#radius * scale;

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = `${this.color}20`;

    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Circle.PI);
    ctx.fill();
    ctx.stroke();

    // Draw center point
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Circle.PI);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Draw radius line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + r, y);
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw dimension label
    ctx.font = '12px JetBrains Mono';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(`r=${this.#radius}`, x + r / 2, y - 8);

    ctx.restore();
  }

  // Polymorphism: Override ASCII
  drawASCII(): string {
    const r = Math.min(Math.round(this.#radius / 5), 8);
    const diameter = r * 2;
    
    let ascii = '';
    
    for (let y = 0; y <= diameter; y++) {
      let row = '';
      for (let x = 0; x <= diameter; x++) {
        const dx = x - r;
        const dy = y - r;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (Math.abs(distance - r) < 0.5) {
          row += '*';
        } else if (distance < r) {
          row += ' ';
        } else {
          row += ' ';
        }
      }
      ascii += row + '\n';
    }
    
    return ascii.trimEnd();
  }

  clone(): Shape {
    return new Circle(
      this.#radius,
      this.position.x,
      this.position.y,
      this.color
    );
  }

  toJSON(): object {
    return {
      type: 'circle',
      id: this.id,
      radius: this.#radius,
      position: this.position.toJSON(),
      color: this.color,
      createdAt: this.createdAt.toISOString()
    };
  }

  static fromJSON(data: any): Circle {
    return new Circle(
      data.radius,
      data.position?.x || 0,
      data.position?.y || 0,
      data.color || '#00d4ff'
    );
  }
}
