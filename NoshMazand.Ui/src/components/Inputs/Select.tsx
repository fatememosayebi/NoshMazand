import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePost } from '@/services'
type SelectProps = {
    title: string,
    entity: string,
    items: any,
    scope: string,
    name: string,
    loading: boolean,
    btnShow: boolean,
    btnText: string,
    btnColor: string,
    btnOnClick: any,
    value: string,
    onChange: any,
    max: number,
    w: string,
    dir: string,
    textAlign: string,
    style: string,
    proformaRef: number,
    companyType: number
}

const Select = ({ entity, title, items, value, onChange, w = "12", style = '1', scope, name, loading = false, btnShow = false, btnText, btnOnClick, btnColor = "primary", proformaRef, companyType }: SelectProps) => {
    const [localLoading, setLocalLoading] = useState(false)
    const [localItems, setLocalItems] = useState<Array<any>>()
    const post = usePost()
    useEffect(() => {
        if (scope) {
            setLocalLoading(true)
            post('general/getMetadataByScope', { scope })
                .then((x: any) => {
                    setLocalItems(x.map((xx: any) => { return ({ ...xx, title: xx.value }) }))
                }).finally(() => setLocalLoading(false))
        }
        if (name) {
            setLocalLoading(true)
            post('general/getMetadataByName', { name })
                .then((x: any) => {
                    console.log(x)
                    setLocalItems(x.map((xx: any) => { return ({ ...xx, title: xx.value }) }))
                }).finally(() => setLocalLoading(false))
        }
        if (entity) {
            if (entity === 'loadDischargePlaceNotIran') {
                setLocalLoading(true)
                post('general/getPorts', { type: 1, notIran: true })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx,
                                title:
                                    style == '1' ?
                                        `${xx.country?.tag1} -  ${xx.nameFa || '#'} (${xx.nameEn || '#'})`
                                        : style == '2' ?
                                            `${xx.nameFa}`
                                            : style == '3' ?
                                                `${xx.country?.tag1} -  ${xx.provinceFa || '#'} (${xx.provinceEn || '#'})`
                                                : xx.nameFa
                            })
                        }))
                    }).finally(() => setLocalLoading(false))
            }
            if (entity === 'loadDischargePlaceIran') {
                setLocalLoading(true)
                post('general/getPorts', { type: 1, onlyIran: true })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx,
                                title:
                                    style == '1' ?
                                        `${xx.country?.tag1} -  ${xx.nameFa || '#'} (${xx.nameEn || '#'})`
                                        : style == '2' ?
                                            `${xx.nameFa}`
                                            : style == '3' ?
                                                `${xx.country?.tag1} -  ${xx.provinceFa || '#'} (${xx.provinceEn || '#'})`
                                                : xx.nameFa
                            })
                        }))
                    }).finally(() => setLocalLoading(false))
            }
            if (entity === 'border') {
                setLocalLoading(true)
                post('general/getPorts', { type: 2 })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx,
                                title:
                                    style == '1' ?
                                        `${xx.country?.tag1} -  ${xx.nameFa || '#'} (${xx.nameEn || '#'})`
                                        : style == '2' ?
                                            `${xx.nameFa}`
                                            : style == '3' ?
                                                `${xx.country?.tag1} -  ${xx.provinceFa || '#'} (${xx.provinceEn || '#'})`
                                                : xx.nameFa
                            })
                        }))
                    }).finally(() => setLocalLoading(false))
            }
            if (entity === 'part') {
                setLocalLoading(true)
                post('state/getParts', { proformaRef, partType: 1 })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx,
                                id: xx.partRef
                            })
                        }))
                    }).finally(() => setLocalLoading(false))
            }
            if (entity === 'currency') {
                setLocalLoading(true)
                post('state/getParts', { proformaRef, partType: 2 })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx,
                                id: xx.partRef
                            })
                        }))
                    }).finally(() => setLocalLoading(false))
            }
            if (entity == "company" && !!companyType) {
                setLocalLoading(true)
                post('company/getAll', { companyType })
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx, title: xx.nameFa + ' ' + xx.nameEn
                            })
                        }))
                    }).finally(() => setLocalLoading(false))


            }
            if (entity === "broker") {
                setLocalLoading(true)
                post('ClearanceBroker/getAll', {})
                    .then((x: any) => {
                        let _x = [...x]
                        setLocalItems(_x.map((xx: any) => {
                            return ({
                                ...xx, title: xx.firstName + ' ' + xx.lastName
                            })
                        }))
                    }).finally(() => setLocalLoading(false))

       
        }
    }
    }, [proformaRef])

    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>}
            {/* <input type="text" max={max} className="form-input ltr:rounded-l-none rtl:rounded-r-none py-2.5 text-base"
                value={value} onChange={e => {
                    onChange(e.target.value)
                }}
            /> */}
            {loading || localLoading ?
                <span className="w-3 h-3 m-auto mb-10">
                    <span className="animate-ping inline-flex h-full w-full rounded-full bg-info"></span>
                </span>
                :

                <select value={value} className={`form-input ${btnShow && 'ltr:rounded-r-none rtl:rounded-l-none'} ltr:rounded-l-none rtl:rounded-r-none pt-3 text-base`} onChange={e => {
                    let selectedItem: Array<any> = [];
                    if (items)
                        selectedItem = items.find((x: any) => x.id == e.target.value)
                    else if (localItems)
                        selectedItem = localItems.find((x: any) => x.id == e.target.value)
                    onChange(e.target.value, selectedItem)
                }}>
                    <option key={-1} value={''}>...</option>
                    {
                        items && !scope && !name && !entity ? items.map((x: any, i: number) => {
                            return (<option key={i} value={x.id}>{x.title}</option>)
                        })
                            :
                            localItems && (!!scope || !!name || !!entity) ? localItems.map((x, i) => {
                                return (<option key={i} value={x.id}>{x.title}</option>)
                            }) :
                                <span>خطا</span>
                    }
                </select>
            }
            {!!btnShow &&
                <button type="button" className={`btn btn-${btnColor} ltr:rounded-l-none rtl:rounded-r-none`} onClick={e => {
                    e.preventDefault();
                    if (btnOnClick) btnOnClick(e)
                }}>{btnText}</button>
            }
        </div>
    )
}
export default Select