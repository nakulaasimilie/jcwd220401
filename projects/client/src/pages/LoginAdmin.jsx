import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { loginAdmin } from "../redux/adminSlice";

//img logo import
import logo from "../assets/output-onlinepngtools.png";

//url login and keeplogin
const url = "http://localhost:8000/admin/login";

export const LoginAdmin = () => {
  const adminSelector = useSelector(state => state.adminSlice);

  // useRef for password and email
  const password = useRef("");
  const email = useRef("");

  //move to homepage
  const [move, setMove] = useState(false);

  //Keep login
  const dispatch = useDispatch();

  // Hide and Unhide Password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //formik yup validation login
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("email must be example@example.com")
      .required("Required"),
  });

  //Login Function
  const onLogin = async () => {
    try {
      const admin = {
        password: password.current.value,
        email: email.current.value,
      };
      const result = await axios.post(url, admin);
      // console.log(result.data);
      dispatch(loginAdmin(result.data.user));
      // console.log(result.data.user);
      // localStorage.setItem("tokenAdmin", result.data.token);
      if (result.data.user.isSuper === 2) {
        localStorage.setItem("tokenAdmin", result.data.token);
      } else if (result.data.user.isSuper === 1) {
        localStorage.setItem("tokenBranch", result.data.token);
      }
      setMove(true);

      Swal.fire({
        icon: "success",
        tittle: "Sukses",
        text: result.data.msg,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: err.response.data,
      });
    }
  };

  const myStyle = {
    maxWidth: "506px",
    heigth: "auto",
    backgroundColor: "white",
    margin: "auto",
  };
  const bodyStyle = {
    backgroundColor: "grey",
    width: "auto",
    height: "auto",
  };
  return move ? (
    <Navigate
      to="/dashboard"
      replace={true}
    />
  ) : (
    <div style={bodyStyle}>
      <div style={myStyle}>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={loginSchema}
          onSubmit={values => {
            onLogin(values);
          }}
        >
          {props => {
            // console.log(props);
            return (
              <Flex
                minH={"100vh"}
                algin={"center"}
                justify={"center"}
                bgGradient="linear(to-t, #ebf5e9, #ffff)"
                maxWidth={"506px"}
              >
                <Stack
                  spacing={4}
                  mx={"auto"}
                  maxW={"lg"}
                  py={3}
                  px={3}
                >
                  <Image
                    src={logo}
                    maxW="160px"
                    mb="5"
                    mx="auto"
                  />
                  <Stack align={"center"}>
                    <Heading
                      fontSize={"2xl"}
                      color="black"
                    >
                      Login Admin
                    </Heading>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={"white"}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Form>
                      <Stack spacing={4}>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <Input
                            ref={email}
                            name="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </FormControl>
                        <Stack>
                          <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Input
                                ref={password}
                                name="password"
                                type={show ? "text" : "password"}
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <InputRightElement h={"full"}>
                                <Button
                                  variant={"ghost"}
                                  onClick={handleClick}
                                >
                                  {show ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        </Stack>
                        <Button
                          bg={"yellow.400"}
                          color={"black"}
                          _hover={{
                            bg: "yellow.300",
                          }}
                          onClick={onLogin}
                          type="submit"
                        >
                          Sign in
                        </Button>
                        {/* <Button isLoading bg={"blue.300"} color={"white"} /> */}
                      </Stack>
                    </Form>
                  </Box>
                </Stack>
              </Flex>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
