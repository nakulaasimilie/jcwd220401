import {
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  Container,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ChangePassword = data => {
  const oldPassword = useRef("");
  const newPassword = useRef("");
  const confirmPassword = useRef("");
  const { id, email } = useSelector(state => state.userSlice.value);
  const url = `${process.env.REACT_APP_API_BASE}/users/changePassword/${id}`;

  const [move, setMove] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const changePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required("Password is required"),
    new_password: Yup.string().required("New password is required"),
    confirm_password: Yup.string().required("Confirm Password is required"),
  });

  const onChangePassword = async data => {
    try {
      const user = {
        oldPassword: oldPassword.current.value,
        newPassword: newPassword.current.value,
        confirmPassword: confirmPassword.current.value,
        email,
      };
      // console.log("user", user);
      const res = await Axios.patch(url, user);
      // console.log("result", res.data);
      setMove(true);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Change Password Succsess",
      });
    } catch (err) {
      console.log("err", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data,
      });
    }
  };

  useEffect(() => {}, []);

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
      to="/"
      replace={true}
    />
  ) : (
    <>
      <div style={bodyStyle}>
        <div style={myStyle}>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={changePasswordSchema}
            onSubmit={values => {
              onChangePassword(values);
            }}
          >
            {props => {
              // console.log(props);
              return (
                <Container>
                  <Flex
                    minH={"100vh"}
                    align={"center"}
                    justify={"center"}
                    bgGradient="linear(to-t, #ebf5e9, #ffff)"
                  >
                    <Stack
                      spacing={4}
                      mx={"auto"}
                      maxW={"lg"}
                      py={3}
                      px={3}
                    >
                      <Stack align={"center"}>
                        <Heading
                          lineHeight={1.1}
                          fontSize={{ base: "2xl", md: "3xl" }}
                        >
                          Change Password
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
                            <FormControl
                              id="oldPassword"
                              isRequired
                            >
                              <FormLabel>Old Password</FormLabel>
                              <InputGroup>
                                <Input
                                  ref={oldPassword}
                                  name="oldPassword"
                                  type={showPassword ? "text" : "password"}
                                />
                                <ErrorMessage
                                  name="oldPassword"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                                <InputRightElement h={"full"}>
                                  <Button
                                    variant={"ghost"}
                                    onClick={handleClick}
                                  >
                                    {showPassword ? (
                                      <ViewIcon />
                                    ) : (
                                      <ViewOffIcon />
                                    )}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                            </FormControl>
                            <FormControl
                              id="newPassword"
                              isRequired
                            >
                              <FormLabel>New Password</FormLabel>
                              <InputGroup>
                                <Input
                                  ref={newPassword}
                                  name="newPassword"
                                  type={showPassword ? "text" : "password"}
                                />
                                <ErrorMessage
                                  name="newPassword"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                                <InputRightElement h={"full"}>
                                  <Button
                                    variant={"ghost"}
                                    onClick={handleClick}
                                  >
                                    {showPassword ? (
                                      <ViewIcon />
                                    ) : (
                                      <ViewOffIcon />
                                    )}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                            </FormControl>
                            <FormControl
                              id="confirmPassword"
                              isRequired
                            >
                              <FormLabel>Confirm Password</FormLabel>
                              <InputGroup>
                                <Input
                                  ref={confirmPassword}
                                  name="confrimPassword"
                                  type={showPassword ? "text" : "password"}
                                />
                                <ErrorMessage
                                  name="confirmPassword"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                                <InputRightElement h={"full"}>
                                  <Button
                                    variant={"ghost"}
                                    onClick={handleClick}
                                  >
                                    {showPassword ? (
                                      <ViewIcon />
                                    ) : (
                                      <ViewOffIcon />
                                    )}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                            </FormControl>
                          </Stack>
                          <Stack spacing={8}>
                            <Button
                              marginTop={10}
                              bg={"yellow.400"}
                              color={"black"}
                              _hover={{
                                bg: "yellow.300",
                              }}
                              onClick={onChangePassword}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Stack>
                        </Form>
                      </Box>
                    </Stack>
                  </Flex>
                </Container>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};
