import React from 'react';
import axios from 'axios';
import * as deviceInfo from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const backend = import.meta.env.VITE_REACT_APP_API_ENDPOINT//'http://192.168.3.18:8801'
async function showAlert(message: string, title: string, type = 'danger') {

    const _showAlert = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        background: type === 'success' ? '#00ab55' : type === 'danger' ? '#e7515a' : '#eaeaec',

    });
    _showAlert.fire({

        title: message,
        padding: '10px 5px',
    });

}
function fetch(url: string, options: any, isJson = true) {
    let token = localStorage.getItem('token')
    const headers: object = {
        'Accept': 'application/json',
        'v': '1',
        'cache-control': 'no-cache',
        'Content-Type': (isJson ? 'application/json' : 'multipart/form-data'),
        'Authorization': token ? ('Bearer ' + token) : ''
    }
    



    return axios(url, {
        headers,
        ...options
    }).then((response: any) => {
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            //error.response = response
            throw error
        }
    })
}
export function useAlert() {
    function alert(messsage: string, title = "") {
        showAlert(messsage, title)
    }
    return alert
}
export function usePost() {

    const navigate = useNavigate();
    function post(address: string, data: any, withMessage = false) {
        let token = localStorage.getItem('token')
        const headers = {
            'Accept': 'application/json',
            'v': 1,
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Authorization': token ? 'Bearer ' + token : ''
        }
        return axios(`${backend}/api/${address}`, {
            headers, method: 'POST', data
        }).then(res => {

            if (res.status >= 200 && res.status < 300) { // Success status lies between 200 to 300
                if (withMessage && res.data.isSuccess)
                    showAlert(res.data.message, '');
                if (res.data.isSuccess)
                    return res.data.data;
                return null
            } else {
                var error = new Error(res.statusText)
                //error.res = res
                throw error
            }
        })
            .catch(err => {
                if (err.response == undefined)
                    showAlert("ارتباط با سرویس دهنده قطع میباشد", 'خطا');
                else if (err.response.status == 400 || err.response.status == 405) {
                    err.response.data.message.split("|").map((element: string) => {
                        if (element) showAlert(element, 'خطا');
                    });
                }
                else if (err.response.status == 404) {

                    showAlert(err.response.data.message, 'خطا');
                }
                else if (err.response.status == 401) {
                    localStorage.removeItem('tugatoken')
                    showAlert("لطفاً دوباره وارد شوید", 'خطا');
                    //window.location.href = "/";
                    navigate('/')
                }
                else if (err.response.status == 403) {
                    showAlert("شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد", 'خطا');
                    navigate('/')//window.location.href = "/";
                }
                else if (err.response.status == 500) {
                    //showAlert("error", err.response.data.message);
                    err.response.data.message.split("|").map((element: string) => {
                        if (element) showAlert(element, 'خطا');
                    });
                    console.log('service err 500', err.response.data)
                }
                if (err.response) {
                    throw err.response.data
                }
                else throw err.response
            })
    }
    return post
}
export function useGet() {

    const navigate = useNavigate();
    function get(address: string, data: any, withMessage = false) {
        let token = localStorage.getItem('token')
        const headers = {
            'Accept': 'application/json',
            'v': 1,
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token ? 'Bearer ' + token : ''
        }



        return axios(`${backend}/api/${address}`, {
            headers, method: 'GET'
        }).then(res => {

            if (res.status >= 200 && res.status < 300) { // Success status lies between 200 to 300
                if (withMessage && res.data.isSuccess)
                    showAlert('success', res.data.message);
                if (res.data.isSuccess)
                    return res.data.data;
                return null
            } else {
                var error = new Error(res.statusText)
                //error.res = res
                throw error
            }
        })
            .catch(err => {
                if (err.response == undefined)
                    showAlert('error', "ارتباط با سرویس دهنده قطع میباشد");
                else if (err.response.status == 400 || err.response.status == 405) {
                    err.response.data.message.split("|").map((element: string) => {
                        showAlert('error', element);
                    });
                }
                else if (err.response.status == 404) {

                    showAlert('error', err.response.data.message);
                }
                else if (err.response.status == 401) {
                    localStorage.removeItem('tugatoken')
                    showAlert("error", "لطفاً دوباره وارد شوید");
                    //window.location.href = "/";
                    navigate('/')
                }
                else if (err.response.status == 403) {
                    showAlert("error", "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد");
                    navigate('/')//window.location.href = "/";
                }
                else if (err.response.status == 500) {
                    //showAlert("error", err.response.data.message);
                    err.response.data.message.split("|").map((element: string) => {
                        showAlert('error', element);
                    });
                    console.log('service err 500', err.response.data)
                }
                else if (err.response.status == 423) {
                    showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
                    navigate('/')//window.location.href = "/";
                }
                if (err.response) {
                    throw err.response.data
                }
                else throw err.response
            })
    }
    return get
}
export function usePostFile() {
    const navigate = useNavigate();
    function postFile(data: any, updateFunction: any, withMessage = false) {
        const startTime = Date.now();
        let token = localStorage.getItem('token')
        const headers = {
            'Accept': 'application/json',
            'v': 1,
            'cache-control': 'no-cache',
            'Content-Type': 'multipart/form-data',
            //'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token ? 'Bearer ' + token : ''
        }
        
        return axios(`${backend}/api/storage/upload`, {
            method: 'POST',
            data: data,
            onUploadProgress: progressEvent => {
                const { loaded, total = 0 } = progressEvent;

                const timeElapsed = Date.now() - startTime;
                const uploadSpeed = loaded / (timeElapsed / 1000);
                //console.log('uploaded------',data.fileName,progressEvent.total,loaded,Math.round((loaded / total) * 100))
                if (updateFunction)
                    updateFunction({
                        queueProgress: Math.round((loaded / total) * 100),
                        uploadTimeRemaining: Math.ceil((total - loaded) / uploadSpeed),
                        uploadTimeElapsed: Math.ceil(timeElapsed / 1000),
                        uploadSpeed: (uploadSpeed / 1024).toFixed(2)
                    });
            }
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300) { // Success status lies between 200 to 300
                    if (withMessage && res.data.isSuccess)
                        showAlert('success', res.data.message);
                    if (res.data.isSuccess)
                        return res.data.data;
                    return null
                } else {
                    var error = new Error(res.statusText)
                    //error.res = res
                    throw error
                }
            }).catch(err => {
                
                if (err.response == undefined)
                    showAlert( "ارتباط با سرویس دهنده قطع میباشد",'خطا');
                else if (err.response.status == 400 || err.response.status == 405) {
                    err.response.data.message.split("|").map((element: string) => {
                        showAlert( element,'خطا');
                    });
                }
                else if (err.response.status == 404) {

                    showAlert( err.response.data.message,'خطا');
                }
                else if (err.response.status == 401) {
                    localStorage.removeItem('tugatoken')
                    showAlert("error", "لطفاً دوباره وارد شوید");
                    //window.location.href = "/";
                    navigate('/')
                }
                else if (err.response.status == 403) {
                    showAlert("error", "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد");
                    navigate('/')//window.location.href = "/";
                }
                else if (err.response.status == 500) {
                    //showAlert("error", err.response.data.message);
                    err.response.data.message.split("|").map((element: string) => {
                        showAlert( element,'خطا');
                    });
                    console.log('service err 500', err.response.data)
                }
                else if (err.response.status == 423) {
                    showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
                    navigate('/')//window.location.href = "/";
                }
                if (err.response) {
                    throw err.response.data
                }
                else throw err.response
            })
    }
    return postFile
}
// export function usePost1() {

