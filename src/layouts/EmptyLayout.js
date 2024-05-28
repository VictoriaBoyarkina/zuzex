const EmptyLayout = (props) => {
  const { children } = props;
  return (
    <div className="h-100 bg-body-tertiary overflow-hidden">
      { children }
    </div>
  );
};

export default EmptyLayout;
