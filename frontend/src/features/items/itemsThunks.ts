import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, ItemMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";


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