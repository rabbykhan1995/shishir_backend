export default class Helper {
  static randomSuffix(): string {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const l1 = letters[Math.floor(Math.random() * letters.length)];
    const l2 = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(1 + Math.random() * 1000);
    return `${l1}${number}${l2}`;
  }
}
