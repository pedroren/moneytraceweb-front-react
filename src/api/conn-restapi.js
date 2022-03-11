import { Account, Category, CategoryType, Transaction } from './models';
import { JSUtils } from '../jsutils';
import axios from 'axios';

/*Rules:
"transactions":{
      ".indexOn": ["Date","AccountId", "CategoryId"]
      }
*/

class ConnRestApi {
  getApiKey() {
    return '';
  }
  getBaseUrl() {
    return 'http://localhost:8080/';
  }

  constructor(token) {
    this._token = token;
    this.baseUrl = this.getBaseUrl();
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

  getAxiosConfig() {
    return {
      headers: {
        Authorization: 'Bearer ' + this._token,
      },
    };
  }

  InitializeData() {
    //
  }

  //Basics
  //CategoryType CRUD
  getCategoryTypes() {
    return axios
      .get(`${this.baseUrl}category/types`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          return { data: [] };
        }
        return { data: data };
      });
  }

  //Category CRUD
  getCategories() {
    return axios
      .get(`${this.baseUrl}category`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          return { data: [] };
        }
        return { data: data };
      });
  }
  createCategory(category) {
    return axios.post(
      `${this.baseUrl}category`,
      { ...category },
      this.getAxiosConfig()
    );
  }
  deleteCategory(id) {
    return axios.delete(`${this.baseUrl}category/${id}`, this.getAxiosConfig());
  }
  updateCategory(category) {
    return axios.put(
      `${this.baseUrl}category/${category._id}`,
      {
        ...category,
      },
      this.getAxiosConfig()
    );
  }

  //Account CRUD
  getAccounts() {
    return axios
      .get(`${this.baseUrl}account`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          return { data: [] };
        }

        return { data: data };
      });
  }
  createAccount(account) {
    return axios.post(
      `${this.baseUrl}account`,
      { ...account },
      this.getAxiosConfig()
    );
  }
  deleteAccount(id) {
    return axios.delete(`${this.baseUrl}account/${id}`, this.getAxiosConfig());
  }
  updateAccount(account) {
    return axios.put(
      `${this.baseUrl}account/${account._id}`,
      {
        ...account,
      },
      this.getAxiosConfig()
    );
  }

  //Currency CRUD
  getCurrencies() {
    return axios
      .get(`${this.baseUrl}currency`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          return { data: [] };
        }

        return { data: data };
      });
  }
  createCurrency(currency) {
    return axios.post(
      `${this.baseUrl}currency`,
      { ...currency },
      this.getAxiosConfig()
    );
  }
  deleteCurrency(id) {
    return axios.delete(`${this.baseUrl}currency/${id}`, this.getAxiosConfig());
  }
  updateCurrency(currency) {
    return axios.put(
      `${this.baseUrl}currency/${currency._id}`,
      {
        ...currency,
      },
      this.getAxiosConfig()
    );
  }

  //Transactions
  getTransactions() {
    return axios
      .get(`${this.baseUrl}transaction`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          return { data: [] };
        }
        return { data: data };
      });
  }

  getTransactionById(id) {
    return axios
      .get(`${this.baseUrl}transaction/${id}`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data) {
          //If no record found
          throw new Error('Not Found');
        }
        return { data: data };
      });
  }

  createTransaction(transaction) {
    transaction.TransactionId = JSUtils.getRandomID();
    return axios.post(
      `${this.baseUrl}transaction`,
      { ...transaction },
      this.getAxiosConfig()
    );
  }

  updateTransaction(transaction) {
    return axios.put(
      `${this.baseUrl}transaction/${transaction._id}`,
      { ...transaction },
      this.getAxiosConfig()
    );
  }

  deleteTransaction(id) {
    return axios.delete(
      `${this.baseUrl}transaction/${id}`,
      this.getAxiosConfig()
    );
  }

  getTransactionsFiltered(accountId, categoryId) {
    let filterString = '?orderBy=date';
    if (accountId) {
      filterString = filterString + '&accountId=' + accountId + '';
    }
    if (categoryId) {
      filterString = filterString + '&categoryId=' + categoryId + '';
    }

    return axios
      .get(`${this.baseUrl}transaction${filterString}`, this.getAxiosConfig())
      .then((res) => {
        const data = res.data.data;
        if (!data || data.length === 0) {
          //If no record found
          return { data: [] };
        }
        return { data: data };
      });
  }
  //

  //Authentication
  checkTokenIsValid(token) {
    return axios
      .post(`${this.baseUrl}auth/verifytoken`, { token })
      .then((res) => {
        const status = res.status;
        return status === 200;
      })
      .catch((error) => {
        return false;
      });
  }
  login(data) {
    return axios.post(`${this.baseUrl}auth/login`, { ...data }).then((res) => {
      const status = res.status;
      if (status === 200) {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    });
  }
  signup(data) {
    return axios.post(`${this.baseUrl}auth/signup`, { ...data }).then((res) => {
      const status = res.status;
      return status === 200;
    });
  }
}
export default ConnRestApi;
