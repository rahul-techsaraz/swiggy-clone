import React, { useState } from 'react'
import uparrow from '../images/Up-Arrow.png';
import ItemList from './ItemList';

export default function RestoCategory({ category,showMenu,setActiveIndex }) {
    return (
        <>
            <div>
              <div className="menulist-container">
                <button >
                    <h3>{category.title} <span>({category.itemCards.length})</span></h3>
                    <img onClick={() => setActiveIndex()} src={uparrow} alt="down-pointer-logo" width="20px" height="20px"/>
                </button>
      </div>
                {showMenu && <ItemList data={category.itemCards} />}
       <div className="space"></div>
                      </div>
      </>
  
  )
}
