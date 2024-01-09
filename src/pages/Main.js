import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
import { useState } from "react";
import { Card ,Button , Text, DatePicker,DateRangePicker, DateRangePickerItem, Metric,  } from "@tremor/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

import { es } from "date-fns/locale";

const DATA = [
    {
      id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
      name: "데이터 항목",
      items: [
        { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "종가" ,bool : false},
        { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "매도물량" ,bool : false},
        {
          id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae", name: "체결물량",bool : false},
        { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "매수 건수" ,bool : false},
        { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "매도 건수" ,bool : false},
        { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "최대가" ,bool : false},
        { id: "d3edf796-6449-4931-a777-ff66965a025a", name: "최소가" ,bool : false},
        { id: "d3edf796-6449-4931-a777-ff66965a025c", name: "평균가" ,bool : false},
  
      ],
      tint: 1,
    },
    {
      id: "487f68b4-1746-438c-920e-d67b7df46247",
      name: "x축",
      items: [
      ],
      tint: 2,
    },
    
  ];

  const chartData =[
    {
      date : 20240101,
      cls : 73000,
    },
    {
      date : 20240102,
      cls : 72000,
    },
    {
      date : 20240103,
      cls : 62000,
    },
    {
      date : 20240104,
      cls : 71000,
    },
  ]

  
  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">{category.value} bpm</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  

function Main () {
    const [stores, setstores] = useState(DATA);

    const handleDragDrop=(results)=>{
        const{source,destination,type}= results;

        if(!destination){
            return;
        }

        if(source.droppableId === destination.droppableId &&
            source.index===destination){return;}
        

        if(type === 'group'){
            const reorderdStores = [...stores];
            
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
        
            const [removedStore] = reorderdStores.splice(sourceIndex,1);
            reorderdStores.splice(destinationIndex,0,removedStore);
        
            return setstores(reorderdStores);
            }
        const itemSourceIndex = source.index;
        const itemDestinationIndex = destination.index;

        const storeSourceIndex = stores.findIndex(
            (store) => store.id === source.droppableId
        );
        const storeDestinationIndex = stores.findIndex(
            (store) => store.id === destination.droppableId
        );

        const storeSource = stores.find((store) => store.id === source.droppableId);
        const storeDestination = stores.find((store) => store.id === destination.droppableId);
  

        const newSourceItems = [...stores[storeSourceIndex].items];
        const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...stores[storeDestinationIndex].items]
          : newSourceItems;


        const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
        newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

        const newStores = [...stores];

        newStores[storeSourceIndex] = {
        ...stores[storeSourceIndex],
        items: newSourceItems,
        };
        newStores[storeDestinationIndex] = {
        ...stores[storeDestinationIndex],
        items: newDestinationItems,
        };

        setstores(newStores);

        if (
          storeSource.name === "데이터 항목" &&
          storeDestination.name === "x축"
        ) {
          storeSource.items[itemSourceIndex].bool = true;
          console.log(storeSource.items[itemSourceIndex].bool);
        }
        if(storeSource.name === "x축" && storeDestination.name === "데이터 항목"){
          storeSource.items[itemSourceIndex].bool = false;
          console.log(storeSource.items[itemSourceIndex].bool);
        }
        
    }
    
    //datePicker
    // const [value, setValue] = useState<DateRangePickerValue>({
    //   from: new Date(2023, 1, 1),
    //   to: new Date(),
    // });

    
    const [start_Value, setStart_Value] = useState(null);
    const [end_Value, setEnd_Value] = useState(null);

    const parse_Date =(newDate) =>{
      const parsedDate = new Date(newDate);
      const year = parsedDate.getFullYear().toString();
      let month = (parsedDate.getMonth() + 1).toString(); // 월은 0부터 시작하므로 +1 해줌
      let day = parsedDate.getDate().toString();
     
      if(month.length < 2){month = "0" + month};
      if(day.length<2){day = "0" + day};
      const resultDate = year+month+day;

      return resultDate;
    }

    const handleDateRangeChange = (result) =>{
      const {from,to} = result;
      setStart_Value(parse_Date(from));
      setEnd_Value(parse_Date(to));

      
      console.log(start_Value,end_Value);
    }

    const apiKey = 'yoDxAeXuxWRtQ%2BxEhRsJ0aFpqAVIInugpacEw9CJlopBLfc78UtjrXoR2KwMDtIrOtPL33SSz%2FdjDYI08s1%2Ffw%3D%3D'
    const apiUrl = `https://apis.data.go.kr/B552115/RecMarketInfo2/getRecMarketInfo2?serviceKey=${apiKey}&pageNo=1&numOfRows=30&dataType=json&bzDd=${start_Value}`;
    

    //체크버튼
    const checkButton =()=>{console.log(apiUrl,start_Value)};
   

    //차트
    

   
      


    fetch(apiUrl)
      .then(response => response.json())
      .then(data =>{
        console.log(data.response.body.items.item[0].clsPrc);
        
      })
      .catch(error => console.error(error));

  

  return (
    <div>
        <div className="Card">
        <DateRangePicker className="max-w-sm mx-auto" enableSelect={false}
        onValueChange={handleDateRangeChange} 
        />;
        <Card className="flex">
            <DragDropContext onDragEnd={handleDragDrop}>
                <div className="header">
                    <h1>가격동향</h1>
                </div>
                <Droppable droppableId="ROOT" type="group">
                    {(provided)=>(
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {stores.map((store, index) =>(
                              <Draggable draggableId={store.id} key={store.id} index={index}>
                            {(provided)=>(
                            <div className='store-container'{...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                <StoreList{...store}/>
                            </div>
                            )}
                            </Draggable>
                            ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'CLS Values', angle: -90, position: 'insideLeft' }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cls" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
        
        </Card>
           <Card>
            <Button onClick={checkButton}>check</Button>
            
           </Card>
           
        </div>
    </div>
  );
};



function StoreList({ name, items, id }) {
    return (
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="store-container">
              <h3>{name}</h3>
            </div>
            <div className="items-container">
              {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.name} titleID={id}>
                  {(provided) => (
                    <div
                      className="item-container"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <h4>{item.name}</h4>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  }

export default Main;