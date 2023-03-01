import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    // add your tailored logic here
    super.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    super.error(message, stack, context);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    // add your tailored logic here
    super.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    // add your tailored logic here
    super.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    // add your tailored logic here
    super.verbose(message, ...optionalParams);
  }
}
