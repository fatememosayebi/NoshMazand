
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-jalaali';
type DateProps = {
    title: string,
    value: string,
    onChange:any,
    w:string
  }
const DateEn = ({ title, value, onChange, w="12"}:DateProps) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    
    return (
        <div className={`w-${w}/12 flex pl-2 my-1`}>
            <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            {onChange ?<Flatpickr value={value} options={{ locale:'fa', dateFormat: 'Y/m/d', position: isRtl ? 'auto right' : 'auto left' }} className={`form-input ltr:rounded-l-none rtl:rounded-r-none ${!!value && 'rtl:rounded-l-none'} text-center text-base flex-1`} 

            onChange={(date) => onChange(date[0])} />
            :
            <input type="text" disabled className="form-input ltr:rounded-l-none rtl:rounded-r-none pt-3 text-base flex-1 text-center "
            value={moment(value).format('YYYY/MM/DD')} 
        />
    }
            {value && 
            // <span className="text-xs text-white-dark ltr:pl-2 rtl:pr-2  flex-1">{moment(value).format('jYYYY/jMM/jDD')}</span>}
            <input type="text" disabled className="form-input ltr:rounded-l-none rtl:rounded-r-none pt-3 text-base flex-1 text-center "
                value={moment(value).format('jYYYY/jMM/jDD')} 
            />}
        </div>
    )
}
export default DateEn
