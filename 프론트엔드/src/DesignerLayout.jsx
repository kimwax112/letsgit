import {Header,Navbar,ScrollToTopBtn,Footer} from './components';

export default function DesignerLayout({children}) {
  return (
    <>
    
    
    {children}
    <ScrollToTopBtn/>
    <Footer />
    </>
  )
}