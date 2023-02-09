import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  useColorMode,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  InputGroup,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Center,
  Square,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import { ChevronDownIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

export const BranchManagement = () => {
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field")
      .min(5, "Name min. 5 characters"),
    email: Yup.string().email().required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password min. 8 characters"),
  });

  const inputBranch = useRef(0);

  const onRegister = async data => {
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/admin/register`,
        {
          data,
          BranchId: inputBranch.current.value,
        },
      );
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/admin/findAll`,
      );
      // console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/branch/getAll`,
      );
      // console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const branchHandler = ({ target }) => {
    const { value } = target;
    setSelectedBranch(value);
  };

  const renderBranch = () => {
    return data2.map(val => {
      return (
        <option
          value={val.id}
          key={val.id.toString()}
        >
          {val.branchName}
        </option>
      );
    });
  };

  useEffect(() => {
    getBranch();
  }, [selectedBranch]);

  return (
    <div>
      <Box
        mt={"50px"}
        className="body"
        bgColor="white"
        h={"600px"}
        align={"center"}
        justify={"center"}
      >
        <Box
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "white.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          border={"2px"}
          borderColor={"gray.200"}
        >
          <Center
            mb={"20px"}
            mt={"20px"}
          >
            <Text
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl" }}
              textAlign="center"
            >
              Branch Admin Management
            </Text>
          </Center>

          <Tabs
            isFitted
            variant="enclosed"
          >
            <TabList mb="1em">
              <Tab>Add Admin</Tab>
              <Tab>List of Admin</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    BranchId: "",
                  }}
                  validationSchema={registerSchema}
                  onSubmit={(values, action) => {
                    onRegister(values);
                    action.setFieldValue("name", "");
                    action.setFieldValue("email", "");
                    action.setFieldValue("password", "");
                    action.setFieldValue("BranchId", "");
                  }}
                >
                  {props => {
                    return (
                      <>
                        <Form>
                          <VStack
                            spacing={4}
                            align="flex-start"
                          >
                            <FormControl isRequired>
                              <FormLabel htmlFor="name">Name</FormLabel>
                              <Field
                                as={Input}
                                type="text"
                                name="name"
                                variant="filled"
                              />
                              <ErrorMessage
                                style={{ color: "red" }}
                                component="div"
                                name="username"
                              />
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <Field
                                as={Input}
                                type="email"
                                name="email"
                                variant="filled"
                              />
                              <ErrorMessage
                                style={{ color: "red" }}
                                component="div"
                                name="email"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Branch</FormLabel>
                              <Select
                                placeholder="Select Branch"
                                onChange={branchHandler}
                                as={Select}
                                ref={inputBranch}
                              >
                                {/* {data2.map(item => {
                                  return (
                                    <>
                                      <option>{item.branchName}</option>
                                    </>
                                  );
                                })} */}
                                {renderBranch()}
                              </Select>
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup>
                                <Field
                                  as={Input}
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  variant="filled"
                                />
                                <InputRightElement h={"full"}>
                                  <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                      setShowPassword(
                                        showPassword => !showPassword,
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
                                name="password"
                                style={{ color: "red" }}
                              />
                            </FormControl>

                            <Button
                              type="submit"
                              width="100%"
                              bg={"green.400"}
                              color={"white"}
                              _hover={{
                                bg: "green.500",
                              }}
                            >
                              Sign up
                            </Button>
                          </VStack>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table
                    ml="10px"
                    mr="10px"
                    variant="simple"
                    colorScheme="teal"
                  >
                    <Thead>
                      <Tr>
                        <Th color={"#285430"}>Name</Th>
                        <Th color={"#285430"}>Email</Th>
                        <Th color={"#285430"}>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map(item => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.name}</Td>
                            <Td color={"#285430"}>{item.email}</Td>
                            <Td color={"#285430"}>
                              {item.isSuper === 2
                                ? "Super Admin"
                                : "Branch Admin"}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
