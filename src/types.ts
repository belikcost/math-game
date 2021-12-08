import { OperationsEnums } from "@/enums";

interface ResultInterface {
  solvedTasks: number;
  totalTasks: number;
  totalPercent: number;
}

interface OperationInterface {
  type: OperationsEnums;
  value: number | null;
}

interface TaskInterface {
  firstNumber: number;
  operations: OperationInterface[];
  answer: number | null;
}

interface SettingsInterface {
  duration: number;
  level: number;
  operations: OperationsEnums[];
}

export type { ResultInterface, TaskInterface, SettingsInterface };
