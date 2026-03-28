export class Key {
  static validate(validators: any, data: any) {
    for (const key of Object.keys(data)) {
      if (!validators[key]) {
        throw new Error(`Chave '${key}' não permitida`);
      }
    }

    for (const [key, type] of Object.entries(validators)) {
      const value = data[key];
      const validator = type as any;

      if (!(key in data)) {
        if (validator.required) {
          throw new Error(`Chave ${key} é obrigatória.`);
        }

        continue;
      }

      if (typeof value !== validator.type) {
        throw new Error(`Chave '${key}' precisa ser do tipo ${validator.type}.`);
      }

      if (value === undefined || value === null || value === "") {
        throw new Error(`Chave '${key}' sem valor válido.`);
      }

      if (validator.enum) Key.enum(validator, value, key);
    }
  }

  static enum(validator: any, value: any, key: string) {
    if (!validator.enum.includes(value)) throw new Error(`Chave "${key}" não permite esse valor.`);
  }
}
