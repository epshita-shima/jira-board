import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("getData", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/task`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

export const fetchTasksPost = createAsyncThunk("insertData", async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`http://localhost:5000/task`, data);
    const insertData = JSON.parse(response.config.data);
    return insertData;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

export const fetchTaskById = createAsyncThunk("updateData", async (data) => {
  console.log(data);
  try {
    const response = await axios.put(`http://localhost:5000/task/${data._id}`, {
      data,
    });

    console.log(response);
    const validData = JSON.parse(response.config.data);
    console.log(validData.data);
    return validData.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

export const fetchTaskDelete = createAsyncThunk("deleteData", async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(`http://localhost:5000/task/${id}`);
    console.log(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

//drag and drop
export const fetchUpdateTasks = createAsyncThunk("update", async (data) => {
  const response = await fetch(`http://localhost:5000/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data[0]),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    toDo: {
      name: "ToDo",
      items: [],
      isLoading: false,
      isError: false,
      error: null,
    },
    inProgress: {
      name: "In Progress",
      items: [],
      isLoading: false,
      isError: false,
      error: null,
    },
    unitTest: {
      name: "Unit Test",
      items: [],
      isLoading: false,
      isError: false,
      error: null,
    },
    qualityAssurance: {
      name: "Quality Assurance",
      items: [],
      isLoading: false,
      isError: false,
      error: null,
    },
    done: {
      name: "Completed",
      items: [],
      isLoading: false,
      isError: false,
      error: null,
    },
  },
  reducers: {
    taskMove: (state = initialState, action) => {
      const { source, destination } = action.payload;
      console.log("source", source);
      console.log("destination", destination);
      console.log("sourceList", state[source.droppableId].items);
      console.log("destinationList", state[destination.droppableId].items);
      if (source.droppableId != destination.droppableId) {
        const sourceList = state[source.droppableId].items;
        console.log(sourceList);
        const destinationList = state[destination.droppableId].items;
        const [movedItem] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, movedItem);
      } else {
        console.log("source", source);
        console.log("destination", destination);
        const column = state[source.droppableId].items;
        console.log(column);
        const copiedItems = [...column.items];
        console.log(copiedItems);
        const [removed] = copiedItems.splice(source.index, 1);
        console.log(removed);
        copiedItems.splice(destination.index, 0, removed);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.toDo.isLoading = true;
        state.toDo.isError = false;
        state.toDo.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const allData = action.payload;
        const dataCollectionTodo = allData?.filter(
          (ele) =>
            ele.status == "toDo" || ele.status == null || ele.status == ""
        );
        const dataCollectionInProggess = allData?.filter(
          (ele) => ele.status == "inProgress"
        );
        const dataCollectionUnitTest = allData?.filter(
          (ele) => ele.status == "unitTest"
        );
        const dataCollectionQA = allData?.filter(
          (ele) => ele.status == "qualityAssurance"
        );

        const dataCollection = allData?.filter((ele) => ele.status == "done");
        state.toDo.items = dataCollectionTodo;
        state.inProgress.items = dataCollectionInProggess;
        state.unitTest.items = dataCollectionUnitTest;
        state.qualityAssurance.items = dataCollectionQA;
        state.done.items = dataCollection;
        state.toDo.isLoading = false;
        state.unitTest.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {})

      .addCase(fetchTasksPost.fulfilled, (state, action) => {
        state.toDo.items.push(action.payload);
      })
      .addCase(fetchUpdateTasks.fulfilled, (state, action) => {})
      .addCase(fetchTaskById.pending, (state, action) => {
        state.toDo.isLoading = true;
        state.toDo.isError = false;
        state.toDo.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        if (
          action.payload.status == null ||
          action.payload.status == "" ||
          action.payload.status == "unitTest"
        ) {
          state.unitTest.items = state.unitTest.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
          console.log(state.unitTest.items);
        }
        if (action.payload.status == "toDo") {
          state.toDo.items = state.toDo.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
        if (action.payload.status == "inProgress") {
          state.inProgress.items = state.inProgress.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }
        if (action.payload.status == "qualityAssurance") {
          state.qualityAssurance.items = state.qualityAssurance.items.map(
            (item) => (item._id === action.payload._id ? action.payload : item)
          );
        }
        if (action.payload.status == "done") {
          state.done.items = state.done.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          );
        }

        state.unitTest.isLoading = false;
        state.toDo.isLoading = false;
        state.inProgress.isLoading = false;
        state.qualityAssurance.isLoading = false;
        state.done.isLoading = false;
      })

      .addCase(fetchTaskDelete.pending, (state) => {
        state.unitTest.isLoading = true;
        state.unitTest.isError = false;
        state.unitTest.error = null;
        state.toDo.isLoading = true;
        state.toDo.isError = false;
        state.toDo.error = null;
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        console.log(state);
        console.log(action.meta.arg);

        const id = action.meta.arg;
        if (id) {
          state.toDo.items = state.toDo.items.filter((ele) => ele._id !== id);
          console.log(state.toDo.items);

          state.qualityAssurance.items = state.qualityAssurance.items.filter(
            (ele) => ele._id !== id
          );
          state.inProgress.items = state.inProgress.items.filter(
            (ele) => ele._id !== id
          );
          state.unitTest.items = state.unitTest.items.filter(
            (ele) => ele._id !== id
          );

          state.done.items = state.done.items.filter((ele) => ele._id !== id);
        }
        state.toDo.isLoading = false;
        state.unitTest.isLoading = false;
        state.inProgress.isLoading = false;
        state.qualityAssurance.isLoading = false;
        state.done.isLoading = false;
      })
      .addCase(fetchTaskDelete.rejected, (state) => {
        state.toDo.isLoading = false;
        state.toDo.isError = true;
      });
  },
});
export const { taskMove } = boardSlice.actions;
export default boardSlice.reducer;
