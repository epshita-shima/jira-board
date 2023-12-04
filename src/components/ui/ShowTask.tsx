/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  useCloseTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useOpenTaskMutation,
  useSingleTaskQuery,
  useUpdateTaskMutation,
} from "../../redux/api/apiSlice";
import { useState } from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faUnlock } from "@fortawesome/free-solid-svg-icons/faUnlock";
import UpdateTakModal from "../UpdateTakModal";

const ShowTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [singleId, setSingleId] = useState([]);
  const [singleItem, setSingleItem] = useState([]);
  const { data } = useGetTasksQuery(undefined);
  const [updateTask] = useUpdateTaskMutation();
  const { data: singleData } = useSingleTaskQuery(singleId);
  const [deleteTask] = useDeleteTaskMutation();
  const [closeTask] = useCloseTaskMutation();
  const [openTask] = useOpenTaskMutation();
  const [close, setClose] = useState(false);
  const [completeTask, setCompleteTask] = useState([]);
  console.log(completeTask);

  useEffect(() => {
    setCompleteTask(data?.filter((d) => d?.status != "open"));
  }, [setCompleteTask, data]);

  useEffect(() => {
    setSingleItem(singleData);
  }, [singleData]);

  const handleGetSingleData = (id: { _id: React.SetStateAction<never[]> }) => {
    setShowModal(true);
    setSingleId(id._id);
  };
  const handleUpdateTask = async (e: any) => {
    console.log(singleItem);
    e.preventDefault();
    await updateTask(singleItem);
    swal("Update successfully", "", "success");
    setShowModal(false);
  };
  const handleDelete = (item) => {
    setSingleId(item._id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTask(item._id);
        swal("Delete success", {
          icon: "success",
        });
      } else {
        console.log(data);
        swal({
          title: "Try again",
          text: "Something is worng",
          icon: "warning",
          buttons: true,
        });
      }
    });
  };

  console.log(data);
  return (
    <div className="flex">
      <div className="w-[250px] border-orange-500 border-y-4 p-2 bg-white">
        <h2 className="mb-2  text-center font-bold">TO DO</h2>
        {data?.map((item, index) => {
          const dateString = item?.date;
          const timeString = item?.time;
          const now = new Date().getTime();
          const futureDate = new Date(dateString + " " + timeString).getTime();
          const timeleft = futureDate - now;
          const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeleft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

          return (
            <>
              <ul className=" mb-2 border-2 p-2">
                {item?.status == "close" ? (
                  <del>
                    <li className="">{item?.task}</li>
                    <p>
                      (Close Time: <b className="text-[15px]">{item?.time}</b>)
                    </p>
                    <p>
                      (Close Date: <b className="text-[15px]">{item?.date}</b>)
                    </p>
                  </del>
                ) : (
                  <>
                    <li className="">{item?.task}</li>
                    <p>
                      (Close Time: <b className="text-[15px]">{item?.time}</b>)
                    </p>
                    <p>
                      (Close Date: <b className="text-[15px]">{item?.date}</b>)
                    </p>
                    {hours <= 1 ? (
                      <p className="text-red-500">
                        (
                        <b className="text-[15px]">
                          Remaining Time: {days} days {hours} hours {minutes}{" "}
                          minutes {seconds} seconds
                        </b>
                        )
                      </p>
                    ) : (
                      <p>
                        (Remaining Time:
                        <b className="text-[15px]">
                          {" "}
                          {days} days {hours} hours {minutes} minutes {seconds}{" "}
                          seconds
                        </b>
                        )
                      </p>
                    )}
                  </>
                )}

                <div className="flex justify-center mt-2">
                  {item?.status == "close" ? (
                    ""
                  ) : (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="bg-orange-400 text-white text-[13px] border-2 rounded-full p-1 border-transparent ml-5"
                      onClick={() => {
                        handleGetSingleData(item);
                      }}
                    ></FontAwesomeIcon>
                  )}

                  {item?.status == "close" ? (
                    <FontAwesomeIcon
                      icon={faLock}
                      className="bg-fuchsia-900 text-white text-[12px] border-2 rounded-full p-[5px] border-transparent ml-4"
                      onClick={() => {
                        setClose(!close);
                        openTask({
                          _id: item._id,
                          task: item.task,
                        });
                        swal("Open task", "", "success");
                      }}
                    ></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      icon={faUnlock}
                      className="bg-lime-500 text-white text-[12px] border-2 rounded-full p-[5px] border-transparent ml-1"
                      onClick={() => {
                        setClose(!close);
                        closeTask({
                          _id: item._id,
                          task: item.task,
                        });
                        swal("Close task", "", "success");
                      }}
                    ></FontAwesomeIcon>
                  )}
                  {item?.status == "close" ? (
                    ""
                  ) : (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="bg-red-500 text-white text-[12px] border-2 rounded-full p-[5px] border-transparent ml-1"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    ></FontAwesomeIcon>
                  )}
                </div>
              </ul>
            </>
          );
        })}

        {showModal ? (
          <UpdateTakModal
            setShowModal={setShowModal}
            handleUpdateTask={handleUpdateTask}
            singleItem={singleItem}
            setSingleItem={setSingleItem}
          ></UpdateTakModal>
        ) : null}
      </div>
      <div className="w-[250px] border-fuchsia-500 border-y-4 p-2 bg-white ml-4">
        <h2 className="mb-2  text-center font-bold">In progress</h2>
      </div>
      <div className="w-[250px] border-rose-600 border-y-4 p-2 bg-white ml-4">
        <h2 className="mb-2  text-center font-bold">Complete</h2>
        {completeTask?.map((item, index) => {
          return (
            <>
              <ul className=" mb-2 border-2 p-2">
                <li className="">{item?.task}</li>
              </ul>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ShowTask;
