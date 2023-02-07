import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
// import { cartSync } from "../../redux/cartSlice";
// import { addCart } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSync } from "../redux/cartSlice";
import { addCart } from "../redux/userSlice";

export default function InventoryList() {
  const [state, setState] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [state4, setState4] = useState();
  const [state5, setState5] = useState();
  const dispatch = useDispatch();
  const { id, email } = useSelector(state => state.userSlice.value);
  const data = useSelector(state => state.inventorySlice.value);

  const onAddCart = async ProductId => {
    try {
      if (!email) {
        return Swal.fire({
          icon: "error",
          title: "Akses Ditolak",
          text: "Silahkan Masukan Akun Anda",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }
      // if (cart >= 5) {
      //   return Swal.fire({
      //     icon: "error",
      //     title: "Oooops ...",
      //     text: "Keranjang Penuh",
      //     timer: 2000,
      //     customClass: {
      //       container: "my-swal",
      //     },
      //   });
      // }
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/cart/add`,
        {
          UserId: id,
          ProductId,
        },
      );
      setState(result.data);
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/cart/${id}`,
      );
      dispatch(cartSync(res.data));
      dispatch(addCart());

      Swal.fire({
        icon: "success",
        title: "Keranjang Berhasil Ditambahkan",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
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

  return (
    <div style={{ pt: "10px" }}>
      <Box>
        <Flex
          flexWrap={"wrap"}
          justifyContent="center"
        >
          {data?.map(item => {
            return (
              <>
                <Stack>
                  <Box
                    w="200px"
                    h="330px"
                    borderWidth="1px"
                    m="10px"
                    _hover={{ boxShadow: "xl" }}
                    boxShadow="base"
                    borderRadius="13px"
                  >
                    <Box
                      h="155px"
                      w="full"
                      _hover={{ cursor: "pointer" }}
                      borderTopRadius="13px"
                      overflow="hidden"
                    >
                      <Image
                        objectFit="cover"
                        src={
                          `${process.env.REACT_APP_API_BASE}/` +
                          item.Product.images
                        }
                        width="180px"
                        height="155px"
                        margin={"auto"}
                      />
                    </Box>
                    <Stack>
                      <Box
                        px="10px"
                        h="90px"
                      >
                        <Stack>
                          <Box
                            h="30px"
                            as={Link}
                            to={`/detail/${item.Product?.id}`}
                          >
                            <Text
                              _hover={{ cursor: "pointer", color: "red" }}
                              fontWeight="bold"
                              fontSize="15px"
                            >
                              {item.Product.name.substring(0, 25)}
                              {item.Product.name.length >= 25 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box
                            h="30px"
                            fontSize="10px"
                            marginTop={"5px"}
                          >
                            <Text mr="5px">
                              {" "}
                              {item.Product.statement.substring(0, 50)}
                              {item.Product.statement.length >= 50
                                ? "..."
                                : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box
                            fontSize="xs"
                            mt={"15px"}
                          >
                            <Text mr="5px">
                              {" "}
                              {item.Product.size.substring(0, 50)}
                              {item.Product.size.length >= 50 ? "..." : null}
                            </Text>
                          </Box>
                        </Stack>
                        <Stack>
                          <Box fontSize="xm">
                            <Text
                              fontWeight="bold"
                              color="#213360"
                              textColor="#FF6B6B"
                              mr="5px"
                            >
                              Rp{item.Product.price}
                            </Text>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                    <Box
                      px="10px"
                      h="40px"
                      pt="16px"
                    >
                      <Button
                        onClick={() => onAddCart(item.Product.id)}
                        w="full"
                        borderColor="yellow.400"
                        borderRadius="9px"
                        borderWidth="2px"
                        size="sm"
                        my="5px"
                        _hover={{ bg: "yellow.400", color: "white" }}
                        bg={"white"}
                        mt={"15px"}
                      >
                        <Icon
                          boxSize="4"
                          // as={IoCartOutline}
                          mr="5px"
                        />
                        Keranjang
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </>
            );
          })}
          {/* </SimpleGrid>
      </Box> */}
        </Flex>
      </Box>
    </div>
  );
}
