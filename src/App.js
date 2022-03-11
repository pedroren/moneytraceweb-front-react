import { useEffect } from 'react';
import NavBar from './components/UI/NavBar';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import TransactionPage from './pages/TransactionPage';
import TransactionNewPage from './pages/TransactionNewPage';
import TransactionEditPage from './pages/TransactionEditPage';
import BasicsPage from './pages/BasicsPage';
import AccountPage from './pages/AccountPage';
import CategoryPage from './pages/CategoryPage';
import CurrencyPage from './pages/CurrencyPage';
import BillPage from './pages/BillPage';
import ChartPage from './pages/ChartPage';
import useGlobals from './hooks/use-globals';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useSelector } from 'react-redux';
import Logout from './components/Auth/Logout';
import RequireAuth from './components/UI/RequireAuth';
import MyMessage from './components/UI/MyMessage';

function App() {
  const token = useSelector((state) => state.auth.token);
  const globals = useGlobals();

  useEffect(() => {
    globals.checkStoredLogin()
  }, [globals]);

  useEffect(() => {
    globals.refreshAll();
  }, [token]);

  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/transactions' element={<RequireAuth><TransactionPage /></RequireAuth>}></Route>
        <Route path='/transaction/new' element={<RequireAuth><TransactionNewPage /></RequireAuth>}></Route>
        <Route
          path='/transaction/:id'
          element={<TransactionEditPage />}
        ></Route>
        <Route path='/basics' element={<BasicsPage />}>
          <Route path='Accounts' element={<AccountPage />}></Route>
          <Route path='Categories' element={<CategoryPage />}></Route>
          <Route path='Currencies' element={<CurrencyPage />}></Route>
        </Route>
        <Route path='/bills' element={<BillPage />}></Route>
        <Route path='/charts' element={<ChartPage />}></Route>
        <Route path='/' element={<RequireAuth><TransactionPage /></RequireAuth>}></Route>
      </Routes>
      <MyMessage></MyMessage>
    </div>
  );
}

export default App;
