import { useMemo, useReducer } from "react"
import UserReducer from "./UserReducer"
import UserContext from "./UserContext"
import { fetchUserByUsername, fetchUserRepos } from "../services/GitHubAPi"
import UserActions from "./UserActions"
import { prepareColumnChartData } from "../utils/ContextStateUtils"

const initialState = {
  userObject: {},
  userRepos: [],
  columnChartData: {},
}

const UserState = ({ children }) => {

  const [globalState, dispatch] = useReducer(UserReducer, initialState)

  const getUserProfile = async (githubUserName) => {
    await fetchUserByUsername(githubUserName)
      .then(response => {
        if (response.status == 200) {
          dispatch({
            type: UserActions.USER_PROFILE,
            payload: response.data
          })
        }
        return response;
      })
      .then(response => {
        if (response.status == 200) {
          getUserRepos(response.data.login)
        }
      })
      .catch(error => {
        console.log("Error While Fetching User Profile", error)
      })
  }

  const getUserRepos = async (githubUserName) => {
    await fetchUserRepos(githubUserName, `per_page=100&page=1`)
      .then(response => {
        if (response.status == 200) {
          dispatch({
            type: UserActions.USER_REPOS,
            payload: response.data
          })
          const chartData = prepareColumnChartData(response.data)
          dispatch({
            type: UserActions.COLUMNCHART_DATA,
            payload: chartData
          })
        }
      })
      .catch(error => {
        console.log("Error While Fetching User Repos", error)
      })
      .finally(() => {
        console.log("Global State ", globalState)
      })
  }

  const clearUserData = () => {
    dispatch({
      type: UserActions.CLEAR_USER_PROFILE,
      payload: ''
    })
  }

  const store = useMemo(() => ({
    globalState,
    getUserProfile,
    getUserRepos,
    clearUserData
  }), [globalState, getUserProfile, getUserRepos, clearUserData])

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState