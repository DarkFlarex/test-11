import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, Item, ItemMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchItems = createAsyncThunk<Item[],string | undefined>(
    'items/fetchAll',
    async (categoryId) => {
        const { data: items } = await axiosApi.get<Item[]>(`/items`,{params: {category: categoryId}});
        return items;
});

export const fetchOneItem = createAsyncThunk<Item, string>(
    'items/fetchOne',
    async (id) => {

        const { data: item } = await axiosApi.get<Item>(`/items/${id}`);
        return item;
});

export const deleteItem = createAsyncThunk<void, string, { rejectValue: GlobalError; state: RootState }>(
    'items/fetchDelete',
    async (id, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;
        const userId = getState().users.user?._id;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        try {
            const { data: item } = await axiosApi.get<Item>(`/items/${id}`);

            if (item.user !== userId) {
                return rejectWithValue({ error: 'you do not have permission to delete the item' });
            }


            await axiosApi.delete(`/items/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const createItem = createAsyncThunk<void, ItemMutation, { rejectValue: GlobalError; state: RootState }>(
    'items/create',
    async (itemMutation, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        const formData = new FormData();
        const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];
        keys.forEach((key) => {
            const value = itemMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post('/items', formData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);