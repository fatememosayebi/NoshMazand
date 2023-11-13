import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const PageFooter = ({children}) => {
    return (<>
        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
        <div className="flex flex-col items-center justify-between">
            <div className='w-full  p-4'>
                {children}

            </div>

        </div>
    </>)
}
export default PageFooter