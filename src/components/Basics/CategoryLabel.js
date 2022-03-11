import { useSelector } from "react-redux";

const CategoryLabel = props => {
  const categoryList = useSelector((state) => state.basics.categoryList);
  const singleCategory = categoryList.find(item => item._id === props.id);
  const labelText = singleCategory ? singleCategory.name : '';

  return <span>{labelText}</span>
}
export default CategoryLabel;