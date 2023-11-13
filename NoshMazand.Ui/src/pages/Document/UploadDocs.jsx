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

const Doc = ({ scope, title, partRef, oldFile ,proformaRef}) => {
    const post = usePost();
    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState()
    return (<Row>
        <FileUpload w='4' scope={scope} value={doc} title={title} onChange={e => setDoc(e)} />
        {!!oldFile &&
            <button type="button" className="btn btn-primary ml-auto text-white" onClick={e => {

            }}>دانلود
            </button>
        }
        <button type="button" className="btn btn-primary btn-lg text-white mr-auto" onClick={e => {
            setLoading(true)
            post('state/add', { state: 'Upload', proformaRef: proformaRef, data: JSON.stringify({ doc: scope, partRef: partRef, files: doc }) })
                .then(x => {
                    //navigate(-1)
                })
                .finally(() => setLoading(false))
        }}>
            {loading && <span className="animate-ping w-3 h-3 ltr:mr-4 rtl:ml-4 mx-4 inline-block rounded-full bg-white"></span>}
            {!loading && <span>آپلود</span>}
        </button>
    </Row>)
}
const UploadDocs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { fileNo } = useParams()
    useEffect(() => {
        dispatch(setPageTitle('بارگذاری اسناد حمل'));
    });
    const post = usePost();
    const [loading, setLoading] = useState(false);
    const [loadingParts, setLoadingParts] = useState(false);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [proforma, setProforma] = useState();
    const [parts, setParts] = useState([]);
    const [uploads, setUploads] = useState([]);
    const state = 'UploadDocs'
    const [data, setData] = useState({
        files: []
    });
    const [doc_bl, setDoc_bl] = useState({ loading: false })
    const [doc_co, setDoc_co] = useState({ loading: false })
    const [doc_ci, setDoc_ci] = useState({ loading: false })
    const getParts = () => {
        setLoadingParts(true)
        post('state/get', { fileNo, scope: 'log', key: 'part' })
            .then(x => {
                setParts(x.states)
            }).finally(x => setLoadingParts(false))
    }
    const getDocs = () => {
        setLoadingDocs(true)
        post('state/get', { fileNo, scope: 'doc', key: 'upload' })
            .then(x => {
                setUploads(x.states)
            }).finally(x => setLoadingDocs(false))
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
        getParts()
        getDocs()
    }, [])
    useEffect(() => {
        if (data?.partRef && uploads && proforma) {
            let _uploads = uploads.find(x => x.partRef == data?.partRef)

            if (_uploads)
                setData({ partRef: data.partRef, proformaRef: proforma.id, ..._uploads })
            else
                setData({ proformaRef: proforma.id })
        }
        else {
            setData({})

        }
    }, [data?.partRef])
    console.log('partRef', data?.partRef, data?.etDraft)
    return (
        <Page title={"بارگذاری اسناد حمل"}>
            <ViewSummary proforma={proforma} />
            <Row>
            <Select entity={'part'} proformaRef={proforma?.id} loading={loading} title="پارت حمل" w="6"
                    value={data?.partRef} onChange={(e, v) => setData({ ...data, partRef: e })} />

            </Row>

            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'>بارگذاری یکباره اسناد حمل</h2>
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"docDraft"} title="پیش نویس اسناد حمل" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'docDraft')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"doc"} title="اصل اسناد حمل" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'doc')} />
            
            <h2 className='border-b my-2 mt-5 border-x-primary-light w-full text-lg text-dark'>بارگذاری تفکیکی اسناد حمل</h2>
            
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"bl"} title="بارنامه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'bl')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"co"} title="گواهی مبدا" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'co')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"ci"} title="فاکتور" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'ci')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"ccpit"} title="فاکتور مورد تائید CCPIT به همراه گواهینامه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'ccpit')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"pl"} title="فهرست بسته بندی" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'pl')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"stuffingList"} title="فهرست بسته بندی کانتینری" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'stuffingList')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"stuffing_weightList"} title="فهرست بسته بندی کانتینری/فهرست بسته بندی وزنی" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'stuffing_weightList')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"ic"} title="گواهی بازرسی IC" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'ic')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"coi"} title="گواهی بازرسی COI" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'coi')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"coi_ccpit"} title="گواهی بازرسی COI مورد تائید CCPIT به همراه گواهینامه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'coi_ccpit')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"persianStandard"} title="نامه تائیدیه فارسی به استاندارد" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'persianStandard')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"md"} title="اظهارنامه فروشنده MD" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'md')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"tr"} title="گزارش تست کالا" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'tr')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"ca"} title="گواهی آنالیز کالا" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'ca')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"cl"} title="گواهی آزمایشگاه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'cl')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"carryReport"} title="تصویر گزارش حمل" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'carryReport')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"entrance"} title="اعلامیه ورود" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'entrance')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"freightFactor"} title="اعلامیه ورود" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'freightFactor')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"deliverOrder"} title="ترخیصیه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'deliverOrder')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"warehouse"} title="قبض انبار" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'warehouse')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"insu"} title="بیمه نامه" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'insu')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"bankCurrency"} title="نامه بانک بابت نوع و مبلغ ارز خریداری شده" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'bankCurrency')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"exchangeFactor"} title="فاکتور رسمی صرافی بابت نوع و مبلغ ارز خریداری شده" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'exchangeFactor')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"bankProforma"} title="پروفورمای مهمور بانک" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'bankProforma')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"currencySale"} title="اعلامیه فروش ارز" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'currencySale')} />
            <Doc partRef={data?.partRef} proformaRef={proforma?.id} scope={"serial_code_track"} title="سریال/شناسه/کد رهگیری" oldFile={!!data.partRef && uploads && !!uploads.find(x => x.partRef == data.partRef && x.doc === 'serial_code_track')} />
        </Page>
    );
};

export default UploadDocs;
