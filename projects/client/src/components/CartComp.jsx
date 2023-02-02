import {
  Flex,
  Box,
  Text,
  Stack,
  Divider,
  Input,
  Button,
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
import { cartSync, cartQty } from "../redux/cartSlice";
import { deleteCart } from "../redux/userSlice";

export default function CartDetail() {
  const {
    name,
    cart,
    id: userId,
  } = useSelector(state => state.userSlice.value);
  console.log(cart);

  const { syncAddress } = useSelector(state => state.addressSlice.value);

  const dispatch = useDispatch();

  const data = useSelector(state => state.cartSlice.value);
  console.log(data);
  // const navigate = useNavigate();

  const onDeleteCart = async id => {
    try {
      await axios.delete(`http://localhost:8000/cart/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Barang telah dihapus",
        timer: 2000,
      });
      const result = await axios.get(`http://localhost:8000/cart/${userId}`);
      dispatch(deleteCart());
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (id, quantity) => {
    if (!quantity) return;
    try {
      await axios.patch(`http://localhost:8000/cart/${id}`, {
        quantity,
      });
      const result = await axios.get(`http://localhost:8000/cart/${userId}`);
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        algin={"center"}
        justify={"center"}
        bg="#fff"
        maxWidth={"506px"}
      >
        <Stack
          spacing={4}
          mx={"auto"}
          maxW={"lg"}
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
            {data.length === 0 ? (
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
                    {data?.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Stack>
                              <Image
                                boxSize="35px"
                                objectFit="cover"
                                src={item.Product.images}
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
          <br></br>
          <Text
            fontWeight="bold"
            mr="10px"
            align={"center"}
          >
            Total Harga:
          </Text>
          <br></br>
          <Text
            fontWeight="bold"
            mr="10px"
            align={"center"}
          >
            Pilih Alamat
          </Text>
          <br></br>
          <Box
            mt="10px"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              // onClick={() => onBorrow()}
              w="full"
              borderColor="yellow.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "yellow.300" }}
              disabled={data.length === 0 ? true : false}
            >
              Beli
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
