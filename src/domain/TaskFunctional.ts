import { SettingsInterface, TaskInterface } from "@/types";
import { OperationsEnums } from "@/enums";
import { generateRandomValue } from "@/utils";

interface TaskFunctionalInterface {
  task: TaskInterface;
  calculateAnswer: () => number;
  getOperationResult: (
    firstOperand: number,
    secondOperand: number,
    operationType: OperationsEnums
  ) => number;
  checkAnswers: () => boolean;
  getCorrectAnswers: () => number[];
}

class TaskFunctional implements TaskFunctionalInterface {
  task: TaskInterface;

  constructor(task: TaskInterface);
  constructor(
    task: undefined,
    operations: SettingsInterface["operations"],
    level: SettingsInterface["level"]
  );

  constructor(
    task?: TaskInterface,
    operations?: SettingsInterface["operations"],
    level?: SettingsInterface["level"]
  ) {
    if (task) {
      this.task = task;
      return;
    }

    this.task = this.createTask(operations!, level!);
    this.task.operations = this.sortOperationsByLogic();
    this.task.answer = this.calculateAnswer();
  }

  calculateAnswer(): number {
    let result = this.task.firstNumber;

    this.task.operations.forEach((operation) => {
      const correctValue = operation.correctValue as number;

      result = this.getOperationResult(result, correctValue, operation.type);
    });

    return result;
  }

  getOperationResult(
    firstOperand: number,
    secondOperand: number,
    operationType: OperationsEnums
  ): number {
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
  }

  checkAnswers(): boolean {
    return this.task.operations.every(
      (operation) => operation.value === operation.correctValue
    );
  }

  getCorrectAnswers(): number[] {
    const correctAnswers: number[] = [];

    this.task.operations.forEach((operation) => {
      correctAnswers.push(operation.correctValue);
    });

    return correctAnswers;
  }

  createTask(
    operations: SettingsInterface["operations"],
    level: SettingsInterface["level"]
  ): TaskInterface {
    const task: TaskInterface = {
      firstNumber: generateRandomValue(),
      operations: [],
      answer: null,
    };

    while (task.operations.length < level) {
      operations.forEach((operation) => {
        task.operations.push({
          type: operation,
          correctValue: generateRandomValue(),
          value: null,
        });
      });
    }

    return task;
  }

  sortOperationsByLogic(): TaskInterface["operations"] {
    return [...this.task.operations].sort((a, b) => {
      const itemsTypeAdditionOrSubtraction =
        (a.type === OperationsEnums.addition ||
          a.type === OperationsEnums.subtraction) &&
        (b.type === OperationsEnums.addition ||
          b.type === OperationsEnums.subtraction);

      if (itemsTypeAdditionOrSubtraction) {
        return 0;
      }

      return b.type - a.type;
    });
  }

  static getOperationByType = (operationType: OperationsEnums): string => {
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
}

export default TaskFunctional;
