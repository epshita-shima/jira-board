import { useState } from "react";
import "./Treeview.css";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IAllTask } from "../../types/taskType";
import { moveTask } from "../../redux/features/treeViews/treeviewSlice";
import { ISingleTask } from "../../types/singleTask";

const Treeview = () => {

  const flowerState = useSelector((state:IAllTask) => state.treeview.flower);
  console.log(flowerState)
  const dispatch = useDispatch();
  // const [flowerState, setFlowerState] = useState(flower);
  console.log(flowerState);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(result)
    dispatch(moveTask(source.droppableId));
  }
//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     // console.log(source.droppableId);
//     const sourceIndex = result.source.index;
//     const destinationIndex = result.destination.index;
//     const sourceListId = result.source.droppableId;
//     const destinationListId = result.destination.droppableId;

//     if (sourceListId === destinationListId) {
//       console.log(sourceListId)

//     const newListDataID = flowerState[sourceListId];
//     const newListData = [...newListDataID.listData];
//     const [removed] = newListData.splice(sourceIndex, 1);
//     newListData.splice(destinationIndex, 0, removed);
//     console.log(newListData);
//     setFlowerState({
//       ...flowerState,
//       [sourceListId]: {
//         ...newListDataID,
//         listData: newListData,
//       },
  
//   })
//     }
//      else {
 
//       const sourceListData = [...flowerState[sourceListId].listData];
//       const destinationListData = [...flowerState[destinationListId].listData];
//       const [removed] = sourceListData.splice(sourceIndex, 1);
//       destinationListData.splice(destinationIndex, 0, removed);

//       setFlowerState({
//         ...flowerState,
//         [sourceListId]: {
//           ...flowerState[sourceListId],
//           listData: sourceListData,
//         },
//         [destinationListId]: {
//           ...flowerState[destinationListId],
//           listData: destinationListData,
//         },
//       });
// }}
  return (
    <div className="mx-auto  text-[20px]  text-white  flex justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(flowerState).map(([listId, column]) => {
          return (
            <Droppable droppableId={listId} key={listId}>
              {(provided) => {
                return (
                  <ul className="tree">
                    <li>
                      <details open>
                        <summary>{column.name} <span className="text-[20px]">+</span> </summary>
                        <ul
                          className="m-8"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {column?.listData?.map((item:ISingleTask, index:number) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {item?.name}
                                     
                                    </li>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      </details>
                    </li>
                  </ul>
                );
              }}
            </Droppable>
          );
        })}
        {/* <ul className="tree">
          <li>
            <details open>
              <summary>To do</summary>
              <ul className=" ml-8">
                <li>Child first item</li>
                <li>
                  <details open>
                    <summary> Third Tier</summary>
                    <ul className=" ml-8">
                      <li>Tirst Item</li>
                      <li>Second Item</li>
                      <li>Third Item</li>
                    </ul>
                  </details>
                </li>
                <li>Another here</li>
              </ul>
            </details>
          </li>

          <li>
            <details open>
              <summary>In progress</summary>
              <ul className=" ml-8">
                <li>Child first item</li>
                <li>
                  <details open>
                    <summary> Third Tier</summary>
                    <ul className=" ml-8">
                      <li>Tirst Item</li>
                      <li>Second Item</li>
                      <li>Third Item</li>
                    </ul>
                  </details>
                </li>
                <li>Another here</li>
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary>Unit Test </summary>
              <ul className=" ml-8">
                <li>Child first item</li>
                <li>
                  <details open>
                    <summary> Third Tier</summary>
                    <ul className=" ml-8">
                      <li>Tirst Item</li>
                      <li>Second Item</li>
                      <li>Third Item</li>
                    </ul>
                  </details>
                </li>
                <li>Another here</li>
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary>Quality Assurance (QA)</summary>
              <ul className=" ml-8">
                <li>Child first item</li>
                <li>
                  <details open>
                    <summary> Third Tier</summary>
                    <ul className=" ml-8">
                      <li>Tirst Item</li>
                      <li>Second Item</li>
                      <li>Third Item</li>
                    </ul>
                  </details>
                </li>
                <li>Another here</li>
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary>Complete</summary>
              <ul className=" ml-8">
                <li>Child first item</li>
                <li>
                  <details open>
                    <summary> Third Tier</summary>
                    <ul className=" ml-8">
                      <li>Tirst Item</li>
                      <li>Second Item</li>
                      <li>Third Item</li>
                    </ul>
                  </details>
                </li>
                <li>Another here</li>
              </ul>
            </details>
          </li>
        </ul> */}
      </DragDropContext>
    </div>
  );
};

export default Treeview;
