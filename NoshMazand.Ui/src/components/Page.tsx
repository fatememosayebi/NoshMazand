import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import {BiArrowBack} from 'react-icons/bi'
type PageProps = {
    children: Array<any>|any,
    title: string,
    gapX: string,
    gapY: string,
    px:number,
    py:number,
    headerChildren:any,
    backLink:boolean
}
const Page = ({ children, title, headerChildren, gapX = "2", gapY = "2", px = 2, py = 2,backLink=true }:PageProps) => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    useEffect(() => {
        dispatch(setPageTitle(title));
    });
    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    return (
        <div className="panel p-0">
            <div className="flex flex-col items-center justify-between">
                <div className='w-full  p-4 flex items-center'>
                    <h5 className=" text-lg dark:text-white-light">{title}</h5>
                    {backLink &&<div className='mr-auto cursor-pointer' onClick={e=>navigate(-1)}> <BiArrowBack /></div>}
                </div>

            </div>
            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
            <div className={`flex flex-wrap px-${px} py-${py}`}>
                {children}
            </div>

            
        </div>
    )
}
export default Page