//     const navigate = useNavigate();
//     function post(address, data, withMessage = false) {
//         console.log('dddddddddddd')
//         debugger
//         return fetch(`${backend}/api/${address}`, {
//             method: 'POST',
//             data: data
//         }, true)
//             .then(res => {
//                 console.log(`${backend}/api/${address}`, data, res.data)
//                 if (withMessage && res.data.isSuccess)
//                     showAlert('success', res.data.message);
//                 if (res.data.isSuccess)
//                     return Promise.resolve(res.data.payload);
//                 return null
//             }).catch(err => {
//                 if (err.response == undefined)
//                     showAlert( "ارتباط با سرویس دهنده قطع میباشد");
//                 else if (err.response.status == 400 || err.response.status == 405) {
//                     err.response.data.message.split("|").forEach(element => {
//                         showAlert('error', element);
//                     });
//                 }
//                 else if (err.response.status == 404) {

//                     showAlert('error', err.response.data.message);
//                 }
//                 else if (err.response.status == 401) {
//                     localStorage.removeItem('tugatoken')
//                     showAlert("error", "لطفاً دوباره وارد شوید");
//                     //window.location.href = "/";
//                     navigate('/')
//                 }
//                 else if (err.response.status == 403) {
//                     showAlert("error", "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 500) {
//                     //showAlert("error", err.response.data.message);
//                     err.response.data.message.split("|").forEach(element => {
//                         showAlert('error', element);
//                     });
//                     console.log('service err 500', err.response.data)
//                 }
//                 else if (err.response.status == 423) {
//                     showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 if (err.response) {
//                     throw err.response.data
//                 }
//                 else throw err.response
//             })


