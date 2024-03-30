type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  static log(level: LogLevel, message: string, ...additional: any[]) {
    console[level](`[${new Date().toISOString()}] ${message}`, ...additional);
  }

  static debug(message: string, ...additional: any[]) {
    this.log('debug', message, ...additional);
  }

  static info(message: string, ...additional: any[]) {
    this.log('info', message, ...additional);
  }

  static warn(message: string, ...additional: any[]) {
    this.log('warn', message, ...additional);
  }

  static error(message: string, ...additional: any[]) {
    this.log('error', message, ...additional);
  }
}

export default Logger;
