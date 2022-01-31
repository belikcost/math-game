import { OperationsEnums } from "@/enums";

interface ResultInterface {
  solvedTasks: number;
  totalTasks: number;
  totalPercent: number;
}

interface OperationInterface {
  type: OperationsEnums;
  correctValue: number;
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

export type {
  ResultInterface,
  TaskInterface,
  SettingsInterface,
  OperationInterface,
};
