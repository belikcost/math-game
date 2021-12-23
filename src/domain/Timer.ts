interface ITimerOptions {
  startTime: number;
  interval: number;
  onTimerEnd?: () => void;
  onTick?: (time: ITimer["time"]) => void;
}

interface ITimer {
  time: number;
  start: () => void;
  end: () => void;
}

class Timer implements ITimer {
  time: number;
  private readonly options: ITimerOptions;
  private intervalID: number | undefined;

  constructor(options: ITimerOptions) {
    this.time = options.startTime;
    this.options = options;
  }

  start = (): void => {
    const updateTimer = () => {
      if (this.time && this.time > 0) {
        this.time--;
        if (this.options.onTick) this.options.onTick(this.time);
      } else {
        this.end();
        if (this.options.onTimerEnd) this.options.onTimerEnd();
      }
    };

    this.intervalID = setInterval(updateTimer, this.options.interval);
  };

  end = (): void => {
    clearInterval(this.intervalID);
  };
}

export default Timer;
