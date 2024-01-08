import { useState } from "react";
import ShowTask from "./components/ui/ShowTask"
import Footer from "./page/Footer"
import AddTask from "./redux/features/AddTask/AddTask"

function App() {
  const [showModal, setShowModal] = useState(false);
const [showUpdate,setShowUpdate]=useState(false)
const [showFormData, setShowFormData] = useState(true);
const [deleteTaskModal,setDeleteTaskModal]=useState(false)
  return (
    <div className="mx-auto font-serif containers" >
     {/* <BoardsDesign></BoardsDesign> */}
     <AddTask showModal={showModal}
   setShowModal={setShowModal}
   showUpdate={showUpdate}
   setShowUpdate={setShowUpdate}
   showFormData={showFormData} 
   setShowFormData={setShowFormData}
   ></AddTask>
  
  {/* <Treeview></Treeview> */}
  <ShowTask 
   setShowModal={setShowModal}
   setShowUpdate={setShowUpdate}
   setShowFormData={setShowFormData}
   deleteTaskModal={deleteTaskModal}
   setDeleteTaskModal={setDeleteTaskModal}
   ></ShowTask>
  <Footer></Footer>
    </div>
  )
}

export default App
