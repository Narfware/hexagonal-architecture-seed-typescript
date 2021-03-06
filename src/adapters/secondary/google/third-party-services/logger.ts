import { Container, transports, format, Logform } from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'

import { ILogger } from '../../../../ports/logger'

const { combine, timestamp, label, json, splat, prettyPrint } = format

export class GoogleWinstonLogger implements ILogger {
  private loggerName: string
  private developmentTransport: transports.ConsoleTransportInstance[]
  private productionTransport: (transports.ConsoleTransportInstance | LoggingWinston)[]

  constructor(loggerName: string) {
    this.developmentTransport = this.initializeDevelopmentTransport()
    this.productionTransport = this.initializeProductionTransport()
    this.loggerName = loggerName
  }

  info(message: string): void {
    new Container()
      .add(this.loggerName, {
        format: this.winstonLoggerFormatter(),
        transports: process.env.NODE_ENV === 'production' ? this.productionTransport : this.developmentTransport,
      })
      .info(message)
  }

  error(message: string): void {
    new Container()
      .add(this.loggerName, {
        format: this.winstonLoggerFormatter(),
        transports: process.env.NODE_ENV === 'production' ? this.productionTransport : this.developmentTransport,
      })
      .error(message)
  }

  warn(message: string): void {
    new Container()
      .add(this.loggerName, {
        format: this.winstonLoggerFormatter(),
        transports: process.env.NODE_ENV === 'production' ? this.productionTransport : this.developmentTransport,
      })
      .warn(message)
  }

  private initializeDevelopmentTransport() {
    // Transports sets
    const developmentTransports = [
      new transports.Console({
        level: 'debug',
      }),
    ]

    return developmentTransports
  }

  private initializeProductionTransport() {
    const productionTransports = [
      ...this.developmentTransport,
      new LoggingWinston({
        level: 'debug',
        logName: 'hex',
      }),
    ]

    return productionTransports
  }

  private winstonLoggerFormatter(): Logform.Format {
    return combine(label({ label: this.loggerName.toLowerCase() }), splat(), timestamp(), json(), prettyPrint())
  }
}
