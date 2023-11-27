import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import './BoardDesign.css'
// interface IBackend{
//   id:string,
//   content:string
// }
const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
];

const colunmsFromBackend = {
  [uuidv4()]: {
    name: "Todo",
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: "InProgress",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [sourceColumn.items];
    const destItems = [...destColumn.items];
    console.log(destItems)
    const [removed] = sourceItems.splice(source.index, 0);
    destItems.splice(destination.index, 0, removed);

    console.log(sourceItems)
   
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    console.log(source.index);
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
const BoardsDesign = () => {
  const [columns, setColumns] = useState(colunmsFromBackend);
  const [todoState,setTodostate]=useState(false)
  console.log(todoState)
  console.log(columns);
  return (
    // <div 
    // // style={{ display: "flex", justifyContent: "center", height: "100%" }}
    // >
    //   <DragDropContext
    //     onDragEnd={(result: DropResult) =>
    //       onDragEnd(result, columns, setColumns)
    //     }
    //   >
    //     {Object.entries(columns)?.map(([id, column]) => {
    //       console.log(column, id);
    //       return (
    //         <div 
    //         // style={{ margin: 8 }}
    //         >
    //           <ul className="tree">
    //               <ul>
    //                 <li>
    //                   <div>{column.name}</div>
    //                   <ul>
    //                   <Droppable droppableId={id} key={id}>
    //             {(
    //               provided: DroppableProvided,
    //               snapshot: DroppableStateSnapshot
    //             ) => {
    //               console.log(provided);
    //               return (
    //                 <div
    //                   {...provided.droppableProps}
    //                   ref={provided.innerRef}
    //                   // style={{
    //                   //   background: snapshot.isDraggingOver
    //                   //     ? "lightblue"
    //                   //     : "lightgray",
    //                   //   padding: 4,
    //                   //   width: 250,
    //                   //   minHeight: 640,
    //                   // }}
    //                 >
    //                   {column?.items?.map((item, index) => {
    //                     console.log(item);
    //                     return (
    //                       <Draggable
    //                         key={item?.id}
    //                         draggableId={item?.id}
    //                         index={index}
    //                       >
    //                         {(provided, snapshot) => {
    //                           console.log(provided);
    //                           return (
    //                            <div 
    //                           //  style={{borderLeft:'1px solid red'}}
    //                            >

    //                              <li
    //                               ref={provided.innerRef}
    //                               {...provided.draggableProps}
    //                               {...provided.dragHandleProps}
    //                               // style={{
    //                               //   userSelect: "none",
    //                               //   padding: 16,
    //                               //   // margin: "0 0 8px 0",
    //                               //   minHeight: "50px",
    //                               //   backgroundColor: snapshot.isDragging
    //                               //     ? "#263B4A"
    //                               //     : "#456C86",
    //                               //   color: "white",
                                    

    //                               //   ...provided.draggableProps.style,
    //                               // }}
    //                             >
    //                               {item?.content}
    //                             </li>
    //                            </div>
    //                           );
    //                         }}
    //                       </Draggable>
    //                     );
    //                   })}
    //                   {provided.placeholder}
    //                 </div>
    //               );
    //             }}
    //           </Droppable>
    //                   </ul>
    //                 </li>
    //                 {/* <li>
    //                   <div>Mouse</div>
    //                   <ul>
    //                     <li>
    //                       <div>List item 1</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 2</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 3</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 4</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 5</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 6</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 7</div>
    //                     </li>
    //                     <li>
    //                       <div>List item 8</div>
    //                     </li>
    //                   </ul>
    //                 </li> */}
    //               </ul>
    //             </ul>
          
    //         </div>
    //       );
    //     })}
    //   </DragDropContext>
    // </div>
    <div>

  <ul className="tree">
          <ul>
            <li ><div onClick={(e)=>{
              console.log(e)
              setTodostate(!todoState) 
              console.log('click')}}>Todo</div>
              <ul
              //  style={{visibility:todoState?'visible' : 'hidden'}}
               >
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
              </ul>
            </li>
            <li><div>In progress</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
              </ul>
            </li>
          </ul>
       
        
      </ul>

</div>

  );
};

export default BoardsDesign;
