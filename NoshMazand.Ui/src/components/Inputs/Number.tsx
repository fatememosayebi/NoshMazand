import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

type NumberProps = {
    title: string,
    value: number,
    onChange:any,
    max:number,
    w:string,
    dir:string,
    textAlign:string,
    min:number,
    float:boolean,
    step:number,
    afterText:string
  }

const Number = ({ title, value, onChange, min = 0, step = 1, float = false, max = 99999999, w = "12",dir="ltr", textAlign = "left",afterText }:NumberProps) => {
    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            }
            <input type="number" onKeyDown={e=>{ if(e.code==='ArrowDown' || e.code==='ArrowUp') e.preventDefault()}} min={min} dir={dir} step={step} max={max} className={` form-input ltr:rounded-l-none rtl:rounded-r-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}
                value={value} onChange={e => {
                    if (float)
                        onChange(parseFloat(e.target.value))
                    else
                        onChange(parseInt(e.target.value))
                }}
            />
            {!!afterText &&
                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    {afterText}
                </div>
            }
        </div>
    )
}
export default Number