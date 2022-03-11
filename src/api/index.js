import ConnMock from './conn-mock';
import ConnFirebase from './conn-firebase';
import ConnRestApi from './conn-restapi';

class MoneyTraceApi {
  constructor(token) {
    this._token = token;
    let storageType = 'RESTAPI';
    this.connector = new ConnMock();
    if (storageType === 'TEST') {
      this.connector = new ConnMock();
    } else {
      if (storageType === 'FIREBASE') {
        this.connector = new ConnFirebase();
      } else {
        if (storageType === 'RESTAPI') {
          this.connector = new ConnRestApi(this._token);
        }
      }
    }
  }

  InitializeData() {
    return this.connector.InitializeData();
  }

  // Basics
  getCategoryTypes() {
    return this.connector.getCategoryTypes();
  }
  //Categories
  getCategories() {
    return this.connector.getCategories();
  }
  createCategory(record) {
    return this.connector.createCategory(record);
  }
  deleteCategory(id) {
    return this.connector.deleteCategory(id);
  }
  updateCategory(record) {
    return this.connector.updateCategory(record);
  }
  //Accounts
  getAccounts() {
    return this.connector.getAccounts();
  }
  createAccount(record) {
    return this.connector.createAccount(record);
  }
  deleteAccount(id) {
    return this.connector.deleteAccount(id);
  }
  updateAccount(record) {
    return this.connector.updateAccount(record);
  }
  //Currencies
  getCurrencies() {
    return this.connector.getCurrencies();
  }
  createCurrency(record) {
    return this.connector.createCurrency(record);
  }
  deleteCurrency(id) {
    return this.connector.deleteCurrency(id);
  }
  updateCurrency(record) {
    return this.connector.updateCurrency(record);
  }

  // Transactions
  getTransactions() {
    return this.connector.getTransactions();
  }
  getTransactionsFiltered(accountId, categoryId) {
    return this.connector.getTransactionsFiltered(accountId, categoryId);
  }
  getTransactionById(id) {
    return this.connector.getTransactionById(id);
  }
  createTransaction(record) {
    return this.connector.createTransaction(record);
  }
  deleteTransaction(id) {
    return this.connector.deleteTransaction(id);
  }
  updateTransaction(record) {
    return this.connector.updateTransaction(record);
  }

  //Authentication
  checkTokenIsValid(token) {
    return this.connector.checkTokenIsValid(token);
  }
  login(data) {
    return this.connector.login(data);
  }
  signup(data) {
    return this.connector.signup(data);
  }
}

export default MoneyTraceApi;
