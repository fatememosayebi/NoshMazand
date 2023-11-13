import MaskedInput from 'react-text-mask';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

type TextProps = {
    title: string,
    value: string,
    onChange: any,
    max: number,
    w: string,
    dir: string,
    textAlign: string,
    afterText: string,
    disabled: boolean,
    mask: any,
    placeholder: string
}

const Text = ({ title, value, onChange, max = 100, w = "12", dir = "rtl", textAlign = "right", afterText, disabled = false, mask, placeholder = "" }: TextProps) => {
    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            }
            {mask ?
                <MaskedInput
                    type="text"
                    dir={dir}
                    placeholder={placeholder}
                    className={`form-input ltr:rounded-l-none rtl:rounded-r-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}
                    mask={mask}  value={value} disabled={disabled} onChange={e => {
                        onChange(e.target.value)
                    }}
                />
                :
                <input type="text" dir={dir} max={max} className={`form-input ltr:rounded-l-none rtl:rounded-r-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}
                    value={value} disabled={disabled} onChange={e => {
                        onChange(e.target.value)
                    }}
                />
            }
            {!!afterText &&
                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    {afterText}
                </div>
            }
            {/* <div className="basis-full text-white-dark text-xs">I am the helper text.</div> */}

        </div>
    )
}
export default Text