import { Shape } from '../basic/Shape';

/**
 * Action interface for undo operations
 */
interface Action {
  type: 'add' | 'remove' | 'modify';
  shapeId: string;
  data: object;
  timestamp: Date;
}

/**
 * UndoManager - Stack-based Undo System
 * Demonstrates: Collections (ArrayDeque equivalent using Array as stack)
 * 
 * Uses command pattern to track and reverse actions
 */
export class UndoManager {
  // Stack of actions (ArrayDeque equivalent)
  #actionStack: Action[];
  #maxActions: number;

  constructor(maxActions: number = 50) {
    this.#actionStack = [];
    this.#maxActions = maxActions;
  }

  // Push action onto stack
  push(type: Action['type'], shapeId: string, data: object): void {
    const action: Action = {
      type,
      shapeId,
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      timestamp: new Date()
    };

    this.#actionStack.push(action);

    // Limit stack size
    if (this.#actionStack.length > this.#maxActions) {
      this.#actionStack.shift();
    }
  }

  // Pop and return last action
  pop(): Action | undefined {
    return this.#actionStack.pop();
  }

  // Peek at last action without removing
  peek(): Action | undefined {
    return this.#actionStack[this.#actionStack.length - 1];
  }

  // Check if stack is empty
  isEmpty(): boolean {
    return this.#actionStack.length === 0;
  }

  // Get stack size
  size(): number {
    return this.#actionStack.length;
  }

  // Clear all actions
  clear(): void {
    this.#actionStack = [];
  }

  // Get all actions (for debugging)
  getHistory(): Action[] {
    return [...this.#actionStack];
  }
}
