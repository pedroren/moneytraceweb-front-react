const PageContainer = (props) => {
  return (
    <div className='w-full flex items-center justify-center mt-6'>
      <div className='w-3/4'>{props.children}</div>
    </div>
  );
};

export default PageContainer;
