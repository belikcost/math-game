import { SettingsInterface } from "@/types";

interface ISettingsManager {
  settings: SettingsInterface;
  change: (changedSettings: SettingsInterface) => void;
  checkOperationChoose: (operationType: number) => boolean;
  chooseOperation: (choose: boolean, changedOperationType: number) => void;
}

class SettingsManager implements ISettingsManager {
  settings: SettingsInterface;

  constructor(initialSettings: SettingsInterface) {
    this.settings = initialSettings;
  }

  change(changedSettings: SettingsInterface): void {
    this.settings = changedSettings;
  }

  checkOperationChoose(operationType: number): boolean {
    return this.settings.operations.some(
      (operationFromSettings) => operationFromSettings === operationType
    );
  }

  chooseOperation(choose: boolean, changedOperationType: number): void {
    let changedOperations = [...this.settings.operations];

    if (choose) {
      changedOperations.push(changedOperationType);
    } else {
      changedOperations = changedOperations.filter(
        (operation) => operation !== changedOperationType
      );
    }

    this.change({
      ...this.settings,
      operations: changedOperations,
    });
  }
}

export default SettingsManager;
