import { useSelector } from "react-redux";

const CategoryTypeLabel = props => {
  const categoryList = useSelector((state) => state.basics.categoryTypeList);
  const singleCategory = categoryList.find(item => item._id === props.id);
  const labelText = singleCategory ? singleCategory.name : '';

  return <span>{labelText}</span>
}

export default CategoryTypeLabel;