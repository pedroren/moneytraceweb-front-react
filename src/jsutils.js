export class JSUtils {
  static getTodayDate() {
    return new Date();
  }
  static getRandomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}