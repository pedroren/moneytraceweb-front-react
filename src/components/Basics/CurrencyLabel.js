import { useSelector } from "react-redux";

const CurrencyLabel = props => {
  const currencyList = useSelector((state) => state.basics.currencyList);
  const singleCurrency = currencyList.find(item => item._id === props.id);
  const labelText = singleCurrency ? singleCurrency.name : '';

  return <span>{labelText}</span>
}
export default CurrencyLabel;