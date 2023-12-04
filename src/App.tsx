// import BoardsDesign from "./components/ui/BoardsDesign"
import ShowTask from "./components/ui/ShowTask"
import AddTask from "./redux/features/AddTask/AddTask"

function App() {


  return (
    <div className="bg-emerald-700  mt-10 p-10 w-[1000px] mx-auto font-serif" >
     {/* <BoardsDesign></BoardsDesign> */}
     <AddTask></AddTask>
  {/* <Treeview></Treeview> */}
  <ShowTask></ShowTask>
    </div>
  )
}

export default App
