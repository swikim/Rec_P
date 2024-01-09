import React from "react";
import './Weather.css';
import { useState } from "react";
import { Card ,Text, Metric ,Button, TabGroup,TabList,Tab,DatePicker,DatePickerValue} from "@tremor/react";
function Weather (){
   
    const [selectedIndex, setSelectedIndex] = useState('');
    const [selectYMD, setSelectYMD] = useState('');
    const [selectDate, setSelectDate] = useState(null);

    const [urlDate, setUrlDate] = useState("");
    const default_date = new Date();

    function new_Date(date){
        const year = date.getFullYear().toString();
        let month = (date.getMonth()+1).toString();
        const day = date.getDate().toString();

        if(month.length < 2){month = "0" + month}

        const today_date = year+month+day;
        return today_date;
    }
    const toDay = new_Date(default_date);
    

    

    const handleDateChange = (newDate) =>{
        setSelectDate(newDate);
        console.log(newDate);

        const parsedDate = new Date(newDate);
        const year = parsedDate.getFullYear().toString();
        let month = (parsedDate.getMonth() + 1).toString(); // 월은 0부터 시작하므로 +1 해줌
        let day = parsedDate.getDate().toString();
       
        if(month.length < 2){month = "0" + month};
        if(day.length<2){day = "0" + day};
        const urlDate_in = year+month+day;
        
        setUrlDate(urlDate_in);
        console.log(urlDate);
    }


     //날씨
     const num = '112';
     const apiKey = 'yoDxAeXuxWRtQ%2BxEhRsJ0aFpqAVIInugpacEw9CJlopBLfc78UtjrXoR2KwMDtIrOtPL33SSz%2FdjDYI08s1%2Ffw%3D%3D';  
     const dayApiUrl = `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${urlDate}&endDt=${urlDate}&stnIds=${num}`;


     const [regionN, setRegionN] = useState('');

     fetch(dayApiUrl)
        .then(response => response.json())
        .then(data =>{
            console.log(data.response.body.items.item[0].sumSsHr);
            setRegionN(data.response.body.items.item[0].sumSsHr);
        })
        .catch(error => console.error(error));


   const checkDate=()=>{ console.log(selectDate,dayApiUrl,urlDate,regionN);    };

    return(
       <div>
        <div className="flex">
            <Button>전년동월</Button>
            <DatePicker onValueChange={handleDateChange}
            defaultValue={new Date()} />

            <Button onClick={checkDate}>확인</Button>

            <Button>후년동월</Button>

            

            <TabGroup index={selectedIndex} onIndexChange={setSelectDate}>
                <TabList variant="solid">
                <Tab>일조량</Tab>
                <Tab>날씨</Tab>
                <Tab>기온</Tab>
                </TabList>
            </TabGroup>
        </div>
        <div className="flex">
        <div>
        <TabGroup onSelect={selectYMD} onChange={(date) => setSelectYMD(date)}>
                <TabList variant="solid">
                <Tab>연</Tab>
                <Tab>월</Tab>
                <Tab>일</Tab>
                </TabList>
            </TabGroup>
        </div>
        <div className="image-container">
            <img src="/koreamap.png" 
            style={{width : '800px' , height : '800px'}}/>
            <div className="text-on-image"><h2>일조량 : {regionN}</h2></div>
        </div>

        </div>
       </div>
    )
    

}

export default Weather;

