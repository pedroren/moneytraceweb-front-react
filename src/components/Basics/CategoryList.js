import { useSelector } from 'react-redux';
import React from 'react';
import MyButton from '../UI/MyButton';
import CategoryTypeLabel from './CategoryTypeLabel';

const CategoryList = (props) => {
  const categoryList = useSelector((state) => state.basics.categoryList);
  return (
    <React.Fragment>
      <hr />
      <ul>
        {categoryList && categoryList.map((item) => {
          return <li className='flex flex-row space-evenly' key={item._id}>
          <div className='flex-grow'>{item.name}</div>
          <div className='flex-grow'><CategoryTypeLabel id={item.categoryType} /></div>
          <div className='flex flex-row'>
            <MyButton action='edit' onClick={props.onEdit && props.onEdit.bind(null,item._id)}></MyButton>
            <MyButton action='delete' onClick={props.onDelete && props.onDelete.bind(null,item._id)}></MyButton>
          </div>
        </li>
        })}
      </ul>
    </React.Fragment>
  );
};

export default CategoryList;
