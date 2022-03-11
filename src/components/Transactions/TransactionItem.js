import AccountLabel from '../Basics/AccountLabel';
import CategoryLabel from '../Basics/CategoryLabel';
import FancyDate from '../UI/FancyDate';
import MyButton from '../UI/MyButton';
import MyCard from '../UI/MyCard';
import NumberFormatter from '../UI/NumberFormatter';
import styles from './TransactionItem.module.css';

const TransactionItem = (props) => {
  //props => data: Transaction
  const data = props.data;
  return (
    <li>
      <MyCard className={styles.container}>
        <div className='grid grid-flow-col grid-rows-2 grid-cols-5 gap-4 min-w-400'>
          <div
            className={
              styles.date +
              ' flex flex-wrap col-start-1 row-span-2 content-center'
            }
          >
            <FancyDate date={data.date}></FancyDate>
          </div>
          <div className={styles.name + ' row-start-1 col-start-2 col-span-2'}>
            <b>{data.name}</b>
          </div>
          <div
            className={
              styles.amount +
              ' row-start-1 col-start-4 row-span-2 content-center'
            }
          >
           <b> <NumberFormatter value={data.amount} /></b>
          </div>
          <div className={styles.name + ' row-start-2 col-start-2 col-span-1'}>
            <CategoryLabel id={data.categoryId} />
          </div>
          <div className={styles.name + ' row-start-2 col-start-3 col-span-1'}>
            <AccountLabel id={data.accountId} />
          </div>
          <div className='flex flex-wrap content-evenly row-span-2 col-start-5'>
            <MyButton
              action='edit'
              linkto={`/transaction/${data._id}`}
            ></MyButton>
            <MyButton
              action='delete'
              onClick={
                props.onDelete && props.onDelete.bind(null, data._id)
              }
            ></MyButton>
          </div>
        </div>
      </MyCard>
    </li>
  );
};

export default TransactionItem;
