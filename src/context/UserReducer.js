import UserActions from "./UserActions";

const UserReducer = (state, action) => {
    switch (action.type) {
        case UserActions.USER_PROFILE: {
            return {
                ...state,
                userObject: action.payload
            }
        }
        case UserActions.USER_REPOS: {
            return {
                ...state,
                userRepos: action.payload
            }
        }
        case UserActions.COLUMNCHART_DATA: {
            return {
                ...state,
                columnChartData: action.payload
            }
        }
        case UserActions.FOLLOWERS_DATA: {
            return {
                ...state,
                followers: action.payload,
            }
        }
        case UserActions.FOLLOWING_DATA: {
            return {
                ...state,
                following: action.payload,
            }
        }
        case UserActions.CLEAR_USER_PROFILE: {
            return {
                userObject: {},
                userRepos: [],
                columnChartData: {},
                following:[],
                followers:[]
            }
        }
        default: {
            return state
        }

    }
}
export default UserReducer;