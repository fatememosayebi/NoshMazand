import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { usePostFile } from '@/services'
type FIleUploadProps = {
    title: string,
    value: number,
    onChange: any,
    w: string,
    dir: string,
    textAlign: string,
    scope: string
}
type DFile={
    name:string,
    file:File,
    uploaded:boolean,
    uploading:boolean,
    percentage:number,
    guid:string
}

const FileUpload = ({ title, value, onChange, w = "12", scope }: FIleUploadProps) => {
    const postFile = usePostFile()
    const [files, setFiles] = useState<Array<DFile>>([])
    const [filesUploaded, setFilesUploaded] = useState([])
    const [loading,setLoading]=useState(false)
    
    return (
        <div className={`${w == "12" && "w-full"} ${w != "12" && `w-${w}/12`} flex pl-2 my-1`}>
            {!!title && <div className="bg-[#eee] whitespace-nowrap flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-light border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                {title}
            </div>
            }
            <div className="flex form-input ltr:rounded-l-none rtl:rounded-r-none w-full items-center justify-center bg-grey-lighter">
                <label className=" w-full flex items-center bg-white text-blue tracking-wide cursor-pointer">
                    {files.length === 0 ?
                        <span className=" leading-normal mr-auto">...</span>
                        : <div className='w-full flex flex-col gap-2'>
                            {files.map((f:any, i:number) => {
                                return (

                                    <div className=''>{f.name}</div>

                                )
                            })}
                            
                        </div>
                    }
                    <input type='file' multiple className="hidden" onChange={e => {
                        if (!e.target.files) return
                        let _files = [...files]
                        for (let index = 0; index < e.target.files.length; index++) {
                            const _f = e.target.files[index];
                            _files = [..._files, { name: _f.name, file: _f, uploaded: false, uploading: false, percentage: 0, guid: '' }]
                        }
                        setFiles(_files)

                        // for (let index = 0; index < _files.length; index++) {
                        //     const f = _files[index];
                        //     if(f.iploaded) continue
                        //     //let _index = _files.findIndex(x => x.file === f)
                        //     f.uploading = true
                        //     f.percentage = 1;


                            let _formData = new FormData();
                            _formData.append("scope", scope);
                            
                            for (let index = 0; index < e.target.files.length; index++) {
                                _formData.append("content", e.target.files[index]);    
                            }
                            postFile(_formData,
                                // (progress: any) => {
                                //     let _filess = [...files]
                                //     let _index = _filess.findIndex(x => x.file === f.file)
                                //     console.log('_index',_index,files)
                                //     _filess[_index].uploading = true
                                //     _filess[_index].percentage = progress.queueProgress;
                                //     setFiles(_filess);
                                // },
                                 false)
                                .then(result => {
                                    // console.log(result)
                                    // let _files=[...files]
                                    // let _index = _files.findIndex(x => x.file === f.file)
                                    // console.log('then',_index,files)
                                    // _files[_index].uploading = false
                                    // _files[_index].uploaded = true
                                    // _files[_index].percentage = 100;
                                    // _files[_index].guid = result.guid

                                    // //setFilesUploaded([...filesUploaded, _files[_index]])
                                    // setFiles([..._files]);
                                    onChange(result.guids);
                                })
                                //.finally(e => { })
                                .catch(e => { 
                                    setFiles([])
                                    onChange([]);
                                })



                        }

                        //_formData.append("scope", scope);
                        //_formData.append("file",e.target.files);
                        // postFile('Attachment/saveFile', _formData, (progress) => {
                        //     let _files = [...files];
                        //     _files[fileAdded].percentage = progress.queueProgress;
                        //     setFiles(_files);
                        // },
                        //     false).then(result => {
                        //         let _f = [...uploadeFiles]
                        //         _f.push({ name: files[fileAdded].name, guid: result.guid })
                        //         setUploadedFiles(_f)
                        //         onChange(_f.map(x => { return { guid: x.guid } }));
                        //         setPercentage();
                        //         setFileAdded()
                        //     })
                        //     .finally(e => { }).catch(e => { });
                    } />
                </label>
            </div>
            {/* <input
                type="file"
                className="form-input file:py-2 file:px-4 file:border-0 file:font-light p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                required
            /> */}

        </div>
    )
}
export default FileUpload