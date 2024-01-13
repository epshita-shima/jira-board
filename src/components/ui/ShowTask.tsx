import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UpdateTakModal from "../ui/UpdateTakModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  fetchTaskById,
  fetchTasks,
  fetchUpdateTasks,
  taskMove,
} from "../../redux/features/boards/boardSlice";
import { useSelector } from "react-redux";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Showtask.css";
import swal from "sweetalert";

const ShowTask = ({
  setShowModal,
  setShowUpdate,
  setShowFormData,
  deleteTaskModal,
  setDeleteTaskModal,
}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredDropData, setFilteredDropData] = useState([]);
  const [pinTaskData, setPinTaskData] = useState([]);
  const tasks = useSelector((state) => state.boardview);
  const columns = tasks;

  useEffect(() => {
    const mergeResult = [].concat(
      tasks.toDo.items,
      tasks.inProgress.items,
      tasks.unitTest.items,
      tasks.qualityAssurance.items,
      tasks.done.items
    );
    setData(mergeResult);
  }, [
    tasks.toDo.items,
    tasks.inProgress.items,
    tasks.unitTest.items,
    tasks.qualityAssurance.items,
    tasks.done.items,
  ]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onDragStart = async (start) => {
    const filterSourceData = await data.filter(
      (item) => item._id == start.draggableId
    );
    setFilteredDropData(filterSourceData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(taskMove(result));
    dispatch(fetchUpdateTasks(filteredDropData));
  };

  const onDragUpdate = (updateDestination) => {
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
  const handlePinTask = () => {
    console.log('click')
    const filterTaskTodo = tasks.toDo.items.filter(
      (x) => x.pinTask == "pinned" && x.status == pinTaskData.status
    );
    const filterTaskInprogress = tasks?.inProgress?.items.filter(
      (x) => x.pinTask == "pinned" && x.status == pinTaskData.status
    );
    const filterTaskUnittest = tasks?.unitTest?.items.filter(
      (x) => x.pinTask == "pinned" && x.status == pinTaskData.status
    );
    const filterTaskQualityAssurance = tasks?.qualityAssurance?.items.filter(
      (x) => x.pinTask == "pinned" && x.status == pinTaskData.status
    );
    const filterTaskDone = tasks?.done?.items.filter(
      (x) => x.pinTask == "pinned" && x.status == pinTaskData.status
    );
    console.log(
      filterTaskTodo?.length,
      filterTaskInprogress?.length,
      filterTaskUnittest?.length,
      filterTaskQualityAssurance?.length,
      filterTaskDone?.length
    );
    if (
      filterTaskTodo.length > 0 ||
      filterTaskInprogress.length > 0 ||
      filterTaskUnittest.length > 0 ||
      filterTaskQualityAssurance.length > 0 ||
      filterTaskDone.length > 0
    ) {
      swal({
        title: "Not Possible!",
        text: "You can not pin two task at a time",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      dispatch(fetchTaskById(pinTaskData));
      swal("Task pined successfully", "success");
    }
  };
  const handleRemovePinTask=()=>{
    dispatch(fetchTaskById(pinTaskData));
    swal("Task unpined successfully", "success");
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}
    >
      <DragDropContext
        onDragStart={(result) => onDragStart(result)}
        onDragUpdate={(result) => onDragUpdate(result)}
        onDragEnd={(result) => onDragEnd(result, columns)}
      >
        {Object.entries(columns)?.map(([columnId]) => {
          const column = columns[columnId];
          return (
            // <div c lassName="flex">
            <div
              className="md:w-[250px] lg:w-[250px] xl:w-[250px] 2xl:md:w-[350px] border-gray-300  p-2 bg-[#F8F9FA] ml-4 mt-2 relative sm:h-[400px] md:h-[380px] lg:h-[500px] xl:h-[500px] 2xl:h-[815px]"
              style={{
                border: "1px solid #d1d5db",
              }}
            >
              <div key={columnId}>
                <div className="flex justify-between items-center">
                  <h2 className="mb-2 text-black text-center font-bold  text-[18px]">
                    {column?.name}
                  </h2>

                  <div className="dropdown dropdown-bottom mb-2">
                    <div
                      tabindex="0"
                      role="button"
                      className=" m-1 text-[20px]"
                    >
                      ...
                    </div>
                    <ul
                      tabindex="0"
                      className="dropdown-content z-[1] left-[-115px] menu p-2 shadow text-black bg-gray-100 rounded-box "
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

                <div className=" bg-white shadow-xl">
                  {column?.items?.map((item) => {
                    return (
                      <div>
                        {item.pinTask == "pinned" ? (
                          <div className="border-2 p-2 border-red-500 mb-4">
                            <div className={`flex justify-between relative`}>
                              {item.pinTask !== "" &&
                              item.pinTask == "pinned" ? (
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-[20px] text-green-600 absolute top-[-19px]"
                                ></FontAwesomeIcon>
                              ) : (
                                ""
                              )}

                              <p className="text-black text-[15px]">
                                {item?.task}
                              </p>
                            </div>
                            <p className="text-black text-[15px]">
                              (Close Time:
                              <b>{item?.time}</b>)
                            </p>
                            <p className="text-black text-[15px]">
                              (Close Date:
                              <b>{item?.deadlineDate}</b>)
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
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#F8F9FA",
                          padding: 4,
                          
                        }}
                        className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-500 scrollbar-track-slate-300  overflow-y-scroll w-full sm:h-[250px] md:h-[150px] lg:h-[310px] xl:h-[310px] 2xl:h-[630px]"
                      >
                        {column?.items?.map((item, index) => {
                          const dateString = item?.deadlineDate;
                          const timeString = item?.time;
                          const starttimeString = item?.startTime;
                          const now = new Date().getTime();

                          const futureDate = new Date(
                            dateString + " " + timeString
                          ).getTime();
                          const finishTaskcalculate= new Date(starttimeString).getTime();
                          const finishTaskcalculate1= new Date(dateString).getTime();
                          const calculateDate=finishTaskcalculate1-finishTaskcalculate
                          console.log(calculateDate)
                          const dayForFinishTask = Math.floor(
                            calculateDate / (1000 * 60 * 60 * 24)
                          );
                          console.log(dayForFinishTask)
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
                                      className={`mb-6 px-2 pb-2 bg-white shadow-xl rounded-md`}
                                      style={{ border: "1px solid #d1d5db" }}
                                    >
                                      <>
                                        <div
                                          className={`flex justify-between items-center shadow-sm mb-1`}
                                        >
                                          <div className="dropdown">
                                            <button
                                              className=" text-black text-[20px] font-bold"
                                              onClick={() => {
                                                if(item.pinTask =="pinned"){
                                                  setPinTaskData({
                                                    _id: item._id,
                                                    deadlineDate:
                                                      item.deadlineDate,
                                                    remarks: item.remarks,
                                                    startTime: item.startTime,
                                                    taskPriority:
                                                      item.taskPriority,
                                                    time: item.time,
                                                    task: item.task,
                                                    pinTask: " ",
                                                    status: item.status,
                                                  });
                                                }
                                               else{
                                                setPinTaskData({
                                                  _id: item._id,
                                                  deadlineDate:
                                                    item.deadlineDate,
                                                  remarks: item.remarks,
                                                  startTime: item.startTime,
                                                  taskPriority:
                                                    item.taskPriority,
                                                  time: item.time,
                                                  task: item.task,
                                                  pinTask: "pinned",
                                                  status: item.status,
                                                });
                                               }
                                              }}
                                            >
                                              ...
                                            </button>
                                            <div className="dropdown-content z-[1] menu p-2 shadow text-black bg-gray-100 rounded-box w-36 text-center">
                                              
                                              {
                                                item.pinTask =="pinned" ? ( <a
                                                  href="#"
                                                  className="text-black"
                                                  onClick={() => {
                                                    handleRemovePinTask();
                                                  }}
                                                >
                                                  Remove Pin Task
                                                </a>) :(<a
                                                href="#"
                                                className="text-black"
                                                onClick={() => {
                                                  handlePinTask();
                                                }}
                                              >
                                                Pin Task
                                              </a>)
                                              }
                                            </div>
                                          </div>
                                          {item.taskPriority !== "" &&
                                          item.taskPriority == "high" ? (
                                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                          ) : (
                                            ""
                                          )}
                                          {item.taskPriority !== "" &&
                                          item.taskPriority == "low" ? (
                                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                          ) : (
                                            ""
                                          )}
                                          {item.taskPriority !== "" &&
                                          item.taskPriority == "medium" ? (
                                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <li className="text-black text-[15px]">
                                          {item?.task}
                                        </li>
                                        <p className="text-black text-[15px]">
                                          Close Time:{" "}
                                          <b className="text-[15px]">
                                            {item?.time}
                                          </b>
                                        </p>
                                        <p className="text-black text-[15px]">
                                          Close Date:{" "}
                                          <b className="text-[15px]">
                                            {item?.deadlineDate}
                                          </b>
                                        </p>
                                        {
                                          item.status == 'done' ? <>
                                          <p className="text-black text-[15px]">Task Complete Time: <strong>{dayForFinishTask} days</strong></p>
                                          </> : <>
                                            {days <= 2 && days > 0  ? (
                                            <p className="text-red-500 text-[15px]">
                                              <b>
                                                Remaining Time: {days} days
                                                {hours} hours {minutes} minutes
                                              </b>
                                            </p>
                                          ) : days < 0 ? (
                                            <p className="text-black text-[15px]">
                                              Remaining Time:
                                              <b className=" text-red-600">
                                                {/* {days} days {hours} hours{" "}
                                                  {minutes} minutes  */}
                                                off
                                              </b>
                                            </p>
                                          ) : (
                                            <p className="text-black">
                                              Remaining Time:
                                              <b className="text-[15px]">
                                                {days} days {hours} hours{" "}
                                                {minutes} minutes
                                              </b>
                                            </p>
                                          )}
                                          </>
                                        
                                        }
                                        
                                      </>
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
              {deleteTaskModal ? (
                <UpdateTakModal
                  setDeleteTaskModal={setDeleteTaskModal}
                ></UpdateTakModal>
              ) : null}
              {/* {singleTaskModal ? (
                <SingleItemModal
                  setSingleTaskModal={setSingleTaskModal}
                  singleTaskDetails={singleTaskDetails}
                  setSingleTaskDetails={setSingleTaskDetails}
                ></SingleItemModal>
              ) : null} */}
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default ShowTask;
