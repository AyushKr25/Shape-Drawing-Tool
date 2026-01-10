import { Shape } from '../basic/Shape';

/**
 * CanvasManager - Static Nested Class for Canvas Operations
 * Demonstrates: Nested/Inner class concept
 * Manages HTML5 Canvas drawing operations
 */
export class CanvasManager {
  #canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #scale: number = 1;
  #gridSize: number = 20;
  #showGrid: boolean = true;

  // Colors
  static readonly GRID_COLOR = '#1a3a5c';
  static readonly BACKGROUND_COLOR = '#0a1628';

  constructor(canvasId?: string) {
    if (canvasId) {
      this.attach(canvasId);
    }
  }

  // Attach to canvas element
  attach(canvasId: string): void {
    this.#canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (this.#canvas) {
      this.#ctx = this.#canvas.getContext('2d');
      this.setupCanvas();
    }
  }

  // Attach to canvas element directly
  attachElement(canvas: HTMLCanvasElement): void {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext('2d');
    this.setupCanvas();
  }

  // Setup canvas with proper sizing
  private setupCanvas(): void {
    if (!this.#canvas) return;
    
    // Set canvas size to match container
    const rect = this.#canvas.getBoundingClientRect();
    this.#canvas.width = rect.width;
    this.#canvas.height = rect.height;
  }

  // Set scale for drawing
  setScale(scale: number): void {
    this.#scale = scale;
  }

  // Toggle grid
  toggleGrid(): void {
    this.#showGrid = !this.#showGrid;
  }

  // Get grid state
  get showGrid(): boolean {
    return this.#showGrid;
  }

  // Clear canvas
  clear(): void {
    if (!this.#canvas || !this.#ctx) return;
    
    this.#ctx.fillStyle = CanvasManager.BACKGROUND_COLOR;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  // Draw grid
  drawGrid(): void {
    if (!this.#canvas || !this.#ctx || !this.#showGrid) return;
    
    const ctx = this.#ctx;
    const width = this.#canvas.width;
    const height = this.#canvas.height;
    
    ctx.strokeStyle = CanvasManager.GRID_COLOR;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < width; x += this.#gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < height; y += this.#gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Render all shapes
  render(shapes: Shape[]): void {
    if (!this.#ctx) return;

    this.clear();
    this.drawGrid();

    // Draw each shape
    shapes.forEach(shape => {
      shape.draw(this.#ctx!, this.#scale);
    });
  }

  // Get canvas dimensions
  getDimensions(): { width: number; height: number } {
    if (!this.#canvas) return { width: 0, height: 0 };
    return {
      width: this.#canvas.width,
      height: this.#canvas.height
    };
  }

  // Export canvas as data URL
  toDataURL(type: string = 'image/png'): string {
    if (!this.#canvas) return '';
    return this.#canvas.toDataURL(type);
  }

  // Resize canvas
  resize(width: number, height: number): void {
    if (!this.#canvas) return;
    this.#canvas.width = width;
    this.#canvas.height = height;
  }
}
