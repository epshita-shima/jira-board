import React, { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBatteryFull } from "@fortawesome/free-solid-svg-icons/faBatteryFull";
import { faBatteryHalf } from "@fortawesome/free-solid-svg-icons/faBatteryHalf";
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons/faBatteryEmpty";
import UpdateTakModal from "../ui/UpdateTakModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  fetchTasks,
  fetchUpdateTasks,
  taskMove,
} from "../../redux/features/boards/boardSlice";
import { useSelector } from "react-redux";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Showtask.css";
import UpdateListData from "./UpdateListData";

const ShowTask = ({
  setShowModal,
  setShowUpdate,
  setShowFormData,
  deleteTaskModal,
  setDeleteTaskModal,
}) => {
  const [showUpdateListData, setShowUpdateListData] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredDropData, setFilteredDropData] = useState([]);

  const tasks = useSelector((state) => state.boardview);
  const columns = tasks;
  useEffect(() => {
    const mergeResult = [].concat(
      tasks.requested.items,
      tasks.toDo.items,
      tasks.inProgress.items,
      tasks.done.items
    );
    setData(mergeResult);
  }, [
    tasks.requested.items,
    tasks.toDo.items,
    tasks.inProgress.items,
    tasks.done.items,
  ]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragStart = async (start) => {
    console.log(start);
    const filterSourceData = await data.filter(
      (item) => item._id == start.draggableId
    );
    setFilteredDropData(filterSourceData);
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    dispatch(taskMove(result));
    dispatch(fetchUpdateTasks(filteredDropData));
  };

  const onDragUpdate = (updateDestination) => {
    console.log(updateDestination);
    const { destination } = updateDestination;
    if (destination != null) {
      setFilteredDropData((prevState) => {
        return prevState.map((item) => ({
          ...item,
          status: destination.droppableId,
        }));
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DragDropContext
        onDragStart={(result) => onDragStart(result)}
        onDragUpdate={(result) => onDragUpdate(result)}
        onDragEnd={(result) => onDragEnd(result, columns)}
      >
        {Object.entries(columns)?.map(([columnId]) => {
          const column = columns[columnId];
          return (
            // <div className="flex">
            <div
              className="w-[290px] border-gray-300  p-2 bg-[#F8F9FA] ml-4 mt-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "500px",
                border: "1px solid #d1d5db",
              }}
            >
              <div key={columnId}>
                <div className="flex justify-between items-center">
                  <h2 className="mb-2 text-black text-center font-bold  text-[18px]">
                    {column?.name}
                  </h2>

                  <div className="dropdown dropdown-bottom mb-2">
                    <div tabindex="0" role="button" class=" m-1 text-[20px]">
                      ...
                    </div>
                    <ul
                      tabindex="0"
                      className="dropdown-content z-[1] left-[-115px] menu p-2 shadow text-black bg-gray-100 rounded-box w-36"
                    >
                      <li
                        className="border-b"
                        onClick={() => {
                          setShowModal(true);
                          setShowUpdate(false);
                          setShowFormData(false);
                        }}
                      >
                        <a>Add Task</a>
                      </li>

                      <li
                        className="border-b"
                        onClick={() => {
                          setShowModal(true);
                          setShowUpdate(true);
                        }}
                      >
                        <a>Update Task</a>
                      </li>

                      <li
                        className="border-b"
                        onClick={() => {
                          setDeleteTaskModal(true);
                        }}
                      >
                        <a>Delete Task</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="sticky top-0 bg-white shadow-xl">
                  {column?.items?.map((item, index) => {
                    const dateString = item?.deadlineDate;
                    const timeString = item?.time;
                    const now = new Date().getTime();

                    const futureDate = new Date(
                      dateString + " " + timeString
                    ).getTime();
                    const timeleft = futureDate - now;
                    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    return (
                      <div>
                        {item.taskPriority == "high" ? (
                          <div className="border-2 p-2 border-red-500 mb-4">
                            <div className={`flex justify-between relative `}>
                              {item.taskPriority !== "" &&
                              item.taskPriority == "high" ? (
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-[20px] text-green-600 absolute top-[-19px]"
                                ></FontAwesomeIcon>
                              ) : (
                                ""
                              )}

                              <p className="text-black">{item?.task}</p>
                              {item.taskPriority !== "" &&
                              item.taskPriority == "high" ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faBatteryFull}
                                    className="text-red-500 text-[20px]"
                                  ></FontAwesomeIcon>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                            <p className="text-black">
                              (Close Time:
                              <b className="text-[15px]">{item?.time}</b>)
                            </p>
                            <p className="text-black">
                              (Close Date:
                              <b className="text-[15px]">
                                {item?.deadlineDate}
                              </b>
                              )
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>

                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          // overflowY:'auto',
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#F8F9FA",
                          padding: 4,
                          height: "310px",
                        }}
                        className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-500 scrollbar-track-slate-300  overflow-y-scroll"
                      >
                        {column?.items?.map((item, index) => {
                          const dateString = item?.deadlineDate;
                          const timeString = item?.time;
                          const now = new Date().getTime();

                          const futureDate = new Date(
                            dateString + " " + timeString
                          ).getTime();
                          const timeleft = futureDate - now;
                          const days = Math.floor(
                            timeleft / (1000 * 60 * 60 * 24)
                          );
                          const hours = Math.floor(
                            (timeleft % (1000 * 60 * 60 * 24)) /
                              (1000 * 60 * 60)
                          );
                          const minutes = Math.floor(
                            (timeleft % (1000 * 60 * 60)) / (1000 * 60)
                          );
                          // const seconds = Math.floor(
                          //   (timeleft % (1000 * 60)) / 1000
                          // );

                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <ul
                                      className={`mb-6 p-2 bg-white shadow-xl rounded-md`}
                                      style={{ border: "1px solid #d1d5db" }}
                                    >
                                      {item?.status == "close" ? (
                                        <del>
                                          <li className="">{item?.task}</li>
                                          <p>
                                            (Close Time:{" "}
                                            <b className="text-[15px]">
                                              {item?.time}
                                            </b>
                                            )
                                          </p>
                                          <p>
                                            (Close Date:{" "}
                                            <b className="text-[15px]">
                                              {item?.deadlineDate}
                                            </b>
                                            )
                                          </p>
                                        </del>
                                      ) : (
                                        <>
                                          <div
                                            className={`flex justify-between relative `}
                                          >
                                            <li className="text-black">
                                              {item?.task}
                                            </li>
                                            {item.taskPriority !== "" &&
                                            item.taskPriority == "high" ? (
                                              <>
                                                <FontAwesomeIcon
                                                  title="priority high"
                                                  icon={faBatteryFull}
                                                  className="text-red-500 text-[20px] cursor-pointer"
                                                ></FontAwesomeIcon>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            {item.taskPriority !== "" &&
                                            item.taskPriority == "low" ? (
                                              <FontAwesomeIcon
                                                title="priority low"
                                                icon={faBatteryEmpty}
                                                className="text-green-500 text-[20px] cursor-pointer"
                                              ></FontAwesomeIcon>
                                            ) : (
                                              ""
                                            )}
                                            {item.taskPriority !== "" &&
                                            item.taskPriority == "medium" ? (
                                              <FontAwesomeIcon
                                                title="priority medium"
                                                icon={faBatteryHalf}
                                                className="text-yellow-500 text-[20px] cursor-pointer"
                                              ></FontAwesomeIcon>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <p className="text-black">
                                            (Close Time:{" "}
                                            <b className="text-[15px]">
                                              {item?.time}
                                            </b>
                                            )
                                          </p>
                                          <p className="text-black">
                                            (Close Date:{" "}
                                            <b className="text-[15px]">
                                              {item?.deadlineDate}
                                            </b>
                                            )
                                          </p>
                                          {days <= 2 && days > 0 ? (
                                            <p className="text-red-500">
                                              (
                                              <b className="text-[15px]">
                                                Remaining Time: {days} days
                                                {hours} hours {minutes} minutes
                                              </b>
                                              )
                                            </p>
                                          ) : days < 0 ? (
                                            <p className="text-black">
                                              (Remaining Time:
                                              <b className="text-[15px] text-red-600">
                                                {/* {days} days {hours} hours{" "}
                                                {minutes} minutes  */}
                                                off
                                              </b>
                                              )
                                            </p>
                                          ) : (
                                            <p className="text-black">
                                              (Remaining Time:
                                              <b className="text-[15px]">
                                                {days} days {hours} hours{" "}
                                                {minutes} minutes
                                              </b>
                                              )
                                            </p>
                                          )}
                                        </>
                                      )}
                                    </ul>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              {showUpdateListData ? (
                <>
                  <UpdateListData
                    setShowUpdateListData={setShowUpdateListData}
                  ></UpdateListData>
                </>
              ) : null}

              {deleteTaskModal ? (
                <UpdateTakModal
                  setDeleteTaskModal={setDeleteTaskModal}
                ></UpdateTakModal>
              ) : null}
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default ShowTask;
