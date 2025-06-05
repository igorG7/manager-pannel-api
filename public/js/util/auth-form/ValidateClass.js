export class ValidateField {
  static comparePassword(password, confirm) {
    return password === confirm;
  }

  static isEmail(email) {
    return validator.isEmail(email);
  }

  static strongPassword(password) {
    return validator.isStrongPassword(password);
  }

  static validName(name) {
    return (
      name.length >= 3 && validator.isAlpha(name.replace(/\s/g, ""), ["pt-BR"])
    );
  }
}
