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
} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const password = useRef("");
  const confirmPassword = useRef("");
  const param = useLocation();
  // console.log("ini param", param);
  const email = param?.search.split("=")[1]?.split("&");
  const verificationSignature = param?.search?.split("=")[2];
  const url = `${process.env.REACT_APP_API_BASE}/users/resetPassword?=${email}&verification_signature=${verificationSignature}`;

  const [move, setMove] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const resetpasswordSchema = Yup.object().shape({
    password: Yup.string().required("Password min 6 Character"),
    confirmPassword: Yup.string().required("Confirm Password required"),
  });

  const onResetPassword = async () => {
    try {
      const user = {
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        verificationSignature,
      };
      // console.log("user", user);
      const res = await Axios.post(url, user);
      // console.log("result", res.data);
      setMove(true);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Password Sukses Di Reset",
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
      to="/login"
      replace={true}
    />
  ) : (
    <>
      <div style={bodyStyle}>
        <div style={myStyle}>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={resetpasswordSchema}
            onSubmit={values => {
              onResetPassword(values);
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
                      w={"full"}
                      maxW={"md"}
                      bg="white"
                      rounded={"xl"}
                      boxShadow={"lg"}
                      p={6}
                      my={12}
                    >
                      <Heading
                        lineHeight={1.1}
                        fontSize={{ base: "2xl", md: "3xl" }}
                      >
                        Reset Password
                      </Heading>
                      <Form>
                        <FormControl
                          id="password"
                          isRequired
                        >
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              ref={password}
                              name="password"
                              type={showPassword ? "text" : "password"}
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
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
                              name="confirmPassword"
                              type={showPassword ? "text" : "confirmPassword"}
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
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <Stack spacing={8}>
                          <Button
                            marginTop={10}
                            bg={"yellow.400"}
                            color={"black"}
                            _hover={{
                              bg: "yellow.300",
                            }}
                            onClick={onResetPassword}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Stack>
                      </Form>
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
}
