import { useSelector } from "react-redux";

const AccountLabel = props => {
  const accountList = useSelector((state) => state.basics.accountList);
  const singleAccount = accountList.find(item => item._id === props.id);
  const labelText = singleAccount ? singleAccount.name : '';

  return <span>{labelText}</span>
}
export default AccountLabel;