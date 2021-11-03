import { JEST_TESTING } from "../constants/settings";

const dependencies = {
  console,
  setInterval,
};

type TypeDependencies = typeof dependencies;

export class Logger {
  constructor(private dependencies: TypeDependencies) {}
  logBuffer = {};
  bufferTime = 1000;

  public addLog(str: string): void {
    if (this.logBuffer[str]) {
      this.logBuffer[str]++;
    } else {
      this.logBuffer[str] = 1;
    }
  }

  writeLogs(): void {
    const { console } = this.dependencies;
    for (const k in this.logBuffer) {
      const n = this.logBuffer[k];
      if (n > 1) {
        console.log(`(${n}) ${k}`);
      } else {
        console.log(`${k}`);
      }
    }
    this.logBuffer = {};
  }

  execute(): void {
    const { setInterval } = this.dependencies;
    setInterval(() => {
      this.writeLogs();
    }, this.bufferTime);
  }
}

const logger = new Logger(dependencies);

/* istanbul ignore next */
!JEST_TESTING && logger.execute();

export default (p: string): void => logger.addLog(p);
