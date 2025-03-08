import axios from 'axios';

const API_BASE_URL = 'https://api.github.com/users';

export const fetchUserByUsername = async (username) => {
  return await axios.get(`${API_BASE_URL}/${username}`);
};

export const fetchUserFollowers = async (username,pageSize,pageNum) => {
  return await axios.get(`${API_BASE_URL}/${username}/followers?per_page=${pageSize}&page=${pageNum}`);
};

export const fetchUserFollowing = async (username,pageSize,pageNum) => {
  return await axios.get(`${API_BASE_URL}/${username}/following?per_page=${pageSize}&page=${pageNum}`);
};

export const fetchUserRepos = async (username,query) => {
  return await axios.get(`${API_BASE_URL}/${username}/repos?${query}`);
};

export const fetchRepoCommits = async (username,reponame,query) => {
  return await axios.get(`${API_BASE_URL}/${username}/${reponame}/commits?${query}`);
};
