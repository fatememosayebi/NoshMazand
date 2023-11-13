import MaskedInput from 'react-text-mask';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { isTemplateSpan } from 'typescript';

type ChackboxProps = {
    title: string,
    value: Array<any>,
    onChange: any,
    max: number,
    w: string,
    dir: string,
    textAlign: string,
    afterText: string,
    disabled: boolean,
    mask: any,
    placeholder: string,
    items:Array<any>
}

const Checkbox = ({ title,items, value, onChange, w = "12", dir = "rtl", textAlign = "right", afterText, disabled = false, mask, placeholder = "" }: ChackboxProps) => {
    const [checkedList, setCheckedList] = useState<Array<any>>(value);
    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            }
            <div className={`flex gap-2 flex-wrap form-input ltr:rounded-l-none rtl:rounded-r-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}>
            {items.map((x,i)=>{
                return(<label className="flex items-center cursor-pointer" key={i}>
                <input type="checkbox" className="form-checkbox" 
                onChange={(e) => {
                    if (e.target.checked) {
                        let _lst = [...checkedList];
                        _lst.push(x)
                        setCheckedList(_lst);
                        if (onChange) onChange(_lst)
                    }
                    else {
                        let _lst = [...checkedList];
                        _lst = _lst.filter(xx => xx.id != x.id);
                        if (onChange) onChange(_lst)
                        setCheckedList(_lst);
                    }
                    // let index = value.findIndex(z => z == item.value);
                    // if (onChange) {
                    //     if (index === -1) onChange([...value, item.value])
                    //     else onChange([...value.filter(s => s != item.value)]);
                    // }
                }}
                checked={checkedList.some(xx => { return xx.id === x.id })}
                disabled={disabled}/>
                <span className=" text-white-dark">{x.title}</span>
            </label>)
            })}
            </div>
            {!!afterText &&
                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    {afterText}
                </div>
            }
            {/* <div className="basis-full text-white-dark text-xs">I am the helper text.</div> */}

        </div>
    )
}
export default Checkbox