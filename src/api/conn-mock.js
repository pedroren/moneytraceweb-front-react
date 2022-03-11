import { Account, Category, CategoryType, Transaction } from './models';
import { JSUtils } from '../jsutils';

class ConnMock {
  allStorage(table) {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      if (keys[i].includes(table)) {
        values.push(localStorage.getItem(keys[i]));
      }
    }

    return values;
  }

  constructor() {
    this.myStorage = window.localStorage;
    this.defaultTransaction = new Transaction(
      null,
      0,
      new Date(),
      1,
      1,
      null,
      null,
      JSUtils.getRandomID()
    );
  }

  InitializeData() {
    return true;
  }

  //Basics
  //CategoryType CRUD
  getCategoryTypesStore() {
    return [
      new CategoryType('Income', false, false, 1),
      new CategoryType('Expense', true, false, 2),
      new CategoryType('Payment', false, true, 3),
    ];
  }
  getCategoryTypes() {
    return Promise.resolve({ data: this.getCategoryTypesStore() });
  }

  //Category CRUD
  getCategoriesStore() {
    let list = [];
    let storeItems = this.allStorage('Category');
    if (storeItems.length === 0) {
      //If no data found Create mockups
      this.createCategoryStore(new Category('Food', 2));
      this.createCategoryStore(new Category('Gas', 2));
      this.createCategoryStore(new Category('Salary', 1));
      //Refresh
      storeItems = this.allStorage('Category');
    }
    for (let item of storeItems) {
      const element = JSON.parse(item);
      list.push(element);
    }

    return list;
  }
  getCategories() {
    return Promise.resolve({ data: this.getCategoriesStore() });
  }
  createCategory(category) {
    return Promise.resolve(this.createCategoryStore(category));
  }
  createCategoryStore(category) {
    if (!category.CategoryId) {
      category.CategoryId = JSUtils.getRandomID();
    }
    this.myStorage.setItem(
      'Category_' + category.CategoryId,
      JSON.stringify(category)
    );
    return category;
  }
  deleteCategory(id) {
    return Promise.resolve(this.deleteCategoryStore(id));
  }
  deleteCategoryStore(id) {
    this.myStorage.removeItem('Category_' + id);
    return true;
  }
  updateCategory(category) {
    return Promise.resolve(this.updateCategoryStore(category));
  }
  updateCategoryStore(category) {
    this.deleteCategoryStore(category.CategoryId);
    this.createCategoryStore(category);
    return category;
  }

  //Account CRUD
  getAccountsStore() {
    let list = [];
    let storeItems = this.allStorage('Account');
    if (storeItems.length === 0) {
      //If no data found Create mockups
      this.createAccountStore(new Account('CASH'));
      this.createAccountStore(new Account('Credit Card'));
      //Refresh
      storeItems = this.allStorage('Account');
    }
    for (let item of storeItems) {
      const element = JSON.parse(item);
      list.push(element);
    }

    return list;
  }
  getAccounts() {
    return Promise.resolve({ data: this.getAccountsStore() });
  }
  createAccount(account) {
    return Promise.resolve(this.createAccountStore(account));
  }
  createAccountStore(account) {
    if (!account.AccountId){
      account.AccountId = JSUtils.getRandomID();
    }
    this.myStorage.setItem(
      'Account_' + account.AccountId,
      JSON.stringify(account)
    );
    return account;
  }
  deleteAccount(id) {
    return Promise.resolve(this.deleteAccountStore(id));
  }
  deleteAccountStore(id) {
    this.myStorage.removeItem('Account_' + id);
    return true;
  }
  updateAccount(account) {
    return Promise.resolve(this.updateAccountStore(account));
  }
  updateAccountStore(account) {
    this.deleteAccountStore(account.AccountId);
    this.createAccountStore(account);
    return account;
  }

  //Transactions
  getTransactionsStore() {
    let _translist = [];

    //Get trans from storage
    let storeItems = this.allStorage('Transaction');
    if (storeItems.length === 0) {
      //If no data found Create mockups
      let trans1 = { ...this.defaultTransaction };
      trans1.name = 'Breakfast';
      trans1.amount = 10;
      let trans2 = { ...this.defaultTransaction };
      trans2.name = 'Lunch';
      trans2.amount = 20;
      let trans3 = { ...this.defaultTransaction };
      trans3.name = 'Gas';
      trans3.amount = 50;
      let trans4 = { ...this.defaultTransaction };
      trans4.name = 'Dinner';
      trans4.amount = 10;
      this.createTransaction(trans1);
      this.createTransaction(trans2);
      this.createTransaction(trans3);
      this.createTransaction(trans4);
      storeItems = this.allStorage('Transaction');
    }

    for (let item of storeItems) {
      const element = JSON.parse(item);
      element.Date = new Date(element.Date); //Parte Date field as Date
      _translist.push(element);
    }

    return _translist;
  }
  getTransactions() {
    return Promise.resolve({ data: this.getTransactionsStore() });
  }

  getTransactionByIdStore(id) {
    const list = this.getTransactionsStore();
    return list.find((item) => item.TransactionId === id);
  }
  getTransactionById(id) {
    return Promise.resolve({ data: this.getTransactionByIdStore(id) });
  }

  createTransactionStore(transaction) {
    transaction.TransactionId = JSUtils.getRandomID();
    this.myStorage.setItem(
      'Transaction_' + transaction.TransactionId,
      JSON.stringify(transaction)
    );
    return transaction;
  }
  createTransaction(transaction) {
    return Promise.resolve({ data: this.createTransactionStore(transaction) });
  }

  deleteTransactionStore(id) {
    this.myStorage.removeItem('Transaction_' + id);
    return true;
  }
  deleteTransaction(id) {
    return Promise.resolve(this.deleteTransactionStore(id));
  }

  updateTransaction(transaction) {
    return Promise.resolve({ data: this.updateTransactionStore(transaction) });
  }
  updateTransactionStore(transaction) {
    this.deleteTransactionStore(transaction.TransactionId);
    this.createTransactionStore(transaction);
    return transaction;
  }

  getTransactionsFiltered(accountId, categoryId){
    return Promise.resolve({ data: this.getTransactionsFilteredStore(accountId, categoryId) });
  }
  getTransactionsFilteredStore(accountId, categoryId){
    let list = this.getTransactionsStore();
    if (accountId){
      list = list.filter(item => item.AccountId === accountId);
    }
    if (categoryId){
      list = list.filter(item => item.CategoryId === categoryId);
    }
    return list;
  }
}
export default ConnMock;
