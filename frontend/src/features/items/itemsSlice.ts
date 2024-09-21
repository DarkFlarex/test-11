import {createItem} from "./itemsThunks";
import {GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";


export interface ItemsState {
    isCreating: boolean;
    isCreatingError: GlobalError | null;
}

const initialState: ItemsState = {
    isCreating: false,
    isCreatingError:null,
};

export const itemsSlice = createSlice({
   name: "items",
   initialState,
   reducers:{},
   extraReducers:(builder) => {
       builder
           .addCase(createItem.pending, (state) => {
               state.isCreating = true;
               state.isCreatingError = null;
           })
           .addCase(createItem.fulfilled, (state) => {
               state.isCreating = false;
           })
           .addCase(createItem.rejected, (state, { payload: error }) => {
               state.isCreating = false;
               state.isCreatingError = error || null;
           });
   },
    selectors:{
        selectItemCreate:(state) => state.isCreating,
        selectItemCreateError:(state) => state.isCreatingError,
    }
});

export const ItemsReducer = itemsSlice.reducer;

export const {
    selectItemCreate,
    selectItemCreateError,
} = itemsSlice.selectors;