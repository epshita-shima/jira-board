import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTaskData = createAsyncThunk("getData", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/task`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
});
const treeviewSlice = createSlice({
  name: "treeview",
  initialState: { data: [] },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTaskData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    });
  },
});

export default treeviewSlice.reducer;
