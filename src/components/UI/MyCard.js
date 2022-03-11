import styles from './MyCard.module.css';

const MyCard = (props) => {
  const fullClassName = styles.container+ ' ' + (props.className ?? '');
  return (
    <div className={styles.card+' rounded'}>
      <div className={fullClassName}>{props.children}</div>
    </div>
  );
};

export default MyCard;
