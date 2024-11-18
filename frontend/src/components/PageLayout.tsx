import {Navbar} from "../components/navigation/desktop/Navbar";
import PageFooter from "./PageFooter";

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