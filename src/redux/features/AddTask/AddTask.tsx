/* eslint-disable @typescript-eslint/no-explicit-any */
import swal from "sweetalert";
import { useAddTaskMutation } from "../../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState } from "react";

const AddTask = () => {
  const [addtask] = useAddTaskMutation();
  const [showModal, setShowModal] = useState(false);
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


  const handelAddTask = async (e: any) => {
    e.preventDefault();
    const task = e.target.name.value;
    const time = e.target.time.value;
    const date = e.target.date.value;
 
    const taskDetails = { task: task, time: time,date:date };
    if (
      taskDetails.task == "" ||
      taskDetails.time == "" ||
      taskDetails.date == ""
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
  return (
    <div className="mb-6">
      <form action="" onSubmit={handelAddTask} className="flex justify-center">
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-yellow-400 outline-none focus:outline-none">
                  {/*header*/}
                  <div className=" ">
                    <span
                      className="text-red-800 rounded-full p-1 text-3xl"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </span>
                  </div>

                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Task</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div className="relative p-10 flex-auto justify-between items-center shadow-2xl">
                    <div>
                      <label htmlFor="">Task</label>
                      <input
                        type="text"
                        name="name"
                        id=""
                        placeholder="add task"
                        className="placeholder-black p-2 text-black outline-none w-[100%] mr-2"
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="">Close Time</label>
                      <input
                        type="time"
                        name="time"
                        className="p-2 mr-2 w-[100%]"
                      ></input>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="">Close Date</label>
                      <input
                        type="date"
                        name="date"
                        className="p-2 w-[100%]"
                        onChange={(e)=>{
                          if(formattedDate > e.target.value){
                            swal("Not Possible!", "Please select valid date", "warning");
                            e.target.value=''
                          }
                          else{
                           const date = e.target.value;
                            console.log(date)
                          }
                          
                        }}
                      ></input>
                    </div>
                    <button
                      className="btn bg-fuchsia-900 text-white text-[17px] mt-2 p-2"
                    >
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
      <button
        className="btn bg-fuchsia-900 text-white text-[17px] ml-2 p-2"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Task
      </button>
    </div>
  );
};

export default AddTask;
