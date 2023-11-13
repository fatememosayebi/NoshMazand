import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';

type ColProps = {
    children: Array<any>|any,
    col: string,
    gapX: string,
    gapY: string,
    px:number,
    py:number,
    
}
const Col = ({children, col="12",gapX="8",gapY="1",px=0,py=2 }:ColProps) => {
    
    return (
        <div className={`flex col-span-${col} gap-x-${gapX} gap-y-${gapY} px-${px} py-${py}`}>
            {children}
        </div>
    )
}
export default Col