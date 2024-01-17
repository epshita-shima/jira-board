import { useState } from "react";
import ShowTask from "./components/ui/ShowTask"
import Footer from "./page/Footer"
import AddTask from "./redux/features/AddTask/AddTask"

function App() {
  const [showModal, setShowModal] = useState(false);
const [showUpdate,setShowUpdate]=useState(false)
const [showFormData, setShowFormData] = useState(true);
const [deleteTaskModal,setDeleteTaskModal]=useState(false)
const [columnName,setColumnName]=useState('')
const [countNotification, setCountNotification] = useState([]);
const [notificationModal, setNotificationModal] = useState(false);
  return (
    <div className="mx-auto containers" >
     {/* <BoardsDesign></BoardsDesign> */}
     <AddTask showModal={showModal}
   setShowModal={setShowModal}
   showUpdate={showUpdate}
   showFormData={showFormData} 
   setShowFormData={setShowFormData}
   columnName={columnName}
   countNotification={countNotification} 
   setCountNotification={setCountNotification}
   notificationModal={notificationModal} 
   setNotificationModal={setNotificationModal}
   ></AddTask>
  
  {/* <Treeview></Treeview> */}
  <ShowTask 
   setShowModal={setShowModal}
   setShowUpdate={setShowUpdate}
   setShowFormData={setShowFormData}
   deleteTaskModal={deleteTaskModal}
   setDeleteTaskModal={setDeleteTaskModal}
   columnName={columnName}
   setColumnName={setColumnName}
   countNotification={countNotification} 
   setCountNotification={setCountNotification}
   notificationModal={notificationModal} 
   setNotificationModal={setNotificationModal}
   ></ShowTask>
  <Footer></Footer>
    </div>
  )
}

export default App
