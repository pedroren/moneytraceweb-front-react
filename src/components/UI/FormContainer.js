const FormContainer = props => {
  const sizeClass = props.size === 'lg' ? 'w-5/6' : props.size === 'md' ? 'w-3/4' : props.size === 'full' ? 'w-full' :'w-1/2'
  return <div className={sizeClass+' p-2 center space-x-4 space-y-4'}>
    {props.children}
  </div>
}

export default FormContainer;