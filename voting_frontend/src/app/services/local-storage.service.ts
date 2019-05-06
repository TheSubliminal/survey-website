export class LocalStorageService {

  private static userId = 'userId';

  public static setUserId(userId: number): void {
    this.setValue(userId, this.userId);
  }

  public static getUserId(): number {
    return this.getNumber(this.userId);
  }

  public static getNumber(key: string): number {
    const id = localStorage.getItem(key);
    return id ? Number.parseInt(id, 10) : null;
  }

  public static setValue(value: any, key: string): void {
    if (value) {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value.toString());
      }
    } else {
      localStorage.removeItem(key);
    }
  }

  public static clear() {
    localStorage.clear();
  }

}
