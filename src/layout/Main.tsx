interface MainProps {
    children: JSX.Element
}

const Main = ({ children }: MainProps) => {
  return <div className="container">{children}</div>;
};

export default Main;
