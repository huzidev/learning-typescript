import isObject from 'lodash/isObject';

import Header, { HeaderProps } from 'components/Header';
import Footer from 'components/Footer';

export interface PageProps {
  header?: HeaderProps | boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  footer?: boolean;
}

function Page({ children, header, footer, fullWidth }: PageProps): JSX.Element {
  return (
    <>
      {header && <Header {...(isObject(header) ? header : {})} fullWidth={fullWidth} />}
      {/* children is all the data at home page like between header and footer */}
      {children}
      {footer && <Footer fullWidth={fullWidth} />}
    </>
  );
}

Page.defaultProps = {
  fullWidth: false,
  footer: false,
};

export default Page;
