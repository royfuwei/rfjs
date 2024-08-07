import { Logger } from 'winston';
import { WinstonHelper } from '@rfjs/helpers';

export abstract class LoggerHelper {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('gql').logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class IocLogger {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('gql', {
        context: 'IOC',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class HttpLogger {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('gql', {
        context: 'HTTP',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class DbLogger extends WinstonHelper {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('gql', {
        context: 'DB',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}
