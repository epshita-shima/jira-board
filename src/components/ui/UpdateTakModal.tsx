import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { fetchTaskDelete } from "../../redux/features/boards/boardSlice";

const UpdateTakModal = ({ setDeleteTaskModal }) => {
  const [data, setData] = useState([]);
  const tasks = useSelector((state) => state.boardview);
const dispatch=useDispatch()
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

   const handleDeleteTask = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (willDelete) {
        await dispatch(fetchTaskDelete(id));
        swal("Delete success", {
          icon: "success",
        });
      } else {
        swal("Delete canceled", {
          icon: "info",
        });
      }
    } catch (error) {
      console.error("Error while deleting:", error);

      swal({
        title: "Error",
        text: "Something went wrong while deleting the record",
        icon: "error",
        buttons: true,
      });
    }
  };
  
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}

            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-black">
                Update Task Details
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setDeleteTaskModal(false)}
              >
                <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-10 py-6 flex-auto ">
              <div className="overflow-y-auto h-[400px]">
              <table className="w-full text-black border-collapse  border border-slate-500  ">
                <thead>
                  <tr>
                    <th className="border border-slate-600 p-2">Sl.</th>
                    <th className="border border-slate-600 p-2">Song</th>
                    <th className="border border-slate-600 p-2">Action</th>
                  </tr>
                </thead>
                {data.map((element, index) => {
                  return (
                    <tbody>
                      <tr className="text-center">
                        <td className="border border-slate-600 ">
                          {index + 1}
                        </td>
                        <td className="border border-slate-600 ">
                          {element.task}
                        </td>
                        <td className="text-center  border border-slate-600 p-2">
                          <FontAwesomeIcon
                            icon={faXmarkCircle}
                            className="text-red-500 text-[22px] align-middle"
                            onClick={()=>{handleDeleteTask(element._id)}}
                          ></FontAwesomeIcon>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateTakModal;
