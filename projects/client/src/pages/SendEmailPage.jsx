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
import { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";

export default function SendEmailPassword() {
  const email = useRef("");
  // const navigate = useNavigate()
  const url = `${process.env.REACT_APP_API_BASE}/users/verifyResetPassword`;

  // const dispatch = useDispatch();

  // const [currentPassword, setCurrentPassword] = useState(false)
  // const [newtPassword, setNewCurrentPassword] = useState(false)

  const resetpasswordSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const onResetPassword = async () => {
    try {
      const user = {
        email: email.current.value,
      };
      // console.log("user", user);
      const res = await Axios.post(url, user);
      // console.log("result", res.data);
      // dispatch(ChangePassword(res.data.user));
      // console.log("user hasil", res.data.user);
      // setMove(true);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Check your mail",
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
  return (
    <div style={bodyStyle}>
      <div style={myStyle}>
        <Formik
          initialValues={{
            email: "",
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
                      Send Email to Reset Password
                    </Heading>
                    <Form>
                      <FormControl
                        id="email"
                        isRequired
                      >
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                          <Input
                            ref={email}
                            name="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
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
  );
}
