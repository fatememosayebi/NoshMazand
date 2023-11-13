import MaskedInput from 'react-text-mask';


type LabelProps = {
    title: string,
    value: string,
    w: string,
    dir: string,
    textAlign: string,
    afterText: string,
    placeholder: string,
    vertical: boolean
}

const Label = ({ title, value, w = "12", dir = "rtl", textAlign = "right", afterText, placeholder = "-", vertical }: LabelProps) => {
    if (vertical)
        return (
            <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex flex-col min-h-[46px] pl-2 my-1`}>
                {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center rounded-t-md py-2 px-3 font-light border  border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    <bdi>{title}</bdi>
                </div>
                }

                <div dir={dir} className={`form-input rounded-t-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}>
                    {value}
                </div>
            </div>
        )
    else
        return (
            <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex min-h-[46px] pl-2 my-1`}>
                {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    {title}
                </div>
                }

                <div dir={dir} className={`form-input ltr:rounded-l-none rtl:rounded-r-none ${!!afterText && 'rounded-none'} pt-3 text-base text-${textAlign}`}>
                    {value}
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
export default Label