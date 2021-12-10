import { TaskInterface } from "@/types";
import { OperationsEnums } from "@/enums";

interface TaskFunctionalInterface {
  _task: TaskInterface;
  calculateAnswer: () => number;
  getOperationResult: (
    firstOperand: number,
    secondOperand: number,
    operationType: OperationsEnums
  ) => number;
  checkAnswers: () => boolean;
  getCorrectAnswers: () => number[];
}

export default class TaskFunctional implements TaskFunctionalInterface {
  _task: TaskInterface;

  constructor(task: TaskInterface) {
    this._task = task;
  }

  calculateAnswer(): number {
    let result = this._task.firstNumber;

    this._task.operations.forEach((operation) => {
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
    return this._task.operations.every(
      (operation) => operation.value === operation.correctValue
    );
  }

  getCorrectAnswers(): number[] {
    const correctAnswers: number[] = [];

    this._task.operations.forEach((operation) => {
      correctAnswers.push(operation.correctValue);
    });

    return correctAnswers;
  }
}
