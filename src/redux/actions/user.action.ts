import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "@services/UserService";

export const getUserData = createAsyncThunk(
    'auth/getMe',
    async () => {
        const response = await UserService.getUserData();
        return response.data;
    }
)
