import { OperationsEnums } from "@/enums";

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

export { getOperationByType };
