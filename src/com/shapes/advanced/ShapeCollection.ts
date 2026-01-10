import { Shape } from '../basic/Shape';
import { ShapeNotFoundError } from '../basic/Errors';

/**
 * ShapeCollection - LinkedHashSet equivalent
 * Demonstrates: Collections concept using Map for unique shapes
 * Maintains insertion order and uniqueness by ID
 */
export class ShapeCollection {
  // Map to maintain order and uniqueness (LinkedHashSet equivalent)
  #shapes: Map<string, Shape>;

  constructor() {
    this.#shapes = new Map();
  }

  // Add shape (returns true if added, false if already exists)
  add(shape: Shape): boolean {
    if (this.#shapes.has(shape.id)) {
      return false;
    }
    this.#shapes.set(shape.id, shape);
    return true;
  }

  // Remove shape by ID
  remove(shapeId: string): Shape | undefined {
    const shape = this.#shapes.get(shapeId);
    if (shape) {
      this.#shapes.delete(shapeId);
      return shape;
    }
    return undefined;
  }

  // Get shape by ID
  get(shapeId: string): Shape {
    const shape = this.#shapes.get(shapeId);
    if (!shape) {
      throw new ShapeNotFoundError(shapeId);
    }
    return shape;
  }

  // Check if shape exists
  has(shapeId: string): boolean {
    return this.#shapes.has(shapeId);
  }

  // Get all shapes as array (maintains insertion order)
  getAll(): Shape[] {
    return Array.from(this.#shapes.values());
  }

  // Get size
  size(): number {
    return this.#shapes.size;
  }

  // Check if empty
  isEmpty(): boolean {
    return this.#shapes.size === 0;
  }

  // Clear all shapes
  clear(): void {
    this.#shapes.clear();
  }

  // Get last added shape
  getLast(): Shape | undefined {
    const values = Array.from(this.#shapes.values());
    return values[values.length - 1];
  }

  // Iterate over shapes
  forEach(callback: (shape: Shape, id: string) => void): void {
    this.#shapes.forEach(callback);
  }

  // Filter shapes
  filter(predicate: (shape: Shape) => boolean): Shape[] {
    return this.getAll().filter(predicate);
  }

  // Find shape
  find(predicate: (shape: Shape) => boolean): Shape | undefined {
    return this.getAll().find(predicate);
  }

  // Get iterator
  [Symbol.iterator](): Iterator<Shape> {
    return this.#shapes.values();
  }
}
