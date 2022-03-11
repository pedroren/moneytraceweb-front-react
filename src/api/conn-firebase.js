import { Account, Category, CategoryType, Transaction } from './models';
import { JSUtils } from '../jsutils';
import axios from 'axios';

let axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}

/*Rules:
"transactions":{
      ".indexOn": ["Date","AccountId", "CategoryId"]
      }
*/

class ConnFirebase {
  getApiKey(){
    return '';
  }
  getBaseUrl(){
    return 'https://yourdb/';
  }

  constructor() {
    this.baseUrl = this.getBaseUrl();
    this.defaultTransaction = new Transaction(
      null,
      0,
      new Date(),
      1,
      1,
      null,
      JSUtils.getRandomID()
    );
  }

  InitializeData() {
    //
    this.createCategory(new Category('Food', 2));
    this.createCategory(new Category('Gas', 2));
    this.createCategory(new Category('Salary', 1));
    this.createAccount(new Account('CASH'));
    this.createAccount(new Account('Credit Card'));
  }

  //Basics
  //CategoryType CRUD
  getCategoryTypes() {
    return Promise.resolve({ data: this.getCategoryTypesStore() });
  }
  getCategoryTypesStore() {
    return [
      new CategoryType('Income', false, false, 1),
      new CategoryType('Expense', true, false, 2),
      new CategoryType('Payment', false, true, 3),
    ];
  }
  //Category CRUD
  getCategories() {
    return axios.get(`${this.baseUrl}categories.json`, axiosConfig)
    .then(res => {
      if (!res.data){
        //If no record found
        return {data: []};
      }
      const arrayResult = Object.keys(res.data).map(record => {
        return {...res.data[record], CategoryId: record} 
      });
      return {data: arrayResult};
    });    
  }
  createCategory(category) {
    category.CategoryId = JSUtils.getRandomID();
    return axios.post(`${this.baseUrl}categories.json`, { ...category });
  }
  deleteCategory(id) {
    return axios.delete(`${this.baseUrl}categories/${id}.json`)
  }
  updateCategory(category){
    return axios.patch(`${this.baseUrl}categories/${category.CategoryId}.json`, { ...category });
  }
  
  //Account CRUD
  getAccounts() {
    return axios.get(`${this.baseUrl}accounts.json`, axiosConfig)
    .then(res => {
      if (!res.data){
        //If no record found
        return {data: []};
      }
      const arrayResult = Object.keys(res.data).map(record => {
        return {...res.data[record], AccountId: record} 
      });
      return {data: arrayResult};
    }); 
  }
  createAccount(account) {
    account.AccountId = JSUtils.getRandomID();
    return axios.post(`${this.baseUrl}accounts.json`, { ...account });
  }
  deleteAccount(id) {
    return axios.delete(`${this.baseUrl}accounts/${id}.json`)
  }
  updateAccount(account){
    return axios.patch(`${this.baseUrl}accounts/${account.AccountId}.json`, { ...account });
  }

  //Transactions
  getTransactions() {
    return axios.get(`${this.baseUrl}transactions.json`, axiosConfig)
    .then(res => {
      if (!res.data){
        //If no record found
        return {data: []};
      }
      const arrayResult = Object.keys(res.data).map(record => {
        return {...res.data[record], TransactionId: record,  Date: new Date(res.data[record].Date)} 
      });
      return {data: arrayResult};
    });
  }

  getTransactionById(id){
    return axios.get(`${this.baseUrl}transactions/${id}.json`);
  }

  createTransaction(transaction) {
    transaction.TransactionId = JSUtils.getRandomID();
    return axios.post(`${this.baseUrl}transactions.json`, { ...transaction });
  }

  updateTransaction(transaction) {
    return axios.patch(`${this.baseUrl}transactions/${transaction.TransactionId}.json`, { ...transaction });
  }

  deleteTransaction(id) {
    return axios.delete(`${this.baseUrl}transactions/${id}.json`)
  }

  getTransactionsFiltered(accountId, categoryId){
    let filterString = '';
    if (accountId) {
      filterString = '?orderBy="AccountId"&equalTo="'+accountId+'"';
    }
    else {
      if (categoryId) {
        filterString = '?orderBy="CategoryId"&equalTo="'+categoryId+'"';
      } 
    }
    return axios.get(`${this.baseUrl}transactions.json${filterString}`)
    .then(res => {
      if (!res.data){
        //If no record found
        return {data: []};
      }
      const arrayResult = Object.keys(res.data).map(record => {
        return {...res.data[record], TransactionId: record,  Date: new Date(res.data[record].Date)} 
      });
      return {data: arrayResult};
    });
  }
}
export default ConnFirebase;
