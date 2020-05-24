import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { firestore, auth, functions, storage } from "../../api/firebase";

import "../../App.css";
import { signIn, signOut } from "../../redux/actions/users";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetching = useSelector((store) => store.users.fetching);
  const { user } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentications = async () => {
      try {
        await auth().onAuthStateChanged(function (user) {
          if (user) {
            props.history.push(`/profile/${user.uid}`);
          } else {
            // dispatch(userAuthenticated(user))
            // No user is signed in.
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkAuthentications();
  }, [dispatch, props.history, user]);

  // useEffect(() => {
  //   dispatch(signOut());
  // });
  // dispatch(signOut());

  // console.log(dispatch(signOut));

  const login = () => {
    dispatch(signIn(email, password))
      .then((data) => {
        console.log("Logged In");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Spin spinning={fetching}>
        <h1>Login</h1>
        <br />
        <Input.Group>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                addonBefore="Email Address"
                placeholder="Email Address"
              />
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={12}>
              <Input.Password
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                addonBefore="Password"
                placeholder="Password"
                onPressEnter={email && password ? login : null}
              />
            </Col>
          </Row>
        </Input.Group>
        <br />
        <Button
          type="primary"
          onClick={login}
          disabled={email && password ? false : true}
        >
          Login
        </Button>
      </Spin>
    </div>
  );
}

export default Login;
