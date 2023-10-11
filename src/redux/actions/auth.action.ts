import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService, SignUpParams } from '@services/AuthService'
import {setUserState} from "@redux/reducers/user.reducer";
import {UserService} from "@services/UserService";

export interface SignUpResponse {
    data: {
        tokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}
export const signIn = createAsyncThunk<
  SignUpResponse,
  SignUpParams>
('auth/signIn', async (params) => {
    const response = await AuthService.signUp(params);
    console.log(response.status)
    if(response.status === 200) {
        const dataUser = await UserService.getUserData();
        console.log(dataUser.data)
        setUserState(dataUser.data);
    }
    return response.data;
  },
)

export const verifyAccount = createAsyncThunk(
  'auth/verifyAccount',
  async (code: string) => {
      const response = await AuthService.verifyAccount({ code });
      return response.data;
  },
)
