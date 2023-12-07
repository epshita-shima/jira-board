/* eslint-disable @typescript-eslint/no-explicit-any */
import swal from "sweetalert";
import { useAddTaskMutation, useGetTasksQuery } from "../../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState } from "react";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import NotificationModal from "../../../components/ui/NotificationModal";
import Select from "react-select";

const AddTask = () => {
  const [addtask] = useAddTaskMutation();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [countNotification, setCountNotification] = useState(0);
  const [notificationModal, setNotificationModal] = useState(false);
  const [priorityValue,setPriorityValue]=useState()
  const { data } = useGetTasksQuery(undefined);
  const date_data = startDate;
  const newDate = new Date(date_data);
  const year = newDate.toLocaleString("default", {
    year: "numeric",
  });
  const month = newDate.toLocaleString("default", {
    month: "2-digit",
  });
  const day = newDate.toLocaleString("default", {
    day: "2-digit",
  });
  const formattedDate = year + "-" + month + "-" + day;
  
  useEffect(() => {
    const tempData = [];
    data?.forEach((element) => {
      const deadlineDateString = element?.deadlineDate;
      const startDateString = element?.startTime;
      const now = new Date(startDateString).getDate();
      const futureDate = new Date(deadlineDateString).getDate();
      const dayleft = futureDate - now;
      console.log(dayleft);
      if (dayleft <= 2) {
        tempData.push(element);
      }
    });
    // data?.map((item) => {
    //   const dateString = item?.deadlineDate;
    //   const now = new Date().getDate();
    //   const futureDate = new Date(dateString).getDate();
    //   const dayleft = futureDate - now;
    //   if (dayleft >= 2) {
    //     setCountNotification(countNotification + 1);
    //   }
    // });
    console.log(tempData);
    setCountNotification(tempData);
  }, [data, setCountNotification]);

  const handelAddTask = async (e: any) => {
    e.preventDefault();
    const task = e.target.name.value;
    const time = e.target.time.value;
    const date = e.target.date.value;
    console.log(priorityValue)
    const taskDetails = {
      task: task,
      startTime: formattedDate,
      time: time,
      deadlineDate: date,
      taskPriority:priorityValue
    };
    if (
      taskDetails.task == "" ||
      taskDetails.time == "" ||
      taskDetails.deadlineDate == ""
    ) {
      swal("Not Possible!", "Please write something..", "warning");
    } else {
      console.log(taskDetails);
      await addtask(taskDetails);
      e.target.name.value = "";
      e.target.time.value = "";
      e.target.date.value = "";
      swal("Data added successfully", "sucess");
    }
  };
  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div className="mb-6">
      <form action="" onSubmit={handelAddTask} className="flex justify-center">
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Task Details</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative px-10 py-6 flex-auto">
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                      >
                        Task
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-black "
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                      >
                        Close Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-black"
                      ></input>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                      >
                        Close Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-black"
                        onChange={(e) => {
                          if (formattedDate > e.target.value) {
                            swal(
                              "Not Possible!",
                              "Please select valid date",
                              "warning"
                            );
                            e.target.value = "";
                          } else {
                            const date = e.target.value;
                          }
                        }}
                      ></input>
                      <div className="mt-2">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                        >
                         Choose Priority
                        </label>
                        <Select
                          options={options}
                          className="rounded-2xl"
                          onChange={(e) => setPriorityValue(e.value)}
                        />
                      </div>
                    </div>
                    <button className="btn bg-fuchsia-900 text-white text-[17px] mt-2 p-2 w-[50%] mx-auto">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </form>
      <div className="flex justify-between">
        <button
          className="btn bg-fuchsia-900 text-white text-[17px] p-2"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Task
        </button>
        <div onClick={() => setNotificationModal(true)}>
          <button className="text-white text-[22px] relative">
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
          </button>
          <div className="counter absolute top-[70px] w-6 h-6 rounded-full bg-red-500 text-white text-center">
            {countNotification.length}
          </div>
        </div>
        {notificationModal && countNotification.length != 0 ? (
          <NotificationModal
            setNotificationModal={setNotificationModal}
            countNotification={countNotification}
          ></NotificationModal>
        ) : null}
      </div>
    </div>
  );
};

export default AddTask;
