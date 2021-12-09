interface StorageHelperInterface {
  _storage: Storage;
  getFromStorageAndParse: (key: string) => any;
  setToStorage: (key: string, value: string) => void;
}

export default class StorageHelper implements StorageHelperInterface {
  _storage: Storage;

  constructor(storage: Storage) {
    this._storage = storage;
  }

  getFromStorageAndParse(key: string): any {
    const fromStorage = this._storage.getItem(key);

    if (fromStorage) {
      try {
        return JSON.parse(fromStorage);
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }

  setToStorage(key: string, value: string): void {
    this._storage.setItem(key, value);
  }
}
