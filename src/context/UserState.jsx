import { useMemo, useReducer, useState } from "react"
import UserReducer from "./UserReducer"
import UserContext from "./UserContext"
import { fetchUserByUsername, fetchUserFollowers, fetchUserFollowing, fetchUserRepos } from "../services/GitHubAPi"
import UserActions from "./UserActions"
import { prepareColumnChartData } from "../utils/ContextStateUtils"
import Spinner from "../utils/Spinner"
import Notifier from "../utils/Notifier"

const initialState = {
  userObject: {},
  userRepos: [],
  columnChartData: {},
  followers: [],
  following: []
}

const UserState = ({ children }) => {
  const [state, setState] = useState({
    showSpinner: false,
    showNotification: false,
    severity: '',
    message: ''
  })
  const [globalState, dispatch] = useReducer(UserReducer, initialState)


  const handleNotifierClose = () => {
    setState(prevState => ({ ...prevState, severity: '', message: '', showNotification: false }))
  }

  const getUserProfile = async (githubUserName) => {
    setState(prevState => ({ ...prevState, showSpinner: true }))
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
          setState(prevState => ({ ...prevState, severity: 'success', message: 'User Details fetched Successfully!', showNotification: true }))
        }
      })
      .catch(error => {
        if (error.status == 403) {
          setState(prevState => ({ ...prevState, severity: 'warning', message: error.message, showNotification: true }))
          console.log("Rate Limit exceeded , ", error)
        } else {
          setState(prevState => ({ ...prevState, severity: 'error', message: 'InValid User Name', showNotification: true }))
          console.log("Error While Fetching User Profile", error)
        }
      })
      .finally(() => {
        setState(prevState => ({ ...prevState, showSpinner: false }))
      })
  }

  const getUserRepos = async (githubUserName) => {
    setState(prevState => ({ ...prevState, showSpinner: true }))
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
        setState(prevState => ({ ...prevState, showSpinner: false }))
        console.log("Global State ", globalState)
      })
  }

  const getUserFollowers = async (githubUserName) => {
    setState(prevState => ({ ...prevState, showSpinner: true }))
    await fetchUserFollowers(githubUserName)
      .then(response => {
        if (response.status == 200) {
          dispatch({
            type: UserActions.FOLLOWERS_DATA,
            payload: response.data
          })
        }
      })
      .catch(error => {
        console.log("Error While Fetching User Followers", error)
      })
      .finally(() => {
        setState(prevState => ({ ...prevState, showSpinner: false }))
      })
  }

  const getUserFollowingData = async (githubUserName) => {
    setState(prevState => ({ ...prevState, showSpinner: true }))
    await fetchUserFollowing(githubUserName)
      .then(response => {
        if (response.status == 200) {
          dispatch({
            type: UserActions.FOLLOWING_DATA,
            payload: response.data
          })
        }
      })
      .catch(error => {
        console.log("Error While Fetching User Following data", error)
      })
      .finally(() => {
        setState(prevState => ({ ...prevState, showSpinner: false }))
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
    clearUserData,
    getUserFollowers,
    getUserFollowingData
  }), [globalState, getUserProfile, getUserRepos, clearUserData, getUserFollowers, getUserFollowingData])

  return (
    <>
      <Notifier open={state.showNotification} onClose={handleNotifierClose} message={state.message} severity={state.severity} />
      <Spinner open={state.showSpinner} />
      <UserContext.Provider value={store}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export default UserState