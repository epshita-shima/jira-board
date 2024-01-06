import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/features/boards/boardSlice";
import { useSelector } from "react-redux";

const UpdateListData = ({ setShowUpdateListData }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.boardview);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
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
                onClick={() => setShowUpdateListData(false)}
              >
                <span className="bg-transparent text-red-500  h-6 w-6 text-[30px] block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-10 py-6 flex-auto">
            {Object.entries(tasks)?.map(([columnId]) => {
          const column = tasks[columnId]
          return(
            <>
            {column?.items?.map((item, index) => {
                console.log(item)

                 return (
                   <div key={index}>
                   
                   </div>
                 );
               })}
            </>
            
          )
          
            })}
            
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default UpdateListData;
