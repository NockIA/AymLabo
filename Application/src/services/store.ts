export class Store {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  save(data: object): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  load(): object | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}
