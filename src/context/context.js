import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //request loading errors
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    setLoading(true);
    toggleError(false, "");
    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      if (response) {
        setGithubUser(response.data);
        const { login, followers_url } = response.data;

        //follwers repos
        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`),
        ])
          .then((result) => {
            const [repos, followers] = result;
            const status = "fulfilled";
            console.log(result);
            if (repos.status === status) {
              setRepos(repos.value.data);
            }

            if (followers.status === status) {
              setFollowers(followers.value.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        toggleError(true, "there is no user with that username");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function toggleError(show = false, msg = "") {
    setErrors({ show, msg });
  }

  useEffect(() => {
    const checkRequests = () => {
      axios(`${rootUrl}/rate_limit`)
        .then(({ data }) => {
          let {
            rate: { remaining },
          } = data;

          setRequests(remaining);
          if (remaining === 0) {
            toggleError(
              true,
              "sorry , you have exceeded your hourly rate limit!"
            );
          }
        })
        .catch((err) => console.log(err));
    };

    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        errors,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
const useGlobalContext = () => {
  return React.useContext(GithubContext);
};
export { GithubProvider, useGlobalContext };
