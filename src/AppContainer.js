import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { auth } from "./api/firebase";

// Import routes.
import routeList from "./routes";
import RestrictedRoute from "./routes/RestrictedRoute";
import GuestRoute from "./routes/GuestRoute";
import { userAuthenticated, fetchUserData } from "./redux/actions/users";
import FullPage from "./layouts/FullPage";
// require("firebase/auth");

const restrictedRoutes = routeList
  .filter((route) => route.restrictedRoute && route.enabled)
  .map((route) => (
    <RestrictedRoute
      key={route.path}
      path={route.path}
      component={route.component}
      exact={route.exact}
    />
  ));

const guestRoutes = routeList
  .filter((route) => !route.restrictedRoute && route.enabled)
  .map((route) => (
    <GuestRoute
      key={route.path}
      path={route.path}
      component={route.component}
    />
  ));

function AppContainer(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.users);

  useEffect(() => {
    const checkAuthentications = async () => {
      try {
        await auth().onAuthStateChanged(function (user) {
          if (user) {
            dispatch(userAuthenticated(user));
            dispatch(fetchUserData(user.uid));
          } else {
            // dispatch(userAuthenticated(user))
            // No user is signed in.
          }
        });
      } catch (error) {
        console.log("App Container", error);
      }
    };
    checkAuthentications();
  }, [dispatch, user]);

  useEffect(() => {
    const loadData = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [dispatch]);

  return (
    <FullPage>
      <Switch>{[...guestRoutes, ...restrictedRoutes]}</Switch>
    </FullPage>
  );
}

export default AppContainer;
