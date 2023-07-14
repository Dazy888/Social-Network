import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PublicUserData } from "@/models/users.models"

interface UsersState {
    // openedUser: PublicUserData
}

let initialState: UsersState = {
    // openedUser: {
    //     name: '',
    //     location: '',
    //     avatar: '',
    //     banner: '',
    //     aboutMe: '',
    //     hobbies: '',
    //     skills: '',
    //     posts: [],
    //     subscriptions: {
    //         followings: [],
    //         followers: []
    //     }
    // }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // setOpenedUser(state, action: PayloadAction<PublicUserData>) {
        //     state.openedUser = action.payload
        // }
    }
})

// export const { setOpenedUser } = usersSlice.actions
export const usersReducer = usersSlice.reducer
