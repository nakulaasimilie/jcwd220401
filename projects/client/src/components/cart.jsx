import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartSync } from "../redux/cartSlice";
import { deleteCart } from "../redux/userSlice";
import { PopoutCheckout } from "./PopoutCheckout";
import { useRef } from "react";
import { syncAddress } from "../redux/addressSlice";
import { FaTrashAlt } from "react-icons/fa";

export const CartComp = () => {
  const [checkout, setCheckout] = useState(false);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState(0);
  const [data8, setData8] = useState();
  const [data9, setData9] = useState();
  const [data10, setData10] = useState();
  const data = useSelector(state => state.cartSlice.value);
  const { id } = useSelector(state => state.userSlice.value);
  const dataAddress = useSelector(state => state.addressSlice.value);
  const dataBranch = useSelector(state => state.branchSlice.value);
  const inputRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/findBy/${id}`,
      );
      dispatch(cartSync(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getCheckout = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/findCheckout/${id}`,
      );
      const selectedItem = res.data
        .filter(item => item.status === true)
        .map(item => item.totalCheckout)
        .reduce((a, b) => a + b);

      const selectedWeight = res.data
        .filter(item => item.status === true)
        .map(item => item.totalWeight)
        .reduce((a, b) => a + b);

      setTotalCheckout(selectedItem);
      setTotalWeight(selectedWeight);
      setData3(res.data);
      setData9(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCheckout();
  }, [id]);

  const onCheckout = async (id, status) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE}/cart/cartUpdate/${id}`,
        {
          status: status ? false : true,
          id: id,
        },
      );
      getData();
      setCheckout(!checkout);
      getCheckout();
    } catch (err) {
      console.log(err);
    }
  };

  const onQty = async (idCart, qty) => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE}/cart/update/${id}`,
        {
          id: idCart,
          qty,
        },
      );
      getData();

      setCheckout(!checkout);
    } catch (err) {
      console.log(err);
    }
  };

  const getAddress = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:8000/address/addressById/${id}`,
      );
      console.log("cek setAddress", result.data);
      dispatch(syncAddress(result.data.data));
      console.log(syncAddress(result.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAddress();
  }, [id]);

  const onDelete = async id => {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_BASE}/cart/remove/${id}`);

      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/findBy/${id}`,
      );
      dispatch(cartSync(result.data));
      dispatch(deleteCart());
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const onCharge = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/findCheckout/${id}`,
      );
      const selectedItem = result.data
        .filter(item => item.status === true)
        .map(item => item.totalCheckout)
        .reduce((a, b) => a + b);

      setData5(selectedItem);
      console.log(selectedItem);

      const selectedWeight = result.data
        .filter(item => item.status === true)
        .map(item => item.totalWeight)
        .reduce((a, b) => a + b);

      setData6(selectedWeight);
      console.log(selectedWeight);

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/cart/createCost`,
        {
          origin: 22,
          weight: 1000,
          courier: "jne",
          destination: 58,
        },
      );
      console.log(res);
      setData4(res.data?.rajaongkir.results[0]?.costs);

      const selectedCharge =
        res.data?.rajaongkir.results[0]?.costs[data7]?.cost[0]?.value;

      let totalOrder = selectedItem + selectedCharge;
    } catch (err) {}
  };

  useEffect(() => {
    onCharge();
  }, [data7]);

  const findOngkir = async () => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/cart/createCost`,
        {
          origin: 22,
          weight: data6,
          courier: "jne",
          destination: 58,
        },
      );

      const selectedCharge =
        res.data?.rajaongkir.results[0]?.costs[data7]?.cost[0]?.value;

      setData8(selectedCharge);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findOngkir();
  }, [data7]);

  const onCreate = async data10 => {
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/transaction/create/${id}`,
        {
          UserId: id,
          totalOrder: data5,
          totalWeight: data6,
          totalCharge: data8,
          ProductId: data3[0]?.ProductId,
          // BranchId: data9[0]?.BranchId,
        },
      );

      navigate(`/checkout/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box>
        <Stack spacing={"10px"}>
          <FormControl
            ml={"10px"}
            mr={"10px"}
          >
            <FormLabel textColor="#285430">Products</FormLabel>
            <TableContainer
              bg="grey.100"
              maxWidth="450px"
              maxHeight="200px"
              overflowY={"scroll"}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Img</Th>
                    <Th>Keterangan</Th>
                    <Th>Harga</Th>
                    <Th>Jumlah Item</Th>
                    <Th>Hapus Item</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          <Stack>
                            <Image
                              boxSize="35px"
                              objectFit="cover"
                              src={
                                `${process.env.REACT_APP_API_BASE}/` +
                                item.Product?.images
                              }
                            />
                          </Stack>
                        </Td>
                        <Td>
                          <Box
                            display="flex"
                            fontSize="xs"
                          >
                            <Text
                              fontWeight="bold"
                              mr="5px"
                            >
                              {item.Product.name}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box
                            display="flex"
                            fontSize="xs"
                          >
                            <Text
                              fontWeight="bold"
                              mr="5px"
                            >
                              {" "}
                              {item.Product.price}{" "}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box>
                            <HStack
                              ml={"20px"}
                              mr="20px"
                              maxW="200px"
                              textColor={"#285430"}
                            >
                              <Button
                                pb={"4"}
                                variant={"unstyled"}
                                onClick={() => {
                                  var qtyMin = item.qty - 1;
                                  onQty(item.id, qtyMin);
                                  qtyMin = onQty <= 0 ? 1 : onQty;
                                  document.getElementById("qtyInput").value =
                                    parseInt(qtyMin);
                                }}
                              >
                                -
                              </Button>
                              <Text w={"10px"}>{item.qty}</Text>
                              <Button
                                pb={"4"}
                                variant={"unstyled"}
                                onClick={() => {
                                  onQty(item.id, item.qty + 1);
                                }}
                              >
                                +
                              </Button>
                            </HStack>
                          </Box>
                        </Td>
                        <Td>
                          <Button>
                            <Icon
                              boxSize="4"
                              onClick={() => onDelete(item.id)}
                              as={FaTrashAlt}
                            />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </FormControl>
          <FormControl>
            <FormLabel
              mt={"10px"}
              ml={"10px"}
              textColor="#285430"
            >
              Total
            </FormLabel>
            <PopoutCheckout props={totalCheckout} />
          </FormControl>
          <FormControl>
            <FormLabel
              mt={"10px"}
              ml={"10px"}
              textColor="#285430"
            >
              Shipping Method
            </FormLabel>
            <Select
              w={"370px"}
              ml="10px"
              border={"1px"}
              borderColor="#285430"
              borderRadius={"md"}
              textColor="#285430"
              ref={inputRef}
              onChange={() => setData7(inputRef.current.value)}
            >
              <option>Select Shipping Method</option>
              {data4?.map((item, index) => {
                return (
                  <option value={index}>
                    {item.cost[0].etd} days, Rp{item.cost[0].value}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel
              mt={"10px"}
              ml={"10px"}
              textColor="#285430"
            >
              Address
            </FormLabel>
            {dataAddress?.map(item => {
              return (
                <>
                  <Stack
                    spacing={4}
                    mx={"auto"}
                    maxW={"lg"}
                  >
                    <Box
                      rounded={"lg"}
                      bg={"#ebf5e9"}
                      boxShadow={"lg"}
                      p={3}
                      marginTop="2px"
                    >
                      <Text>{item.addressFill}</Text>
                      <Text>{item.district}</Text>
                      <Text>{item.city}</Text>
                      <Text>{item.Province}</Text>
                      <Text>{item.postal_code}</Text>
                      <Text>{item.detail}</Text>
                    </Box>
                  </Stack>
                </>
              );
            })}
          </FormControl>

          <FormControl>
            <FormLabel
              mt={"10px"}
              ml={"10px"}
              textColor="#285430"
            >
              Order Note
            </FormLabel>
            <Textarea></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel
              mt={"10px"}
              ml={"10px"}
              textColor="#285430"
            >
              Pembayaran
            </FormLabel>
            <Box variant={"unstyled"}>
              <Text
                mt={"10px"}
                ml={"10px"}
                textColor="#285430"
              >
                Bank Transfer via Bank Bca
              </Text>
              <Text
                mt={"10px"}
                ml={"10px"}
                textColor="#285430"
              >
                09812618671
              </Text>
            </Box>
          </FormControl>
        </Stack>
        <Center>
          <Button
            onClick={() => onCreate()}
            mt={"20px"}
            mb={100}
            w={"370px"}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="16px"
            color="gray.800"
            justifyContent="center"
          >
            Checkout
          </Button>
        </Center>
      </Box>
    </>
  );
};
