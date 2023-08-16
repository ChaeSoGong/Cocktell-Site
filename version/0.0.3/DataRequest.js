// import axios from 'axios'; 
// import React, { useEffect, useState } from 'react'; 

// const DataRequest = (props) => {
//     const [data, setData] = useState('전송실패'); 
//     //기본값은 전송실패
//     useEffect(() => {
//         axios.get('/api/check') // 4000 포트에 서버 실행(proxy 자동설정 때문에 api를 써줘야함)
//         axios.then((res) => { 
//     	        console.log(res); // 데이터 콘솔에 띄우기 
// 	        setData(res.data); // 데이터 값을 바꿔줌 }); 
//         });
//     })
//     return <h1>{data}</h1>; // 값에 따라 전송 실패 or 전송 성공 출력 
// }; 

// export default DataRequest;