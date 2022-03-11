import React from "react";
import { useSelector } from "react-redux";
import MyButton from '../UI/MyButton';

const AccountList = props => {
  const accountList = useSelector((state) => state.basics.accountList);

  return (
    <React.Fragment>
      <hr />
      <ul>
        {accountList && accountList.map((item) => {
          return <li className='flex flex-row space-evenly' key={item._id}>
            <div className='flex-grow'>{item.name}</div>
            <div className='flex flex-row'>
            <MyButton action='edit' onClick={props.onEdit && props.onEdit.bind(null,item._id)}></MyButton>
            <MyButton action='delete' onClick={props.onDelete && props.onDelete.bind(null,item._id)}></MyButton>
          </div>
          </li>
        })}
      </ul>
    </React.Fragment>
  )
}

export default AccountList;