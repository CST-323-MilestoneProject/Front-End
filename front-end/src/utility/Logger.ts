type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type AdditionalData = unknown[];

class Logger {
  static log(level: LogLevel, message: string, ...additional: AdditionalData) {
    console[level](`[${new Date().toISOString()}] ${message}`, ...additional);
  }

  static debug(message: string, ...additional: AdditionalData) {
    this.log('debug', message, ...additional);
  }

  static info(message: string, ...additional: AdditionalData) {
    this.log('info', message, ...additional);
  }

  static warn(message: string, ...additional: AdditionalData) {
    this.log('warn', message, ...additional);
  }

  static error(message: string, ...additional: AdditionalData) {
    this.log('error', message, ...additional);
  }
}

export default Logger;
