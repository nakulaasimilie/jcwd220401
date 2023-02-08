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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
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
      console.log(res.data);
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
        stockQty: inputQty.current.value,
        entryDate: inputEntryDate.current.value,
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
      setTimeout(() => window.location.replace("/admin"), 2000);
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
        <Flex
          mt={"80px"}
          ml={"150px"}
        >
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
                    {/* <Th color={"#285430"}>Entry Date</Th> */}
                    <Th color={"#285430"}>Quantity</Th>
                    {/* <Th color={"#285430"}>Final Stock</Th> */}
                    {/* <Th color={"#285430"}>Actions</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {data2?.map(item => {
                    return (
                      <Tr>
                        <Td color={"#285430"}>{item.Product.name}</Td>
                        {/* <Td>{item.entryDate}</Td> */}
                        <Td
                          textAlign={"center"}
                          color={"#285430"}
                        >
                          {item.stock}
                        </Td>
                        {/* {data5?.map((item) => {
                        return (
                          <> */}
                        <Td
                          textAlign={"center"}
                          color={"#285430"}
                        >
                          {/* {item?.totalQty} */}
                        </Td>
                        {/* </>
                        );
                      })} */}
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
          </Box>
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
              <ModalHeader textColor={"#285430"}>Edit Category</ModalHeader>
              <ModalCloseButton />
            </ModalContent>
          </Modal>
          <Box
            ml="120px"
            mt="100px"
            color={useColorModeValue("#285430")}
            border="2px"
            borderRadius="2xl"
          >
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
                  <Input
                    textColor="gray.800"
                    borderColor="#285430"
                    ml="5px"
                    w="97%"
                    ref={inputEntryDate}
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
                    Add Stock
                  </Button>
                </Center>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};
