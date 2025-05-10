import React from 'react'
import {SideMenu,BrandDesignSearch, } from '../../../components'

import './BrandDPcss.css';


export default function BrandDP() {
  return (
    <div>
         <div className='WholeWrapper'>
            {/*타이틀 제목*/}
            <div className='ContentsWrapper'>
                <div className='Content3'>
                    <SideMenu/>
                    <div className='SearchandResult'>
                        <h2>브랜드 디자인으로 검색</h2>

                        <div style={{marginTop:'50px'}}>                 
                        <BrandDesignSearch/>
                        <BrandDesignSearch/>
                        <BrandDesignSearch/>
                        <p style={{marginTop:'30px'}}>&lt; 1 2 3 4 5 &gt;</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
