import { useState, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timestamp: Date;
}

interface ConsoleOutputProps {
  logs: LogEntry[];
  onClear: () => void;
}

export function ConsoleOutput({ logs, onClear }: ConsoleOutputProps) {
  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-primary';
    }
  };

  const getLogPrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return '[OK]';
      case 'error': return '[ERR]';
      case 'warning': return '[WARN]';
      default: return '[INFO]';
    }
  };

  return (
    <div className="card-blueprint">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Console
          </h3>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="console-output max-h-32 min-h-[80px]">
        {logs.length === 0 ? (
          <span className="text-muted-foreground">$ Ready...</span>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-muted-foreground">
                {log.timestamp.toLocaleTimeString()}
              </span>
              <span className={getLogColor(log.type)}>
                {getLogPrefix(log.type)}
              </span>
              <span className="text-foreground">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Hook to manage console logs
export function useConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const log = (type: LogEntry['type'], message: string) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: new Date()
    };
    setLogs(prev => [...prev.slice(-50), entry]); // Keep last 50 logs
  };

  const info = (message: string) => log('info', message);
  const success = (message: string) => log('success', message);
  const error = (message: string) => log('error', message);
  const warning = (message: string) => log('warning', message);
  const clear = () => setLogs([]);

  return { logs, info, success, error, warning, clear };
}
