import {Navbar} from "./pages/Navbar";
import PageFooter from "./pages/PageFooter";

const PageLayout = ({ children }) => {
  return (
    <div className="m-4">
      <Navbar />
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};

export default PageLayout;