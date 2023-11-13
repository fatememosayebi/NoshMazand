import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

type TextareaProps = {
    title: string,
    value: string,
    onChange:any,
    max:number,
    w:string,
    dir:string,
    textAlign:string
  }
  
const Textarea = ({ title, value, onChange, max = 100, w = "12", dir = "rtl", textAlign = "right" }:TextareaProps) => {
    
    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            }
            <textarea dir={dir} className={`form-input ltr:rounded-l-none rtl:rounded-r-none pt-3 text-base text-${textAlign}`}
                value={value} onChange={e => {
                    onChange(e.target.value)
                }}
            />
            {/* <div className="basis-full text-white-dark text-xs">I am the helper text.</div> */}

        </div>
    )
}
export default Textarea