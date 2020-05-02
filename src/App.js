import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
// import ReactGA from 'react-ga';
import { Stack } from '@chakra-ui/core';
import Authenticate from './components/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboardComponents/Dashboard';
import Loading from './components/Loading';
import Mobile from './components/mobile/Mobile';


// function initializeAnalytics() {
//   ReactGA.initialize('UA-157827018-1');
//   ReactGA.pageview('/home');
// }


function App() {
  const { googleApi } = useAuth();
  //mobile breakpoint
  const breakPoint = 768

    //state for current window dimensions
    const [dimensions, setDimensions] = useState({ 
      height: window.innerHeight,
      width: window.innerWidth
    })
    //listens for window resize to set above state. event listener must be cleaned up in the return as below or will cause bugs.
    useEffect(() => {
      function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }
      window.addEventListener('resize', handleResize)
      return _ => {
        window.removeEventListener('resize', handleResize)
      }
      },[])

  //holds the current user, mostly to stop problems with user's profile image from not populating correctly
  const [userState, setUserState] = useState({})
  let currentUser = googleApi.currentUser
  useEffect(()=>{
    setUserState(currentUser)
  },[currentUser])

  
  //display loading spinner while waiting for google api response
  if (googleApi.isLoading) {
    return <Loading />;
  }

  //deals with desktop vs. mobile and logged in vs not. could probably be consolidated
  
  //if at desktop size
  if(dimensions.width > breakPoint){

      //if user is logged in, send them to the dashboard
      if (googleApi.currentUser){
        return (
          <Stack pos="relative" w="100%" minHeight="100vh">
            <Header userState={userState} />
            <Route path="/">
              <Authenticate />
            </Route>
            {googleApi.currentUser && <Route exact path="/">
              <Welcome />
            </Route>}
            <PrivateRoute path="/:id/dashboard">
              <Dashboard setUserState={setUserState}/>
            </PrivateRoute>
          </Stack>
        );
      //if not logged in, attempt to authenticate them
      } else {
        return (
          <Stack pos="relative" w="100%" minHeight="100vh">
            <Header />
            <Route path="/authenticate/google">
              <Authenticate />
            </Route>
            <Route exact path="/">
              <Welcome />
            </Route>
            <PrivateRoute path="/:id/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Stack>

        )
      }
//if at mobile size
} else if(dimensions.width <= breakPoint){
  //if user is logged in
  if(googleApi.currentUser){
    return (
      <Stack pos="relative" w="100%" minHeight="100vh">
            {/* <Header userState={userState} /> */}
            <Route path="/">
              <Authenticate />
            </Route>
            {googleApi.currentUser && <Route exact path="/">
              <Welcome />
            </Route>}
            <PrivateRoute path="/:id/dashboard">
              <Mobile setUserState={setUserState}/>
            </PrivateRoute>
          </Stack>
    )
    //if the user is not logged in
  } else {

    return(
      <Stack pos="relative" w="100%" minHeight="100vh">
              <Header />
              <Route path="/authenticate/google">
                <Authenticate />
              </Route>
              <Route exact path="/">
                <Welcome />
              </Route>
              <PrivateRoute path="/:id/dashboard">
                <Dashboard />
              </PrivateRoute>
            </Stack>
    )
  }

}
}
export default App;
