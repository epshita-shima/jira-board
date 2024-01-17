import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotificationGet = createAsyncThunk(
  "getNotification",
  async () => {
    try {
      const response = await axios.get(`http://localhost:5000/noticationData`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
);

export const fetchNoticationPost = createAsyncThunk(
  "insertnotificationData",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:5000/notification`,
        data
      );
      console.log(response);
      const insertData = JSON.parse(response.config.data);
      return insertData;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: { data: [] },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNoticationPost.fulfilled, (state, action) => {})
      .addCase(fetchNotificationGet.fulfilled, (state, action) => {
        const notification = action.payload;
        state.data = notification;
      });
  },
});
export default notificationSlice.reducer;
