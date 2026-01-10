/**
 * Custom Error Classes for Shape Drawing Tool
 * Demonstrates Exception Handling OOP concept
 */

// Custom Error for invalid dimension inputs
export class InvalidDimensionError extends Error {
  constructor(dimension: string, value: number) {
    super(`Invalid dimension '${dimension}': ${value}. Dimensions must be positive numbers.`);
    this.name = 'InvalidDimensionError';
    Object.setPrototypeOf(this, InvalidDimensionError.prototype);
  }
}

// Custom Error for serialization/deserialization issues
export class SerializationError extends Error {
  constructor(operation: 'save' | 'load', details: string) {
    super(`Serialization error during ${operation}: ${details}`);
    this.name = 'SerializationError';
    Object.setPrototypeOf(this, SerializationError.prototype);
  }
}

// Custom Error for shape not found
export class ShapeNotFoundError extends Error {
  constructor(shapeId: string) {
    super(`Shape with ID '${shapeId}' not found.`);
    this.name = 'ShapeNotFoundError';
    Object.setPrototypeOf(this, ShapeNotFoundError.prototype);
  }
}

// Custom Error for invalid shape type
export class InvalidShapeTypeError extends Error {
  constructor(shapeType: string) {
    super(`Invalid shape type: '${shapeType}'. Valid types are: rectangle, square, triangle, circle.`);
    this.name = 'InvalidShapeTypeError';
    Object.setPrototypeOf(this, InvalidShapeTypeError.prototype);
  }
}
