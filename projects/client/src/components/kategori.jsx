import {
  Box,
  IconButton,
  Stack,
  Wrap,
  WrapItem,
  useColorModeValue,
  Text,
  Image,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";
import { syncCategory } from "../redux/categorySlice";
import { Link } from "react-router-dom";

export default function Kategori() {
  // const [category, setCategory] = useState();
  const data = useSelector(state => state.categorySlice.value);
  // const data = useSelector(state => state.inventorySlice.value);
  const dispatch = useDispatch();

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/listCategory`,
      );
      dispatch(syncCategory(res.data));
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Center
        mt="10px"
        mb="10px"
      >
        <Flex
          flexWrap="wrap"
          // w={[330, 330, 400]}
          justifyContent="center"
        >
          {data?.map(item => {
            return (
              <div>
                <Box
                  as={Link}
                  to={`/category/${item.id}`}
                >
                  <Image
                    src={`${process.env.REACT_APP_API_BASE}/` + item.image}
                    w="50px"
                    h="50px"
                    cursor={"pointer"}
                    bg={"#ebf5e9"}
                    _hover={{ bg: "yellow.400", color: "white" }}
                    rounded="full"
                    mr={[5, 5, 5]}
                    ml={[5, 5, 5]}
                    mt="20px"
                    name="Grocery"
                  />
                  <Text
                    fontSize="small"
                    color={"#285430"}
                    align={"center"}
                    justifyContent={"center"}
                  >
                    {item.categoryName}
                  </Text>
                </Box>
              </div>
            );
          })}
        </Flex>
      </Center>
      {/* {tokenLocalStorage ? <InventoryList /> : <ProductList />} */}
    </>
  );
}
