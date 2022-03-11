import { useState } from 'react';
import { useSelector } from 'react-redux';
import DropDownList from '../UI/DropDownList';
import MyButton from '../UI/MyButton';
import MyCard from '../UI/MyCard';
import MyDateControl from '../UI/MyDateControl';
import styles from './TransFilterForm.module.css';

const TransFilterForm = (props) => {
  const accountList = useSelector((state) => state.basics.accountList);
  const categoryList = useSelector((state) => state.basics.categoryList);
  const [accountId, setAccountId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  return (
    <MyCard>
      <form className={styles.filterform}>
        <div className='w-1/4'>
          <MyDateControl
            label='From'
            onChange={(value) => {
              setDateFrom(value);
            }}
          />
        </div>
        <div className='w-1/4'>
          <MyDateControl
            label='To'
            onChange={(value) => {
              setDateTo(value);
            }}
          />
        </div>
        <div className='w-1/4'>
          <DropDownList
            data={accountList}
            label='Account'
            valueField='_id'
            displayField='name'
            onChange={(value) => {
              setAccountId(value);
            }}
          ></DropDownList>
        </div>
        <div className='w-1/4'>
          <DropDownList
            data={categoryList}
            label='Category'
            valueField='_id'
            displayField='name'
            onChange={(value) => {
              setCategoryId(value);
            }}
          ></DropDownList>
        </div>
        <MyButton
          onClick={
            props.onChange &&
            props.onChange.bind(null, {
              dateFrom,
              dateTo,
              accountId,
              categoryId,
            })
          }
        >
          Filter
        </MyButton>
      </form>
    </MyCard>
  );
};

export default TransFilterForm;
