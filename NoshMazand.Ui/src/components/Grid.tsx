import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
type GridProps = {
    children: Array<any>|any,
    title: string,
    gapX: string,
    gapY: string,
    col: string,
    px:number,
    py:number,
    headerChildren:any
    
}
const Grid = ({children, col="12",gapX="1",gapY="1",px=0,py=2 }:GridProps) => {
    
    return (
        <div className={` w-full grid grid-cols-${col} gap-x-${gapX} gap-y-${gapY} px-${px} py-${py}`}>
            {children}
        </div>
    )
}
export default Grid