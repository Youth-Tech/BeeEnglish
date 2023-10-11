import APIUtils from "@utils/AxiosInstance";

const enum endPoints {
    getUserData = "user/me",
}

export interface UserData {
    _id: string,
    email: string,
    fullName: string,
    avatar: string,
    badges: [],
    courseCompleted: [],
    createdAt: string,
    id: string,
    isVerified: boolean,
    level: number,
    postBookmarks: [],
    role: string,
    score: number,
    streak: number,
    username: string,
    wordBookmarks: [],
    provider: string,
    refreshToken: string,
}
export const UserService = {
    getUserData() {
        return APIUtils.get<UserData>(endPoints.getUserData);
    },
} as const
