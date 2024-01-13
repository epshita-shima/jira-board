import { useDispatch } from "react-redux"
import { fetchTaskById } from "../../redux/features/boards/boardSlice"
import swal from "sweetalert"

const SingleItemModal = ({setSingleTaskModal,singleTaskDetails,setSingleTaskDetails}) => {
    const dispatch=useDispatch()
    const handleSingleTaskPined=async(e)=>{
        e.preventDefault()
       await dispatch(fetchTaskById(singleTaskDetails))
       swal("Task Pined successfully", "", "success");
       setSingleTaskModal(false)
    }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative sm:w-[40%] md:w-[40%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] my-6 mx-auto ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}

            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black">
              Single Task Details
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setSingleTaskModal(false)}
              >
                <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-10 py-6 flex-auto ">
              <div className="border border-gray-300 p-4 text-center text-black rounded-md">
               <form action="" onSubmit={handleSingleTaskPined}>
               <h2>Task Name: {singleTaskDetails.task}</h2>
               <p>Task Status: {singleTaskDetails.status}</p>
               <p>Task Deadline: {singleTaskDetails.deadlineDate}</p>
               <button 
               className="bg-[#d7888a] text-white rounded-lg px-6 py-1 mt-2" 
               onClick={()=>{setSingleTaskDetails({
                _id: singleTaskDetails._id,
                deadlineDate: singleTaskDetails.deadlineDate,
                remarks: singleTaskDetails.remarks,
                startTime: singleTaskDetails.startTime,
                taskPriority: singleTaskDetails.taskPriority,
                time: singleTaskDetails.time,
                task: singleTaskDetails.task,
                pinTask:"pined",
                status: singleTaskDetails.status,
               })}}>Pin Task</button>
               </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default SingleItemModal
