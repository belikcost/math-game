import { OperationsEnums } from "@/enums";
import { TaskInterface } from "@/types";

const getOperationByType = (operationType: OperationsEnums): string => {
  switch (operationType) {
    case OperationsEnums.addition:
      return "+";

    case OperationsEnums.subtraction:
      return "-";

    case OperationsEnums.multiplication:
      return "*";

    case OperationsEnums.division:
      return "/";

    case OperationsEnums.exponentiation:
      return "^";
  }
};

const generateRandomValue = (
  randomizeFunction: () => number,
  floorFunction: (arg0: number) => number
): number => {
  return floorFunction(randomizeFunction() * 100);
};

const sortOperationsByLogic = (
  operations: TaskInterface["operations"]
): TaskInterface["operations"] => {
  return [...operations].sort((a, b) => {
    if ((a.type === 0 || a.type === 1) && (b.type === 0 || b.type === 1)) {
      return 0;
    } else {
      return b.type - a.type;
    }
  });
};

const getOperationResult = (
  firstOperand: number,
  secondOperand: number,
  operationType: OperationsEnums
): number => {
  switch (operationType) {
    case OperationsEnums.addition:
      return firstOperand + secondOperand;

    case OperationsEnums.subtraction:
      return firstOperand - secondOperand;

    case OperationsEnums.multiplication:
      return firstOperand * secondOperand;

    case OperationsEnums.division:
      return firstOperand / secondOperand;

    case OperationsEnums.exponentiation:
      return Math.pow(firstOperand, secondOperand);
  }
};

const calculateAnswer = (
  firstNumber: TaskInterface["firstNumber"],
  operations: TaskInterface["operations"]
): number => {
  let result = firstNumber;

  operations.forEach((operation) => {
    const correctValue = operation.correctValue as number;

    result = getOperationResult(result, correctValue, operation.type);
  });

  return result;
};

const getSecondsFromMinutes = (minutes: number): number => {
  return minutes * 60;
};

export {
  getOperationByType,
  generateRandomValue,
  sortOperationsByLogic,
  getOperationResult,
  calculateAnswer,
  getSecondsFromMinutes,
};
