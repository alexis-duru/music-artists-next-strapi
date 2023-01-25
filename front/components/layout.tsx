import Nav from "./nav";

const Layout = ({ children, genres }) => (
  <>
    <Nav genres={genres} />
    {children}
  </>
);

export default Layout;