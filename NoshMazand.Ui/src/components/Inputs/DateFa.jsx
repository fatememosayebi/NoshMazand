
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker
} from "react-advance-jalaali-datepicker";
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-jalaali';
// type DateFaProps = {
//     title: string,
//     value: string,
//     onChange:any,
//     w:string,
//   }
const DateFa = ({ title, value, onChange, w = "12", preSelected }) => {//:DateFaProps
  //const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const DatePickerInput = (props) =>
    <input className={`form-input ltr:rounded-l-none rtl:rounded-r-none ${!!value && 'rtl:rounded-l-none'} text-center text-base flex-1`} {...props} />
  const key = value ? value : preSelected ? preSelected : title


  return (
    <div className={`w-${w}/12 flex pl-2 my-1`}>
      <div className="popo bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
        {title}
      </div>
      <DatePicker key={key} 
        inputComponent={DatePickerInput}
        placeholder="انتخاب تاریخ"
        format="jYYYY/jMM/jDD"
        onChange={(e, f) => {
          onChange(moment(f, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'), f)
        }}
        //   id="datePicker"
        preSelected={preSelected || value}
      />
    </div>
  )
}
export default DateFa
