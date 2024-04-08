// Define the log levels available
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Define the type for additional data that may be logged
type AdditionalData = unknown[];

// Logger class to handle logging at different levels
class Logger {
  // Generic log method used by specific log level methods
  static log(level: LogLevel, message: string, ...additional: AdditionalData) {
    // Log the message to the console at the specified level
    console[level](`[${new Date().toISOString()}] ${message}`, ...additional);
  }

  // Log a debug message
  static debug(message: string, ...additional: AdditionalData) {
    this.log('debug', message, ...additional);
  }

  // Log an info message
  static info(message: string, ...additional: AdditionalData) {
    this.log('info', message, ...additional);
  }

  // Log a warning message
  static warn(message: string, ...additional: AdditionalData) {
    this.log('warn', message, ...additional);
  }

  // Log an error message
  static error(message: string, ...additional: AdditionalData) {
    this.log('error', message, ...additional);
  }
}

export default Logger;