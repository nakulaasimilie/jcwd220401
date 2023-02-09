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
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { UpdateInventory } from "./UpdateInventory";

export const AdminInventory = () => {
  const [branch, setBranch] = useState();
  const inputBranch = useRef("");
  const inputProductName = useRef("");
  const inputEntryDate = useRef("");
  const inputQty = useRef("");
  const [data2, setData2] = useState();
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState();
  const [edit, setEdit] = useState({});
  const { id } = useSelector(state => state.adminSlice.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/branch/adminByBranch/${id}`,
      );
      setBranch(res.data);
      setData4(res.data.id);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/inventory/findAllByBranch/${data4}`,
      );
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [data4, edit]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/list`,
      );
      setData3(res.data);
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
        ProductId: inputProductName.current.value,
        Stock: inputQty.current.value,
        BranchId: data4,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/inventory/create`,
        addProduct,
      );
      Swal.fire({
        icon: "success",
        text: "Stock Updated",
      });
      setTimeout(() => window.location.replace("/addInventory"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const findStock = async () => {
    try {
      const stock = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/inventory/find/${data4}`,
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findStock();
  }, [data4]);

  return (
    <div>
      <Box
        mt={"50px"}
        className="body"
        bgColor="white"
        h={"auto"}
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
              Add Inventory
            </Text>
          </Center>
          <Tabs>
            <TabList mb="1em">
              <Tab w={"50%"}>List of Inventory</Tab>
              <Tab w={"50%"}>Add Inventory</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                    <Tbody>
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
                            <Td
                              textAlign={"center"}
                              color={"#285430"}
                            ></Td>

                            <Td>
                              <Box
                                mr="28px"
                                display={"flex"}
                                justifyContent="space-evenly"
                              >
                                <Button
                                  onClick={() => {
                                    setEdit(item);
                                    setOverlay(<OverlayOne />);
                                    onOpen();
                                  }}
                                >
                                  <EditIcon color={"#285430"} />
                                </Button>
                                <Button
                                  onClick={() => {
                                    // onDelete(item.id)
                                  }}
                                >
                                  <DeleteIcon color={"#285430"} />
                                </Button>
                              </Box>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Modal
                  isCentered
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  {overlay}
                  <ModalContent
                    bgColor={"#E5D9B6"}
                    color="#285430"
                    border="2px"
                  >
                    <ModalHeader textColor={"#285430"}>
                      Edit Category
                    </ModalHeader>
                    <ModalCloseButton />
                  </ModalContent>
                </Modal>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={"70vh"}
                  justify={"center"}
                  bg={useColorModeValue("white.50", "white.800")}
                  mt={2}
                >
                  <Stack
                    spacing={4}
                    w={"full"}
                    maxW={"md"}
                    bg={useColorModeValue("white", "white.700")}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                    my={12}
                    mt={0}
                  >
                    <Heading
                      lineHeight={1.1}
                      fontSize={{ base: "2xl", sm: "3xl" }}
                      textAlign="center"
                    >
                      Tambah Produk
                    </Heading>
                    <Flex></Flex>
                    <Flex>
                      <FormControl
                        id="title"
                        isRequired
                      >
                        <FormLabel>Branch</FormLabel>
                        <Input
                          _placeholder={{ color: "gray.500" }}
                          type="text"
                          ref={inputBranch}
                          defaultValue={branch?.branchName}
                        />
                      </FormControl>
                    </Flex>
                    <FormControl
                      id="author"
                      isRequired
                    >
                      <FormLabel>Produk</FormLabel>
                      <Select
                        ref={inputProductName}
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
                    <FormControl
                      id="publisher"
                      isRequired
                    >
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        _placeholder={{ color: "gray.500" }}
                        type="publisher"
                        ref={inputQty}
                      />
                    </FormControl>

                    <Stack
                      spacing={6}
                      direction={["column", "row"]}
                    >
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={onCreate}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};
