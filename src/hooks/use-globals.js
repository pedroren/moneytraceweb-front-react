import { useDispatch, useSelector } from 'react-redux';
import MoneyTraceApi from '../api';
import {
  loadAccounts,
  loadCategoryTypes,
  loadCategories,
  loadCurrencies,
} from '../store/basics-slice';
import { setLogin, setLogout } from '../store/auth-slice';
import { setError, setMessage } from '../store/ui-slice';

const useGlobals = () => {
  const currentToken = useSelector((state) => state.auth.token);
  const api = new MoneyTraceApi(currentToken);
  const dispatch = useDispatch();

  const refreshAll = () => {
    if (currentToken) {
      refreshCategorTypes();
      refreshCategories();
      refreshCurrencies();
      refreshAccounts();
    }
  };
  const refreshCategorTypes = () => {
    api.getCategoryTypes().then((res) => {
      dispatch(loadCategoryTypes(res.data));
    });
  };
  const refreshCategories = () => {
    api.getCategories().then(
      (res) => {
        console.log('getCategories', res.data);
        dispatch(loadCategories(res.data));
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const refreshAccounts = () => {
    api.getAccounts().then(
      (res) => {
        // if (!res.data || res.data.length === 0) {
        //   //First time initialization
        //   api.InitializeData();
        //   refreshAll();
        // }
        dispatch(loadAccounts(res.data));
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const refreshCurrencies = () => {
    api.getCurrencies().then(
      (res) => {
        console.log('getCurrencies', res.data);
        dispatch(loadCurrencies(res.data));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //Check for token stored locally on browser
  const checkStoredLogin = () => {
    const localToken = window.localStorage.getItem('token');
    if (localToken) {
      api.checkTokenIsValid(localToken).then((result) => {
        console.log('checkStoredLogin', result);
        if (result) {
          setStoredLogin(localToken);
        } else {
          setLocalLogout();
        }
      });
    }
  };

  //Set logged in state (browser and redux)
  const setStoredLogin = (token) => {
    window.localStorage.setItem('token', token);
    dispatch(setLogin(token));
  };

  //Set logout in state (browser and redux)
  const setLocalLogout = () => {
    window.localStorage.removeItem('token');
    dispatch(setLogout());
    dispatch(loadCategories([]));
    dispatch(loadAccounts([]));
    dispatch(loadCurrencies([]));
  };

  const showMessage = (message) => {
    dispatch(setMessage(message));
  };

  const showError = (err) => {
    //extracting error message 
    const errMessage = err.message;
    dispatch(setError(errMessage))
  };

  const clearMessage = () => {
    dispatch(setMessage(null));
  };

  return {
    refreshAll,
    refreshCategorTypes,
    refreshCategories,
    refreshAccounts,
    refreshCurrencies,
    checkStoredLogin,
    setStoredLogin,
    setLocalLogout,
    showMessage,
    showError,
    clearMessage,
  };
};

export default useGlobals;
