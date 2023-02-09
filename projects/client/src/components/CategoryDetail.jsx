import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { syncCategory } from "../redux/categorySlice";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const CategoryDetail = id => {
  const data = useSelector(state => state.categorySlice.value);
  const params = useParams();
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/listCategory/${params.id}`,
      );
      console.log(result.data);

      dispatch(syncCategory(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

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
                          item?.Product?.images
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
                            to={`/detail/${item?.Product?.id}`}
                          >
                            <Text
                              _hover={{ cursor: "pointer", color: "red" }}
                              fontWeight="bold"
                              fontSize="15px"
                            >
                              {item?.Product?.name.substring(0, 25)}
                              {item.Product?.name.length >= 25 ? "..." : null}
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
                              {item?.Product?.statement.substring(0, 50)}
                              {item?.Product?.statement.length >= 50
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
                              {item?.Product?.size.substring(0, 50)}
                              {item?.Product?.size.length >= 50 ? "..." : null}
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
                              Rp{item?.Product?.price}
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
                        // onClick={() => onAddCart(item.Product.id)}
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
};
