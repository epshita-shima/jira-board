import { useEffect, useState } from "react";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/api/apiSlice";
import swal from "sweetalert";

const NotificationModal = ({ setNotificationModal, countNotification }) => {
  const { data } = useGetTasksQuery(undefined);
  const [updateEstimateDate, setUpdateEstimateDate] = useState(false);
  const [singleId, setSingleId] = useState([]);
  const [singleItem, setSingleItem] = useState([]);
  const [updateTask] = useUpdateTaskMutation();
  const [startDate, setStartDate] = useState(new Date());

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

  const handleGetSingleData = (id: { _id: React.SetStateAction<never[]> }) => {
    setSingleId(id._id);
  };

  useEffect(() => {
    if (countNotification.length == 0) {
      setNotificationModal(false);
    }
  }, [countNotification.length, setNotificationModal]);

  const handleUpdateTaskDate = async (e) => {
   
    e.preventDefault();
    const comments = e.target.msg.value;
    const expandDate = e.target.expandDate.value;
    const updateData = {
      _id: singleItem?._id,
      task: singleItem?.task,
      status: singleItem?.status,
      time: singleItem?.time,
      deadlineDate: expandDate,
      startTime: formattedDate,
      remarks: comments,
    };
    
    await updateTask(updateData);
    swal("Not approve yet.", "Admin will check and let you know..", "success");
    setUpdateEstimateDate(false);
  };

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[700px] my-6 mx-auto max-w-3xl ">
          {/*content*/}
          <div className="border-0 rounded-lg   relative flex flex-col w-full bg-emerald-700 shadow-2xl outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
            <h3 className="text-xl font-semibold text-white">
              Task Notification
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setNotificationModal(false)}
            >
              <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div> 
            {/*body*/}

            <div className="relative p-6 flex-auto justify-between items-center  my-4 w-[90%] mx-auto rounded-xl">
              {countNotification?.map((item, index) => {
                const findMatchingIndices = (data, countNotification) => {
                  const matchingIndices = [];
                  data.forEach((element, index) => {
                    if (countNotification.includes(element)) {
                      matchingIndices.push(index + 1);
                    }
                  });
                  return matchingIndices;
                };

                const matchingIndices = findMatchingIndices(
                  data,
                  countNotification
                );

                return (
                  <div className="flex justify-between  py-1  mt-2 items-center  text-white border-b-2">
                    <div className="w-[70%]">
                      <mark className="px-1">
                        Task No: {matchingIndices[index]},
                        <mark>{item.task}</mark>
                      </mark>{" "}
                      time will expired within 2 days
                    </div>
                    <button
                      className="btn  px-2 py-1 text-black font-bold"
                      onClick={() => {
                        handleGetSingleData(item);
                        setUpdateEstimateDate(true);
                        setSingleItem(item);
                      }}
                    >
                      Mark as Read
                    </button>
                  </div>
                );
              })}
            </div>
            {updateEstimateDate ? (
              <>
                <div
                  aria-hidden="true"
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Aprroximate Completion Date
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setUpdateEstimateDate(false)}
                        >
                          <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative px-10 py-6 flex-auto">
                        <form action="" onSubmit={handleUpdateTaskDate}>
                          <label
                            for="message"
                            class="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                          >
                            Your Comments
                          </label>
                          <textarea
                            id="message"
                            rows="2"
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none   dark:border-gray-600 dark:placeholder-gray-400 dark:black mb-2 "
                            placeholder="Write your thoughts here..."
                            required
                            name="msg"
                          ></textarea>
                          <label
                            for="message"
                            class="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black"
                          >
                            Task Closing Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            disabled
                            value={singleItem?.deadlineDate}
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none  dark:bg-gray-400 dark:placeholder-gray-400 dark:text-black  "
                          />
                          <label
                            for="message"
                            class="block mb-2 text-[16px] font-medium text-gray-900 dark:text-black mt-2"
                          >
                            Aprroximate Completion Date{" "}
                            <mark className="bg-red-300">
                              (You can't expand this task more 10 days )
                            </mark>
                          </label>
                          <input
                            type="date"
                            required
                            name="expandDate"
                            onChange={(e) => {
                              const now = new Date(
                                singleItem?.deadlineDate
                              ).getDate();
                              const futureDate = new Date(
                                e.target.value
                              ).getDate();
                              const dayleft = futureDate - now;

                              if (singleItem?.deadlineDate > e.target.value) {
                                swal(
                                  "Not POssible",
                                  "Please select valid date",
                                  "warning"
                                );
                                e.target.value = "";
                              } else if (dayleft > 10) {
                                swal(
                                  "Not POssible",
                                  "You can expand date maximum 10 days",
                                  "warning"
                                );
                                e.target.value = "";
                              }
                            }}
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 outline-none  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  "
                          />
                          <button className="btn bg-indigo-600 text-white mt-2 p-2 w-[30%]">
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default NotificationModal;
