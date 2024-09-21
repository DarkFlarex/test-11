import {createItem, fetchItems} from "./itemsThunks";
import {GlobalError, Item} from "../../types";
import {createSlice} from "@reduxjs/toolkit";


export interface ItemsState {
    items: Item[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
}

const initialState: ItemsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError:null,
};

export const itemsSlice = createSlice({
   name: "items",
   initialState,
   reducers:{},
   extraReducers:(builder) => {
       builder
           .addCase(fetchItems.pending, (state) => {
               state.itemsFetching = true;
           })
           .addCase(fetchItems.fulfilled, (state, { payload: items }) => {
               state.itemsFetching = false;
               state.items = items;
           })
           .addCase(fetchItems.rejected, (state) => {
               state.itemsFetching = false;
           });

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
        selectItems: (state) => state.items,
        selectItemsFetching: (state) => state.itemsFetching,
        selectItemCreate:(state) => state.isCreating,
        selectItemCreateError:(state) => state.isCreatingError,
    }
});

export const ItemsReducer = itemsSlice.reducer;

export const {
    selectItems,
    selectItemsFetching,
    selectItemCreate,
    selectItemCreateError,
} = itemsSlice.selectors;