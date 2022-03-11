import styles from './MyButton.module.css';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';

const MyButton = (props) => {
  //props -> variant
  //props -> label
  //props -> submit
  //props -> action -> {delete, edit, new, save}
  //props -> disabled
  const navigate = useNavigate();
  let iconSnippet = null;
  let ariaLabel = props.label;
  const disabled = !!props.disabled;
  let baseClass = props.className ??
  '' + styles.button + ' w-1/2 flex items-center justify-center rounded-md ';
  let finalClass = baseClass;
    
  const bgBlueClass = ' hover:bg-blue-500 bg-blue-600';
  const bgGreenClass = ' hover:bg-green-500 bg-green-600';
  const bgRedClass = ' hover:bg-red-500 bg-red-600';
  const bgGrayClass = ' hover:bg-gray-100 border-gray-300';

  if (props.action) {
    ariaLabel = props.action;
    if (props.action === 'delete') {
      finalClass += bgRedClass+' text-white';
      iconSnippet = <DeleteIcon />;
    } else if (props.action === 'edit') {
      finalClass += bgBlueClass+' text-white';
      iconSnippet = <EditIcon />;
    } else if (props.action === 'new') {
      finalClass += bgBlueClass+' text-white';
      iconSnippet = <AddIcon />;
    } else if (props.action === 'save') {
      finalClass += bgGreenClass+' text-white';
      iconSnippet = <SaveIcon />;
    }
  } else {
    if (props.variant === 'delete') {
      finalClass += bgRedClass+' text-white';
    } else if (props.variant === 'new') {
      finalClass += bgBlueClass+' text-white';
    } else if (props.variant === 'save') {
      finalClass += bgGreenClass+' text-white';
    } else if (props.variant === 'action') {
      finalClass += bgBlueClass+' text-white';
    } else {
      finalClass += bgGrayClass+' border text-black';
    }
  }

  if (props.disabled){
    finalClass = baseClass + ' bg-gray-50 text-gray-500'
  }


  const clickHandler = (event) => {
    if (props.linkto) {
      navigate(props.linkto);
    } else {
      if (props.onClick) {
        props.onClick();
      }
    }
  };

  return (
    <button
      className={finalClass}
      type={props.submit ? 'submit' : 'button'}
      onClick={clickHandler}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {iconSnippet}
      {props.children}
    </button>
  );
};

export default MyButton;
