import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Daf from './Daf';
import TopCop from './top/TopCop';
import Welcome from './Welcome';
import Mainp from './Mainp';
import CosMain from './CosMain';
import SignIn from './SignIn';
import SignIn2 from './SignIn2';
import GoodSignUp from './GoodSignUp';
import SideMenu from './SideMenu';
import BrandDesignSearch from './BrandDesignSearch';
import CosMain2 from './sujeong/CosMain2';
import SearchBar from './SearchBar';
import Clothes from './components/Clothes/Clothes';
import Navbar from './components/Navbar/Navbar';
import Carousel2 from './sujeong/Carousel2';
import Carousel from './sujeong/Carousel';
import Uploads from './zoo/Upload';
import SearchBar2 from './SearchBar2';
import BrandDP from './BrandDP';


function App() {
  return (
    <div className="App">
    <Router>
      <Routes>

        <Route path="/" element={<Mainp />} />
        <Route path="/CosMain" element={<CosMain />} />
        <Route path="/Sign" element={<SignIn />} />
        <Route path="/Sign2" element={<SignIn2 />} />
        <Route path="/GoodSign" element={<GoodSignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/SideMenu" element={<SideMenu />} />
        <Route path="/Brand" element={<BrandDesignSearch/>} />
        <Route path="/cosmain2" element={<CosMain2/>} />
        <Route path="/SearchBar" element={<SearchBar/>}/>
        <Route path="/BrandDP" element={<BrandDP/>}/>


        {/*아래 두개는 김세정님꺼*/}
        <Route path="/Clothes" element={<Clothes/>}/>
        <Route path="/Navbar" element={<Navbar/>}/>
        {/*아래두개는 양수정님꺼*/}
        <Route path="/Carousel2" element={<Carousel2/>}/>
        <Route path="/Carousel" element={<Carousel/>}/>
        {/*아래는 주호석님꺼*/}
        <Route path="/Upload" element={<Uploads/>}/>
        <Route path="/SearchBar2" element={<SearchBar2/>}/>



      </Routes>
    </Router>
    </div>
  );
}

export default App;