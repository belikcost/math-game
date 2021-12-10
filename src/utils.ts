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

const getSecondsFromMinutes = (minutes: number): number => {
  return minutes * 60;
};

export {
  getOperationByType,
  generateRandomValue,
  sortOperationsByLogic,
  getSecondsFromMinutes,
};
