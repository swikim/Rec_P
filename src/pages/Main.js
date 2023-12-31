import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
import { useState } from "react";

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

    }
   
  return (
    <div>
        <div className="layout__wrapper">
            <div className="card">
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
            </div>
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