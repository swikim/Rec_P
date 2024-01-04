import React from "react";
import { useState } from "react";
import { Card ,Text, Metric ,Button, TabGroup,TabList,Tab,DatePicker,DatePickerValue} from "@tremor/react";
function Weather (){
   
    const [selectedIndex, setSelectedIndex] = useState('');
    const [selectYMD, setSelectYMD] = useState('');
    const [selectDate, setSelectDate] = useState(null);

    const [urlDate, setUrlDate] = useState("");

    const handleDateChange = (newDate) =>{
        setSelectDate(newDate);
        console.log(newDate);

        const parsedDate = new Date(newDate);
        const year = parsedDate.getFullYear().toString();
        let month = (parsedDate.getMonth() + 1).toString(); // 월은 0부터 시작하므로 +1 해줌
        const day = parsedDate.getDate().toString();
       
        if(month.length < 2){month = "0" + month}
        const urlDate_in = year+month+day;
        
        setUrlDate(urlDate_in);
        console.log(urlDate);
    }


     //날씨
     const num = '112';
     const apiKey = 'yoDxAeXuxWRtQ%2BxEhRsJ0aFpqAVIInugpacEw9CJlopBLfc78UtjrXoR2KwMDtIrOtPL33SSz%2FdjDYI08s1%2Ffw%3D%3D'; 
     const apiUrl = `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20230101&endDt=20230102&stnIds=${num}`;


   const checkDate=()=>{ console.log(selectDate,apiUrl);    };

    return(
       <div>
        <div className="flex">
            <Button>전년동월</Button>
            <DatePicker onValueChange={handleDateChange} />

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
            <img src="/koreamap.png" 
            style={{width : '800px' , height : '800px'}}/>

        </div>
       </div>
    )
    

}

export default Weather;