//     }
//     return post
// }
// export function usePostFile() {

//     const navigate = useNavigate();
//     function postFile(address, data, withMessage = false) {
//         return fetch(`${backend}/api/${address}`, {
//             method: 'POST',
//             data: data
//         }, false)
//             .then(res => {
//                 if (withMessage && res.data.isSuccess)
//                     showAlert('success', res.data.message);
//                 if (res.data.isSuccess)
//                     return Promise.resolve(res.data.payload);
//                 return null
//             }).catch(err => {
//                 if (err.response == undefined)
//                     showAlert('error', "ارتباط با سرویس دهنده قطع میباشد");
//                 else if (err.response.status == 400 || err.response.status == 405) {
//                     err.response.data.message.split("|").forEach(element => {
//                         showAlert('error', element);
//                     });
//                 }
//                 else if (err.response.status == 404) {

//                     showAlert('error', err.response.data.message);
//                 }
//                 else if (err.response.status == 401) {
//                     localStorage.removeItem('tugatoken')
//                     showAlert("error", "لطفاً دوباره وارد شوید");
//                     navigate('/');//window.location.href = "/";
//                 }
//                 else if (err.response.status == 403) {
//                     showAlert("error", "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 500) {
//                     showAlert("error", err.response.data.message);
//                 }
//                 else if (err.response.status == 423) {
//                     showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 if (err.response) {
//                     throw err.response.data
//                 }
//                 else throw err.response
//             })

//     }
//     return postFile
// }
// export function useGet1() {

//     const navigate = useNavigate();
//     function get(address:string, data:any, withMessage = false) {
//         return fetch(`${backend}/api/${address}`, {
//             method: 'GET',
//             data: data
//         }, true).then(res => {
//             if (withMessage && res.data.isSuccess)
//                 showAlert('success', res.data.message);
//             return Promise.resolve(res.data.payload);
//         }).catch(err => {

//             console.log('catch err', err)
//             if (err.response == undefined)
//                 showAlert('error', "ارتباط با سرویس دهنده قطع میباشد");
//             else if (err.response.status == 401) {
//                 localStorage.removeItem('tugatoken')
//                 showAlert('error', "لطفاً دوباره وارد شوید");
//                 navigate('/')// window.location.href = "/";
//             }
//             else if (err.response.status == 500)
//                 showAlert('error', err.response.data.message);
//             else if (err.response.status == 423) {
//                 showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
//                 navigate('/')//window.location.href = "/";
//             }
//             if (err.response)
//                 throw err.response.data
//             else throw err.response
//         })
//     }
//     return get
// }
// export function usePostExcell() {

