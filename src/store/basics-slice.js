import { createSlice } from '@reduxjs/toolkit'

export const basicsSlice = createSlice({
  name: 'basics',
  initialState: {
    accountList: [],
    categoryTypeList: [],
    categoryList: [],
    currencyList: [],
  },
  reducers: {
    loadAccounts: (state, action) => {
      state.accountList = action.payload;      
    },
    loadCategoryTypes: (state, action) => {
      state.categoryTypeList = action.payload;
    },
    loadCategories: (state, action) => {
      state.categoryList = action.payload;
    },
    loadCurrencies: (state, action) => {
      state.currencyList = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadAccounts, loadCategoryTypes, loadCategories, loadCurrencies } = basicsSlice.actions

export default basicsSlice.reducer