import {createItem, deleteItem, fetchItems, fetchOneItem} from "./itemsThunks";
import {GlobalError, Item} from "../../types";
import {createSlice} from "@reduxjs/toolkit";

export interface ItemsState {
    items: Item[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    item: Item | null;
    oneFetching: boolean;
    deleteLoading: string | false;
}

const initialState: ItemsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError:null,
    item: null,
    oneFetching: false,
    deleteLoading:false,
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

       builder
           .addCase(fetchOneItem.pending, (state) => {
               state.item = null;
               state.oneFetching = true;
           })
           .addCase(fetchOneItem.fulfilled, (state, { payload: item }) => {
               state.item = item;
               state.oneFetching = false;
           })
           .addCase(fetchOneItem.rejected, (state) => {
               state.oneFetching = false;
           });
       builder
           .addCase(deleteItem.pending, (state, { meta: { arg: itemId } }) => {
               state.deleteLoading = itemId;
           })
           .addCase(deleteItem.fulfilled, (state) => {
               state.deleteLoading = false;
           })
           .addCase(deleteItem.rejected, (state) => {
               state.deleteLoading = false;
           });
   },
    selectors:{
        selectItems: (state) => state.items,
        selectItemsFetching: (state) => state.itemsFetching,
        selectItemCreate:(state) => state.isCreating,
        selectItemCreateError:(state) => state.isCreatingError,
        selectOneItem: (state) => state.item,
        selectOneItemFetching: (state) => state.oneFetching,
        selectDeleteItemLoading: (state) => state.deleteLoading,
    },
});

export const ItemsReducer = itemsSlice.reducer;

export const {
    selectItems,
    selectItemsFetching,
    selectItemCreate,
    selectOneItem,
    selectOneItemFetching,
} = itemsSlice.selectors;