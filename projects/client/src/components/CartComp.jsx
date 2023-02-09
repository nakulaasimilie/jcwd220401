import {
  Flex,
  Box,
  Text,
  Stack,
  RadioGroup,
  Divider,
  Heading,
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
  Radio,
  Select,
  FormControl,
  Image,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { syncAddress } from "../redux/addressSlice";
import { cartSync, cartQty } from "../redux/cartSlice";
import { deleteCart } from "../redux/userSlice";
import Footer from "../components/footerComp";

export const CartComp = () => {
  const {
    name,
    // cart,
    // id: userId,
    id,
    phone_number,
  } = useSelector(state => state.userSlice.value);
  const userId = id;
  const { data } = useSelector(state => state.addressSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  console.log("address", data);

  const data4 = useSelector(state => state.cartSlice.value);

  const [desId, setDesId] = useState();
  const [value, setValue] = useState("");
  const [ongkir, setOngkir] = useState();
  const [total, setTotal] = useState();
  const [getOngkir, setGetOngkir] = useState();
  const [data3, setData3] = useState([]);
  const [data2, setData2] = useState([]);
  const [addressAll, setAddressAll] = useState();
  const [qty, setQty] = useState();
  const [move, setMove] = useState(false);
  console.log("cart", data2);
  console.log(value);

  //useRef

  const getQuantity = async () => {
    try {
      const kart = await axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${userId}`,
      );
      setData3(kart.data);
      setQty(kart.data.reduce((a, b) => a.quantity + b.quantity));
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    try {
      const cart = await axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${userId}`,
      );
      setData2(cart.data);
      setTotal(
        cart.data.reduce(
          (a, b) => a.quantity * a.Product.price + b.quantity * b.Product.price,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log("quantity", qty);

  useEffect(() => {
    getQuantity();
  }, [id]);

  useEffect(() => {
    getData();
  }, [id]);

  const onDeleteCart = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/cart/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Barang telah dihapus",
        timer: 2000,
      });
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${userId}`,
      );
      dispatch(deleteCart());
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (id, quantity) => {
    if (!quantity) return;
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE}/cart/${id}`, {
        quantity,
      });
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${userId}`,
      );
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const totalOrder = total + getOngkir;

  console.log("Total Harga", totalOrder);

  const orderCart = async () => {
    try {
      //value starter jne, pos, tiki
      const courier = value;
      const weight = 1000;
      const destination = desId;
      const origin = 22;
      const order = { origin, destination, weight, courier };
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE}/orderCart/cost`,
        order,
      );
      setOngkir(result.data.rajaongkir.results[0].costs);
      console.log("Paket Ongkir", result.data.rajaongkir.results[0].costs);
      console.log("ongkir", ongkir);
    } catch (err) {
      console.log(err);
    }
  };

  const ongkirMap = ongkir?.map(val => {
    return (
      <option value={val.cost[0].value}>
        {val.service +
          " Harga Ongkir :" +
          " " +
          val.cost?.map(i => {
            return i.value + ", " + "estimasi waktu" + " " + i.etd + " hari";
          })}
      </option>
    );
  });

  const handleOngkir = ({ target }) => {
    const { value } = target;
    const addres = data?.filter(item => item.cityId === desId);
    // const city1 = addres[0].city;
    // const addressLine = addres[0].addressFill;
    // const district1 = addres[0].district;
    // const province1 = addres[0].province;
    // const addressFull =
    //   addressLine + " " + district1 + " " + city1 + " " + province1;
    console.log(addressAll);

    // setAddressAll(addressFull);
    setGetOngkir(+value);
  };

  console.log("value ongkir", getOngkir);
  console.log("cart redux", data4);
  console.log("no telp", phone_number);

  const orderPayment = async () => {
    try {
      const addOrder = {
        total_price: totalOrder,
        quantity: qty,
        // addressReceiver: addressAll,
        courier: value,
        data4,
        UserId: id,
        phoneNumUser: phone_number,
      };
      const res2 = await axios.post(
        `${process.env.REACT_APP_API_BASE}/orderCart/createOrder`,
        addOrder,
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Silahkan Upload Pembayaran",
        timer: 4000,
      });
      setMove(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getAddress = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE}/address/addressById/${id}`,
      );
      console.log(id);
      console.log("cek setAddress", result.data);
      dispatch(syncAddress(result.data));
      console.log(syncAddress(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(desId);

  useEffect(() => {
    getAddress();
  }, [id]);

  return move ? (
    <Navigate
      to="/payment"
      replace={true}
    />
  ) : (
    <>
      <Flex
        minH={"120vh"}
        algin={"center"}
        justify={"center"}
        bg="#fff"
        maxWidth={"506px"}
        overflow={"scroll"}
        // marginBottom={"full"}
      >
        <Stack
          spacing={4}
          mx={"auto"}
          maxW={"lg"}
          h="1000px"
        >
          <Box
            bg={" #ebf5e9"}
            height="70px"
            marginTop={"25px"}
            paddingTop={"5px"}
          >
            <Text
              fontWeight={"bold"}
              fontSize="xl"
              align={"center"}
            >
              Keterangan Keranjang
            </Text>
            <Box
              display={"flex"}
              paddingTop={"3px"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>Name: {name}</Text>
            </Box>
          </Box>
          <Divider />

          <Box
            display="flex"
            justifyContent={"center"}
          >
            <Text fontWeight="bold">Item yang dibeli</Text>
          </Box>
          <Box>
            {data2.length === 0 ? (
              <>
                <Box align="center">
                  <Text>Keranjang Kosong</Text>
                  <Text
                    as={Link}
                    to="/"
                    textAlign="center"
                    fontWeight="bold"
                    color="blue.400"
                    w="150px"
                    _hover={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Beli sekarang
                  </Text>
                </Box>
              </>
            ) : (
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
                    {data2?.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Stack>
                              <Image
                                boxSize="35px"
                                objectFit="cover"
                                src={
                                  `${process.env.REACT_APP_API_BASE}/` +
                                  item.Product.images
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
                                {" "}
                                {item.Product.name}{" "}
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
                            <Box
                              display="flex"
                              fontSize="xs"
                            >
                              <Input
                                type={"number"}
                                defaultValue={item.quantity}
                                fontWeight="bold"
                                mr="5px"
                                onChange={event =>
                                  updateQty(item.id, event.target.value)
                                }
                              />
                            </Box>
                          </Td>
                          <Td>
                            <Button onClick={() => onDeleteCart(item.id)}>
                              <Icon
                                boxSize="4"
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
            )}
          </Box>
          <Text>Total Harga : {totalOrder}</Text>
          <br></br>
          <Heading
            fontWeight="bold"
            fontSize={"18pt"}
          >
            <Text align={"left"}>Pilih Alamat</Text>
          </Heading>
          <Stack
            align={"left"}
            overflowY={"scroll"}
            maxH={"506px"}
          >
            {data?.map(item => {
              return (
                <>
                  <Checkbox
                    value={item.cityId}
                    onChange={e => setDesId(e.target.value)}
                  >
                    <Stack
                      spacing={4}
                      mx={"auto"}
                      maxW={"lg"}
                      py={3}
                      px={3}
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
                  </Checkbox>
                </>
              );
            })}
          </Stack>
          <FormControl>
            <Heading
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              <Text align={"left"}>Pilih Kurir</Text>
            </Heading>
            <br></br>
            <RadioGroup
              onChange={setValue}
              value={value}
              onClick={() => orderCart()}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Radio value={"jne"}>jne</Radio>
              <Radio value={"tiki"}>tiki</Radio>
              <Radio value={"pos"}>pos indonesia</Radio>
            </RadioGroup>
          </FormControl>
          <Select onChange={handleOngkir}>{ongkirMap} </Select>
          <Box
            mt="10px"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              onClick={() => orderPayment()}
              w="full"
              borderColor="yellow.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "yellow.300" }}
              disabled={data2.length === 0 ? true : false}
            >
              Beli
            </Button>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
};
