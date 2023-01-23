import {
  Image,
  Button,
  Box,
  Text,
  Icon,
  Flex,
  Center,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  FormControl,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useEffect } from "react";
import { syncData } from "../redux/productSlice";
import { useState } from "react";

export const ProductCRUD = () => {
  const [edit, setEdit] = useState({});
  const data = useSelector((state) => state.productSlice.value);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/product/list`);
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `http://localhost:8000/product/remove/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack mt="20px" mb="20px" ml="20px" mr="20px">
        <Box m="20px">
          <Heading align="center">Product</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Gambar</Th>
                  <Th>Nama</Th>
                  <Th>Harga</Th>
                  <Th>Category</Th>
                  {/* <Th>Stock</Th> */}
                  <Th>Keterangan</Th>
                  <Th>Detail</Th>
                  <Th>Ukuran</Th>
                </Tr>
              </Thead>
              {data.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>
                        <Image w="20px" h="20px" src={item.images}></Image>
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.statement}</Td>
                      <Td>{item.detail}</Td>
                      <Td>{item.size}</Td>

                      {/* <Td>{item.Stock}</Td> */}
                      <Td>
                        <Flex>
                          <Button
                            colorScheme="teal"
                            onClick={() => onDelete(item.id)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            colorScheme="teal"
                            display="flex"
                            onClick={() => setEdit(item)}
                          >
                            <EditIcon onClick={"#href"} />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })}
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </div>
  );
};
