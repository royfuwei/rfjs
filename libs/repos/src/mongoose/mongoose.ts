import { WinstonHelper } from '@rfjs/helpers';
import { ConnectOptions, Connection, Mongoose } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { Logger } from 'winston';

export class BaseMonogoClient {
  connection: Connection;
  protected mongoose: Mongoose = new Mongoose();
  private options?: ConnectOptions = {
    connectTimeoutMS: 5000,
    waitQueueTimeoutMS: 5000,
  };

  constructor(
    public uri = 'mongodb://127.0.0.1:27017',
    options?: ConnectOptions,
    public dbName?: string,
    private logger?: Logger,
    public clientId: string = uuidV4(),
  ) {
    if (!logger) {
      const logger = new WinstonHelper('mongo', { context: 'DB' });
      this.logger = logger.logger;
    }
    this.options = {
      ...this.options,
      ...options,
    };
    this.mongoose.connect(this.uri, this.options);
    this.connection = this.mongoose.connection;
    this.setConnectionOn();
    if (dbName) {
      const connection = this.mongoose.connection.useDb(dbName);
      this.connection = connection;
    }
  }

  private setConnectionOn() {
    this.mongoose.connection.on('connected', () => {
      if (this.logger) {
        this.logger.info(
          `[${this.connection.name}] connected: ${this.clientId}`,
        );
      }
    });
    this.mongoose.connection.on('disconnected', () => {
      if (this.logger) {
        this.logger.info(
          `[${this.connection.name}] disconnected: ${this.clientId}`,
        );
      }
    });
    this.mongoose.connection.on('error', (error) => {
      if (this.logger) {
        this.logger.error(error);
      }
    });
    this.mongoose.connection.on('open', () => {
      if (this.logger) {
        this.logger.info(
          `[${this.connection.name}] connection opened: ${this.clientId}`,
        );
      }
    });
  }

  async initialize(): Promise<void> {
    try {
      await this.mongoose.connection.asPromise();
    } catch (error) {
      if (this.logger) {
        this.logger.error(error);
      }
      throw error;
    }
  }
}
