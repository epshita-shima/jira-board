import { useState } from "react";
import "./Treeview.css";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
const flowersList = [
  {
    id: "1",
    name: "Orchid",
  },
  {
    id: "2",
    name: "Carnation",
  },
  {
    id: "3",
    name: "Lily",
  },
  {
    id: "4",
    name: "Tulip",
  },
];
const flower = {
  ["1"]: {
    name: "To do",
    listData: flowersList,
  },
};

// {
//   id: "2",
//   name: "In progress",
//   listData: [flowersList],
// },
// {
//   id: "3",
//   name: "Unit test",
//   listData: [flowersList],
// },
// {
//   id: "4",
//   name: "Quality Assurance (QA)",
//   listData: [flowersList],
// },
// {
//   id: "4",
//   name: "Complete",
//   listData: [flowersList],
// },
const Treeview = () => {
  const [flowerState, setFlowerState] = useState(flower);
  console.log(flowerState);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source.droppableId);
    // const sourceIndex = result.source.index;
    // const destinationIndex = result.destination.index;
    // const sourceListId = result.source.droppableId;
    // const destinationListId = result.destination.droppableId;

    // if (sourceListId === destinationListId) {
    //   // If the drag and drop is within the same list
    //   console.log(sourceListId)
    //   const newListData =Object.entries(flower).map(([id, column]) =>(
    //     column.listData[0]
    //    ));
    //   const newListDataa = [...flowerState[sourceListId].newListData];
    //   const [removed] = newListDataa.splice(sourceIndex, 1);
    //   newListDataa.splice(destinationIndex, 0, removed);

    //   setFlowerState({
    //     ...flowerState,
    //     [sourceListId]: {
    //       ...flowerState[sourceListId],
    //       listData: newListData,
    //     },
    //   });
    // } else {
    // If the drag and drop is between different lists
    //   const sourceListData = [...flowerState[sourceListId].listData];
    //   const destinationListData = [...flowerState[destinationListId].listData];
    //   const [removed] = sourceListData.splice(sourceIndex, 1);
    //   destinationListData.splice(destinationIndex, 0, removed);

    //   setFlowerState({
    //     ...flowerState,
    //     [sourceListId]: {
    //       ...flowerState[sourceListId],
    //       listData: sourceListData,
    //     },
    //     [destinationListId]: {
    //       ...flowerState[destinationListId],
    //       listData: destinationListData,
    //     },
    //   });
    console.log(flowerState[source.droppableId]);
    const column = flowerState[source.droppableId];
    const copiedItems = [...column.listData];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    console.log(copiedItems);
    setFlowerState({
      ...flowerState,
      [source.droppableId]: {
        ...column,
        listData: copiedItems,
      },
    });
    // }
  };
  return (
    <div className="mx-auto  text-[20px] bg-emerald-700  mt-10 p-10 text-white w-[500px] flex justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(flowerState).map(([listId, column]) => {
          console.log(listId, column);
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
                          {column?.listData?.map((item, index) => {
                            console.log(item.id);
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
