import React from 'react'
import "./SearchBarcss.css"

export default function SearchBar() {
  return (
    <div>
        <div className='FindWithDesign'>
        <div className='SearchDrop'>이미지소스</div>
        <input type='text' className='FindWithDesignSearchBar' style={{borderRadius:'50px'}}></input>
        </div>
    </div>
  )
}
