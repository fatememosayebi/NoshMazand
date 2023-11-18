import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { usePost } from '../../services.tsx'
import Page from '../../components/Page';
import Text from '../../components/Inputs/Text';
import { useNavigate } from 'react-router-dom';


const CompanyEdit = ({ company, onDone }) => {
    console.log(company)
    const [data, setData] = useState(broker)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [account, setAccount] = useState({});
    //const post = usePost();
    return (
        <div className='panel flex flex-wrap'>
            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'>ویرایش اطلاعات فروشنده</h2>
            <Text w='4' value={data.firstName} title="نام" onChange={e => setData({ ...data, firstName: e })} />
            <Text w='4' value={data.lastName} title="نام خانوادگی" onChange={e => setData({ ...data, lastName: e })} />
            <Text w='4' value={data.nCode} title="کد ملی" onChange={e => setData({ ...data, nCode: e })} />
            <Text w='4' value={data.email} title="ایمیل" onChange={e => setData({ ...data, email: e })} />
            <Text w='4' value={data.phoneNumber} title="شماره همراه" onChange={e => setData({ ...data, phoneNumber: e })} />
            <Text w='4' value={data.telephone} title= "تلفن" onChange={e => setData({ ...data, telephone: e })} />
            <Text w='6' value={data.fax} title="فکس" onChange={e => setData({ ...data, fax: e })} />
            <Text w='6' value={data.postAddress} title="آدرس پستی" onChange={e => setData({ ...data, postAddress: e })} />
            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'></h2>
            <button type="button" className="btn btn-primary btn-lg text-white mr-auto" onClick={e => {
                setLoading(true)
                post('ClearanceBroker/update', data)
                    .then(x => {
                        console.log(x)
                        onDone()
                    })
                    .finally(() => setLoading(false))
            }}>
                {loading && <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 mx-4 inline-block rounded-full bg-white"></span>}
                {!loading && <span>ثبت تغییرات</span>}
            </button>
        </div>
    )
}
const Company = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 useEffect(() => {
    dispatch(setPageTitle('اطلاعات پایه - اطلاعات مشتریان'));
 });
    const post = usePost();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const getList = () => {
        setLoading(true)
        post('Company/get', {})
            .then(x => {
                setList(x)
            }).finally(x => setLoading(false))
    }

    useEffect(() => {
        getList()
    }, [])


    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    //const [recordsData, setRecordsData] = useState(initialRecords);

    //const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });


    return (
        <Page title={"مدیریت مشتریان"}>
            <div className="panel w-full">
                <button type="button" className="btn btn-primary btn-lg text-white mr-auto" onClick={e => {
                    navigate('create')
                }}>ثبت شرکت جدید
                </button>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        loaderSize={'xl'} loaderVariant='dots' loaderBackgroundBlur={'3'}
                        fetching={loading}
                        className="whitespace-nowrap table-hover"
                        records={list}
                        columns={[

                        //   
                        //    { accessor: 'firstName', width: '10%', title: 'نام', sortable: false, render: ({ firstName }) => <strong className="text-info">{firstName}</strong> },
                        //    { accessor: 'lastName', width: '10%', title: 'نام خانوادگی', sortable: false, render: ({ lastName }) => <span className="text-dark">{lastName}</span> },
                        //    { accessor: 'nCode', width: '10%', title: 'کدملی', sortable: false, render: ({ nCode }) => <span className="text-dark">{nCode}</span> },
                        //    { accessor: 'email', width: '10%', title: 'ایمیل', sortable: false, render: ({ email }) => <span className="text-dark">{email}</span> },
                        //    { accessor: 'phoneNumber', width: '10%', title: 'شماره همراه', sortable: false, render: ({ phoneNumber }) => <span className="text-dark">{phoneNumber}</span> },
                        //    { accessor: 'telephone', width: '10%', title: 'تلفن', sortable: false, render: ({ telephone }) => <span className="text-dark">{telephone}</span> },
                        //    { accessor: 'fax', width: '10%', title: 'فکس', sortable: false, render: ({ fax }) => <span className="text-dark">{fax}</span> },
                        //    { accessor: 'postAddress', width: '30%', title: 'آدرس پستی', sortable: false, render: ({ postAddress }) => <span className="text-dark">{postAddress}</span> },
                        ]}
                        totalRecords={list.length}
                        recordsPerPage={500}
                        //onPageChange={(p) => setPage(p)}
                        //recordsPerPageOptions={PAGE_SIZES}
                        //onRecordsPerPageChange={setPageSize}
                        //sortStatus={sortStatus}
                        //onSortStatusChange={setSortStatus}
                        minHeight={200}
                       rowExpansion={{
                            content: ({ record, collapse }) => (
                                 <CompanyEdit
                                     company={record}
                                    onDone={(data) => {

                                        //   const index = companies.findIndex((c) => c.id === data.id);
                                        //   setCompanies([...companies.slice(0, index), data, ...companies.slice(index + 1)]);
                                         collapse();
                                        // getList()
                                     }}
                                 //onCancel={collapse}
                                />
                            ),
                       }}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </Page>
    );
};

export default Company;
