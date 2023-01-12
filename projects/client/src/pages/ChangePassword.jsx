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
// import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ChangePassword = (data) => {
  const oldPassword = useRef("");
  const newPassword = useRef("");
  const confirmPassword = useRef("");
  // const navigate = useNavigate()
  const { id, email } = useSelector((state) => state.userSlice.value);
  const url = `http://localhost:8000/users/changePassword/${id}`;

  const [move, setMove] = useState(false);

  // const dispatch = useDispatch();

  // const [currentPassword, setCurrentPassword] = useState(false)
  // const [newtPassword, setNewCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const changePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required("Password is required"),
    new_password: Yup.string().required("New password is required"),
    confirm_password: Yup.string().required("Confirm Password is required"),
  });

  const onChangePassword = async (data) => {
    try {
      const user = {
        oldPassword: oldPassword.current.value,
        newPassword: newPassword.current.value,
        confirmPassword: confirmPassword.current.value,
        email,
      };
      console.log("user", user);
      const res = await Axios.patch(url, user);
      console.log("result", res.data);
      // dispatch(ChangePassword(res.data.user));
      // console.log(res.data.user);
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

  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={(values) => {
          onChangePassword(values);
        }}>
        {(props) => {
          console.log(props);
          return (
            <Container>
              <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg="gray.50">
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  bg="white"
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={12}>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}>
                    Change Password
                  </Heading>
                  <Form>
                    <FormControl id="oldPassword" isRequired>
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
                          <Button variant={"ghost"} onClick={handleClick}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="newPassword" isRequired>
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
                          <Button variant={"ghost"} onClick={handleClick}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
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
                          <Button variant={"ghost"} onClick={handleClick}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={8}>
                      <Button
                        marginTop={10}
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={onChangePassword}
                        type="submit">
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
    </>
  );
};
