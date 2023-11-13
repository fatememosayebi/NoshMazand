import { DataTable } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import {  usePost } from '../../services.tsx'
import Page from '../../components/Page';
import Text from '../../components/Inputs/Text';
import Row from '../../components/Row';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition, Tab } from '@headlessui/react';

const CreateCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        accounts: []
    })
    const [account, setAccount] = useState({});
    useEffect(() => {
        dispatch(setPageTitle('اطلاعات پایه - ایجاد شرکت'));
    });
    const post = usePost();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    //const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    //const [recordsData, setRecordsData] = useState(initialRecords);

    //const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });


    return (
        <Page title={"مدیریت مشتریان"}>

<h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'>اطلاعات شرکت</h2>
            <Text w='6' value={data.companyName} title="نام شرکت" onChange={e => setData({ ...data, companyName: e })} />
            <Text w='6' value={data.companyTel} title="تلفن شرکت" onChange={e => setData({ ...data, companyTel: e })} />
            <Text  value={data.address} title="آدرس شرکت" onChange={e => setData({ ...data, address: e })} />
            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'></h2>
            <button type="button" className="btn btn-primary btn-lg text-white mr-auto" onClick={e => {
                setLoading(true)
                post('ClearanceBroker/create', {
                    ...data, accounts: data.accounts.map(x => {
                        return ({
                            bankName: x.bankName,
                            branchName: x.branchName,
                            branchCode: x.branchCode,
                            accountNo: x.accountNo,
                            cardNo: x.cardNo,
                            shabaNo: x.shabaNo,
                        })
                    })
                })
                    .then(x => {
                        navigate(-1)
                    })
                    .finally(() => setLoading(false))
            }}>
                {loading && <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 mx-4 inline-block rounded-full bg-white"></span>}
                {!loading && <span>ثبت شرکت</span>}
            </button>
        </Page>
    );
};

export default CreateCompany;

