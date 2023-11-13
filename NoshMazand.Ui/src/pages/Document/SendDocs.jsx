import { DataTable } from 'mantine-datatable';
import MaskedInput from 'react-text-mask';
import { useEffect, useState, Fragment } from 'react';
import sortBy from 'lodash/sortBy';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useGet, usePost } from '../../services.tsx'
import Page from '../../components/Page';
import PageFooter from '../../components/PageFooter';
import Text from '../../components/Inputs/Text';
import Textarea from '../../components/Inputs/Textarea';
import Select from '../../components/Inputs/Select';
import Row from '../../components/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition, Tab } from '@headlessui/react';
import DateEn from '@/components/Inputs/DateEn';
import Number from '@/components/Inputs/Number';
import FileUpload from '@/components/Inputs/FileUpload';
import ViewSummary from '../Proforma/Partial/ViewSummary';
import DateFa from '@/components/Inputs/DateFa';
import moment from 'moment-jalaali';

const SendDocs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fileNo } = useParams()
    useEffect(() => {
        dispatch(setPageTitle('ارسال اسناد حمل'));
    });
    const post = usePost();
    const [loading, setLoading] = useState(false);
    const [loadingParts, setLoadingParts] = useState(false);
    const [loadingSendDocs, setLoadingSendDocs] = useState(false);
    const [proforma, setProforma] = useState();
    const [parts, setParts] = useState([]);
    const [sendDocs, setSendDocs] = useState([]);
    const state = 'SendDocs'
    const [data, setData] = useState({

    });
     const getSendDocs = () => {
        setLoadingSendDocs(true)
        post('state/get', { fileNo, scope: 'doc', key: 'sendDocs' })
            .then(x => {
                setSendDocs(x.states)
            }).finally(x => setLoadingSendDocs(false))
    }
    const getProforma = () => {
        setLoading(true)
        post('proforma/getByFileNo', { fileNo: fileNo })
            .then(x => {
                setProforma(x)
                setData({ ...data, proformaRef: x.id })
            }).finally(() => setLoading(false))
    }
    useEffect(() => {
        getProforma()
        getSendDocs()
    }, [])
    useEffect(() => {
        if (data?.partRef && sendDocs && proforma) {
            let _sendDoc = sendDocs.find(x => x.partRef == data?.partRef)
            
            if (_sendDoc)
                setData({  proformaRef: proforma.id, ..._sendDoc,partRef:data.partRef })
            else
                setData({ proformaRef: proforma.id,partRef:data.partRef })
        }
        else {
            setData({ })
            
        }
    }, [data?.partRef, sendDocs])
    console.log('partRef',data?.partRef,data?.etDraft)
    return (
        <Page title={"زمان بندی دریافت اسناد حمل"}>
            <ViewSummary proforma={proforma} />
            <Row>
                <Select entity={'part'} proformaRef={proforma?.id} loading={loading} title="پارت حمل" w="6"
                    value={data?.partRef} onChange={(e, v) => setData({ ...data, partRef: e })} />

            </Row>


            <DateFa title="ET دریافت پیش نویس اسناد" w="4" preSelected={data.etDraft ? moment(data.etDraft, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : ''} value={data.etDraft} onChange={e => setData({ ...data, etDraft: e })} />
            <DateFa title="AT دریافت پیش نویس اسناد" w="4" preSelected={data.atDraft ? moment(data.atDraft).format('jYYYY/jMM/jDD') : ''} value={data.atDraft} onChange={e => setData({ ...data, atDraft: e })} />
            <DateFa title="ET دریافت اصل اسناد" w="4" preSelected={data.etRecieve ? moment(data.etRecieve).format('jYYYY/jMM/jDD') : ''} value={data.etRecieve} onChange={e => setData({ ...data, etRecieve: e })} />
            <DateFa title="AT دریافت اصل اسناد" w="4" preSelected={data.atRecieve ? moment(data.atRecieve).format('jYYYY/jMM/jDD') : ''} value={data.atRecieve} onChange={e => setData({ ...data, atRecieve: e })} />
            <DateFa title="تاریخ ارسال اسناد به بانک" w="4" preSelected={data.sendBank ? moment(data.sendBank).format('jYYYY/jMM/jDD') : ''} value={data.sendBank} onChange={e => setData({ ...data, sendBank: e })} />
            <DateFa title="تاریخ دریافت اسناد از بانک" w="4" preSelected={data.recieveBank ? moment(data.recieveBank).format('jYYYY/jMM/jDD') : ''} value={data.recieveBank} onChange={e => setData({ ...data, recieveBank: e })} />
            <DateFa title="تاریخ ارسال اسناد به ترخیصکار" w="4" preSelected={data.sendReleaser ? moment(data.sendReleaser).format('jYYYY/jMM/jDD') : ''} value={data.sendReleaser} onChange={e => setData({ ...data, sendReleaser: e })} />

            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'></h2>
            <button type="button" className="btn btn-primary btn-lg text-white mr-auto" onClick={e => {
                // console.log(data)
                // return
                setLoading(true)
                post('state/add', { state: state, proformaRef: proforma.id, data: JSON.stringify(data) })
                    .then(x => {
                        navigate(-1)
                    })
                    .finally(() => setLoading(false))
            }}>
                {loading && <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 mx-4 inline-block rounded-full bg-white"></span>}
                {!loading && <span>ثبت تغییرات</span>}
            </button>
        </Page>
    );
};

export default SendDocs;
