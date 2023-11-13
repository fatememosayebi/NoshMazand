import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
type RowProps = {
    children: Array<any>|any,
    title: any,
    gapX: any,
    gapY: any,
    px:number,
    py:number,
    w:string,
    itemsAlign:any,
    wrap:string
}
const Row = ({children, w="12",gapX="1",gapY="1",px=0,py=2,itemsAlign="center",wrap="nowrap" }:RowProps) => {
    
    return (
        <div className={`flex w-full flex-${wrap} items-${itemsAlign} flex-w gap-x-${gapX} gap-y-${gapY} px-${px} py-${py}`}>
            {children}
        </div>
    )
}
export default Row