//     const navigate = useNavigate();
//     function postExcell(address, data, fileName) {
//         return fetch(`${backend}/api/${address}`, {
//             method: 'POST',
//             responseType: 'blob',
//             data: data
//         }, true)
//             .then(blob => {
//                 const url = window.URL.createObjectURL(
//                     new Blob([blob.data]),
//                 );
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute(
//                     'download',
//                     fileName,//_${moment().format('jYYYY/jMM/jDD')}
//                 );
//                 document.body.appendChild(link);
//                 link.click();
//                 link.parentNode.removeChild(link);
//                 return Promise.resolve(blob);
//             }).catch(err => {
//                 if (err.response == undefined)
//                     showAlert('error', "ارتباط با سرویس دهنده قطع میباشد")
//                 else if (err.response.status == 400 || err.response.status == 405) {
//                     err.response.data.message.split("|").forEach(element => {
//                         showAlert('error', element)
//                     });
//                 }
//                 else if (err.response.status == 404) {
//                     showAlert('error', err.response.data.message)
//                 }
//                 else if (err.response.status == 401) {
//                     localStorage.removeItem('tugatoken')
//                     showAlert('error', "لطفاً دوباره وارد شوید")
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 403) {
//                     showAlert('error', "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد")
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 500) {
//                     console.log('service err', err.response.data)
//                     showAlert('error', err.response.data.message)

//                 }
//                 else if (err.response.status == 423) {
//                     showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 if (err.response)
//                     throw err.response.data
//                 else throw err.response
//             })
//     }
//     return postExcell
// }
// export function useGetFile() {
//     function getFile(address, fileName) {
//         return fetch(`${backend}/api/${address}`, {
//             method: 'GET',
//             responseType: 'blob',
//         }, true)
//             .then(blob => {
//                 const url = window.URL.createObjectURL(
//                     new Blob([blob.data]),
//                 );
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute(
//                     'download', fileName
//                 );
//                 document.body.appendChild(link);
//                 link.click();
//                 link.parentNode.removeChild(link);
//                 return Promise.resolve(blob);
//             }).catch(err => {
//                 console.log('service err', err)
//             })
//     }
//     return getFile
// }
// export function usePostForm() {

//     const navigate = useNavigate();
//     function postForm(address, data, updateFunction = null, withMessage = false) {
//         const startTime = Date.now();

//         return fetch(`${backend}/api/${address}`, {
//             method: 'POST',
//             data: data,
//             onUploadProgress: progressEvent => {
//                 const { loaded, total } = progressEvent;

//                 const timeElapsed = Date.now() - startTime;
//                 const uploadSpeed = loaded / (timeElapsed / 1000);

//                 updateFunction({
//                     queueProgress: Math.round((loaded / total) * 100),
//                     uploadTimeRemaining: Math.ceil((total - loaded) / uploadSpeed),
//                     uploadTimeElapsed: Math.ceil(timeElapsed / 1000),
//                     uploadSpeed: (uploadSpeed / 1024).toFixed(2)
//                 });
//             }
//         }, false)
//             .then(res => {
//                 //console.log(`${backend}/api/${address}`, data, res.data)
//                 if (withMessage && res.data.isSuccess)
//                     showAlert('success', res.data.message);
//                 if (res.data.isSuccess)
//                     return Promise.resolve(res.data.payload);
//                 return null
//             }).catch(err => {

//                 if (err.response == undefined)
//                     showAlert('error', "ارتباط با سرویس دهنده قطع میباشد")
//                 else if (err.response.status == 400 || err.response.status == 405) {
//                     err.response.data.message.split("|").forEach(element => {
//                         showAlert('error', element)
//                     });
//                 }
//                 else if (err.response.status == 404) {
//                     showAlert('error', err.response.data.message)
//                 }
//                 else if (err.response.status == 401) {
//                     localStorage.removeItem('tugatoken')
//                     showAlert('error', "لطفاً دوباره وارد شوید")
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 403) {
//                     showAlert('error', "شما به اين اطلاعات دسترسي نداريد لطفاً به واحد فناوري اطلاعات تماس بگيريد")
//                     navigate('/')//window.location.href = "/";
//                 }
//                 else if (err.response.status == 500) {
//                     console.log('service err', err.response.data)
//                     showAlert('error', err.response.data.message)

//                 }
//                 else if (err.response.status == 423) {
//                     showAlert("error", "این عملیات فقط از داخل سازمان امکان پذیر است");
//                     navigate('/')//window.location.href = "/";
//                 }
//                 if (err.response)
//                     throw err.response.data
//                 else throw err.response
//             })
//     }
//     return postForm
// }
