import React from "react"; 
import "./FinalConfirmation.css";
import "../../../CosMain/CosMainCss.css"
import { Sidebar,Content,BreadCrumb } from '../../../../components'

const FinalConfirmation = () => {
  
    return (
      <div className="clothes-container">
        <div className="layout1">
          <aside>
          <Sidebar activePage={4}/>
          </aside>
          <div className="content1">
            <div className="header2-1">
                <BreadCrumb activePage={4} />
                <h3>4. 최종 확인</h3>
                <hr />
                <br/><br/>
            </div>
            <Content/>
          </div>  
        </div>
      </div>
    );
};

export default FinalConfirmation;