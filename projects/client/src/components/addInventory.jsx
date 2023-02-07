import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export const AdminInventory = () => {
  const inputName = useRef("");
  const inputQty = useRef(0);
  const inputBranch = useRef("");

  const { id } = useSelector(state => state.adminSlice.value);

  const [branch, setBranch] = useState();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const getData = async BranchId => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/inventory/findAllByBranch/${data}`,
      );
      setData2(result.data);
      // console.log(result.data);
      // console.log(result.data[0]?.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getProduct = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/list`,
      );
      setData3(result.data);
      // console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onCreate = async () => {
    try {
      const addProduct = {
        AdminId: id,
        Stock: inputQty.current.value,
        ProductId: inputName.current.value,
        BranchId: data,
      };
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/inventory/create`,
        addProduct,
      );
      Swal.fire({
        icon: "success",
        text: "Stock Updated",
      });
      setTimeout(() => window.location.replace("/dashboard"), 2000);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const getBranch = async AdminId => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/branch/adminByBranch/2`,
      );
      // dispatch(loginAdmin(res.data))
      setBranch(result.data);
      // console.log(result.data);
      // setData(result.data?.id);
      // console.log(result.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

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
        <Center
          mb={"20px"}
          mt={"20px"}
        >
          <Text
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            textAlign="center"
          >
            Inventory
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
              <Box>
                <TableContainer
                  mt={"50px"}
                  w="45vw"
                  bgColor={"white"}
                >
                  <Table
                    variant="simple"
                    colorScheme="#285430"
                  >
                    <Thead alignContent={"center"}>
                      <Tr>
                        <Th color={"#285430"}>Product</Th>
                        <Th color={"#285430"}>Quantity</Th>
                      </Tr>
                    </Thead>
                    {/* <Tbody>
                      {data2?.map(item => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>{item.Product.name}</Td>
                            <Td
                              textAlign={"center"}
                              color={"#285430"}
                            >
                              {item.Stock}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody> */}
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                w={"300px"}
                m="20px"
                mb="25px"
                borderWidth="2px"
                boxShadow="xl"
                borderRadius="8px"
                borderColor="#285430"
              >
                <Box
                  pt="10px"
                  h="50px"
                  borderTopRadius="8px"
                  align="center"
                  bg="#E5D9B6"
                  fontSize="18px"
                >
                  <Text
                    mx="10px"
                    justifyContent="center"
                    fontWeight="bold"
                    color="#285430"
                  >
                    Add Stock
                  </Text>
                </Box>
                <Stack spacing={"10px"}>
                  <FormControl>
                    <FormLabel
                      color="#285430"
                      mt="10px"
                      ml="8px"
                      fontSize="18px"
                      as={"b"}
                    >
                      Branch
                    </FormLabel>
                    <Input
                      ref={inputBranch}
                      color={"#285430"}
                      borderColor="#285430"
                      ml="5px"
                      w="97%"
                      defaultValue={branch?.branchName}
                    ></Input>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="#285430"
                      mt="10px"
                      ml="8px"
                      fontSize="18px"
                      as={"b"}
                    >
                      Product{" "}
                    </FormLabel>

                    <Select
                      ref={inputName}
                      color={"#285430"}
                      borderColor="#285430"
                      ml="5px"
                      w="97%"
                    >
                      <option>Select Product</option>
                      {data3?.map(item => {
                        return (
                          <>
                            <option value={item.id}>{item.name}</option>
                          </>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="#285430"
                      mt="10px"
                      ml="8px"
                      fontSize="18px"
                      as={"b"}
                    >
                      Entry Date
                    </FormLabel>
                    {/* <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  ref={inputEntryDate}
                ></Input> */}
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="#285430"
                      mt="10px"
                      ml="8px"
                      fontSize="18px"
                      as={"b"}
                    >
                      Quantity
                    </FormLabel>
                    <Input
                      textColor="gray.800"
                      borderColor="#285430"
                      ml="5px"
                      w="97%"
                      ref={inputQty}
                    ></Input>
                  </FormControl>
                  <Center>
                    <Button
                      mb="20px"
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="2px"
                      fontSize="18px"
                      color="gray.800"
                      width={"50%"}
                      justifyContent="center"
                      onClick={onCreate}
                    >
                      Confirm
                    </Button>
                  </Center>
                </Stack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
