export class Currency {
  constructor(name, isMain, enabled, id){
    this._id = id ?? undefined;
    this.name = name;
    this.isMain = isMain;
    this.enabled = enabled;
  }
}
export class Account {
  constructor(name, enabled, balance, id) {
    this._id = id ?? undefined;
    this.name = name;
    this.enabled = enabled;
    this.balance = balance;
  }
}

export class CategoryType {
  constructor(name, isexpense, istransfer, id) {
    this._id = id ?? 0;
    this.name = name;
    this.isExpense = isexpense;
    this.isTransfer = istransfer ?? false;
  }
}

export class Category {
  constructor(name, type, enabled, id) {
    this._id = id ?? 0;
    this.name = name;
    this.categoryTypeId = type;
    this.enabled = enabled;
  }
}

export class Transaction {
  constructor(
    name,
    amount,
    date,
    categoryid,
    accountid,
    description,
    destAccount,
    id
  ) {
    this._id = id ?? null;
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.categoryId = categoryid;
    this.accountId = accountid;
    this.description = description;
    this.destAccount = destAccount;
  }
}
