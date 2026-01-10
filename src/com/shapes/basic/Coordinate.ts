/**
 * Coordinate - Inner/Nested Class concept
 * Represents a point in 2D space for shape positioning
 * Demonstrates Encapsulation with private fields
 */
export class Coordinate {
  // Private fields using # (Encapsulation)
  #x: number;
  #y: number;

  constructor(x: number = 0, y: number = 0) {
    this.#x = x;
    this.#y = y;
  }

  // Public getters (Encapsulation)
  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  // Public setters with validation (Encapsulation)
  set x(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('X coordinate must be a valid number');
    }
    this.#x = value;
  }

  set y(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Y coordinate must be a valid number');
    }
    this.#y = value;
  }

  // Move coordinate by offset
  translate(dx: number, dy: number): void {
    this.#x += dx;
    this.#y += dy;
  }

  // Calculate distance to another coordinate
  distanceTo(other: Coordinate): number {
    const dx = this.#x - other.x;
    const dy = this.#y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Clone this coordinate
  clone(): Coordinate {
    return new Coordinate(this.#x, this.#y);
  }

  // Serialize to plain object
  toJSON(): { x: number; y: number } {
    return { x: this.#x, y: this.#y };
  }

  // Static factory method
  static fromJSON(data: { x: number; y: number }): Coordinate {
    return new Coordinate(data.x, data.y);
  }
}
