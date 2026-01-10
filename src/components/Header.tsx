import { Shapes, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-cyan">
            <Shapes className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Shape<span className="text-primary">Draw</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              OOP Drawing & Calculation Tool
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground hidden sm:block">
            v1.0.0
          </span>
        </div>
      </div>
    </header>
  );
}
