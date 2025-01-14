import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Container,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import logo from "../assets/output-onlinepngtools.png";
import { useLocation } from "react-router-dom";

const url = "http://localhost:8000/users/register";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const param = useLocation();
  console.log("ini param", param);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const email = param?.search?.split("=")[1]?.split("&")[0];
  const verificationSignature = param?.search?.split("=")[2];

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
      .min(4, "Name min. 5 characters"),
    email: Yup.string().email().required("Email is a required field"),
    password: Yup.string().required().min(6, "Password min 6 Character"),
    phone_number: Yup.string()
      .required("Phone number is a required field")
      .min(11, "Phone number must be 12 numbers")
      .max(12, "Phone number must be 12 numbers"),
  });

  const onRegister = async (data) => {
    try {
      console.log("cek data", data);
      const res = await Axios.post(url, data);
      console.log("result", res.data);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Register Berhasil, Cek Email anda untuk verifikasi akun",
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

  const getData = async () => {
    try {
      const res = await Axios.get(
        `http://localhost:8000/users/verification?email=${email}&verification_signature=${verificationSignature}`
      );
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Verifikasi Berhasil',
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (param.search !== "") {
      onOpen();
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Silahkan klik tombol verify untuk memverifikasi</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={getData}>
              Verify
            </Button>
            {/* <Button onClick={getData}>Verify</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phone_number: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log("onSubmit", values);
          onRegister(values);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <>
              <Container>
                <Form onSubmit={props.handleSubmit}>
                  <Flex
                    minH={"100vh"}
                    align={"center"}
                    justify={"center"}
                    bg="gray.50"
                  >
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                      <Image src={logo} maxW="200px" mb="8" mx="auto" />
                      <Stack align={"center"}>
                        <Heading
                          color="black"
                          fontSize={"4xl"}
                          textAlign={"center"}
                        >
                          Register
                        </Heading>
                      </Stack>
                      <Box rounded={"lg"} bg="green.200" boxShadow={"lg"} p={8}>
                        <Stack spacing={4}>
                          <Box>
                            <FormControl id="firstName" isRequired>
                              <FormLabel>Name</FormLabel>
                              <Field as={Input} name="name" />
                              <ErrorMessage
                                component="div"
                                style={{ color: "red" }}
                                name="name"
                              />
                            </FormControl>
                          </Box>
                          <Stack>
                            <FormControl id="email" isRequired>
                              <FormLabel>Email address</FormLabel>
                              <Field as={Input} name="email" />
                              <ErrorMessage
                                component="div"
                                style={{ color: "red" }}
                                name="email"
                              />
                            </FormControl>
                          </Stack>
                          <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Field
                                as={Input}
                                name="password"
                                type={showPassword ? "text" : "password"}
                              />
                              <InputRightElement h={"full"}>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    setShowPassword(
                                      (showPassword) => !showPassword
                                    )
                                  }
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <ErrorMessage
                              component="div"
                              style={{ color: "red" }}
                              name="password"
                            />
                          </FormControl>
                          <FormControl id="phone_number" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Field as={Input} name="phone_number" />
                            <ErrorMessage
                              component="div"
                              style={{ color: "red" }}
                              name="phone_number"
                            />
                          </FormControl>
                          <Stack spacing={10} pt={2}>
                            <Button
                              // onClick={onRegister}
                              type="submit"
                              loadingText="Submitting"
                              size="lg"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                bg: "blue.500",
                              }}
                            >
                              Sign up
                            </Button>
                          </Stack>
                          <Stack pt={6}>
                            <Text align={"center"}>
                              Already a user?{" "}
                              <Link color={"blue.400"}>Login</Link>
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </Flex>
                </Form>
              </Container>
            </>
          );
        }}
      </Formik>
    </>
  );
}
