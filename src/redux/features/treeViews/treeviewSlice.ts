import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAllTask } from "../../../types/taskType";
import { ISingleTask } from "../../../types/singleTask";

const initialState: IAllTask = {
  flower: {
    "1": {
      name: "To do",
      listData: [
        { id: "1", name: "Orchid" },
        { id: "2", name: "Carnation" },
        { id: "3", name: "Lily" },
        { id: "4", name: "Tulip" },
      ],
    },
    // "2": {
    //   name: "In Progress",
    //   listData: [],
    // },
  },
};
export const MOVE_FLOWER = "MOVE_FLOWER";

export interface IMoveTask {
  sourceListId: string;
  destinationListId: string;
  flowerId: string;
}

const treeviewSlice = createSlice({
  name: "treeview",
  initialState,
  reducers: {
    // setTask: (state, action) => {
    //   console.log(action.payload);
    //   state.flower = action.payload;
    // },
    moveTask: (state = initialState, action: PayloadAction<IMoveTask>) => {
      console.log(state);
      console.log(state.flower);
      const { sourceListId, destinationListId, flowerId } = action.payload;
      console.log(sourceListId, destinationListId);
      const flowerToMove = state[sourceListId].listData.find(
        (flower: ISingleTask) => flower.id === flowerId
      );
      const updatedSourceList = state[sourceListId].listData.filter(
        (flower: ISingleTask) => flower.id !== flowerId
      );
      const updatedDestinationList = [
        ...state[destinationListId].listData,
        flowerToMove,
      ];

      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], listData: updatedSourceList },
        [destinationListId]: {
          ...state[destinationListId],
          listData: updatedDestinationList,
        },
      };
    },
  },
});
export const { moveTask } = treeviewSlice.actions;
export default treeviewSlice.reducer;
