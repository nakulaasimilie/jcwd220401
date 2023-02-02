import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Center,
  useColorModeValue,
  ButtonGroup,
  Image,
  ModalOverlay,
  Stack,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { syncData } from "../redux/productSlice";
import Swal from "sweetalert2";
import { useRef } from "react";
import { UpdateCategoryComp } from "./updateKategori";
import { UpdateProductComp } from "./updateProduk";
import CreateComp from "./addProduk";
import { syncCategory } from "../redux/categorySlice";

export const Add = () => {
  const [image2, setImage2] = useState("");
  const [profile2, setProfile2] = useState("images");
  const categoryName = useRef("");
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});
  const [category, setCategory] = useState([]);
  const data2 = useSelector(state => state.categorySlice.value);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("name");
  const [order_direction, setOrder_direction] = useState("ASC");
  const data = useSelector(state => state.productSlice.value);
  const url = `http://localhost:8000/product/view?search_query=${searchProduct}&page=${
    page - 1
  }&limit=${limit}&order=${order ? order : `id`}&order_direction=${
    order_direction ? order_direction : "ASC"
  }`;
  const getData = async () => {
    try {
      const res = await Axios.get(url);

      dispatch(syncData(res.data.result));
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchProduct(filter) {
    setOrder_direction(filter);
  }
  async function fetchCategory(filter) {
    setOrder(filter);
  }
  async function fetchLimit(filter) {
    setLimit(filter);
  }
  useEffect(() => {
    getData();
  }, [searchProduct, limit, totalPage, order, order_direction, page, edit2]);

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchLimit();
  }, []);

  const onDelete = async id => {
    try {
      const res = await Axios.delete(
        `http://localhost:8000/product/remove/${id}`,
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const onCreateCategory = async () => {
    try {
      const addProduct = {
        categoryName: categoryName.current.value,
      };
      const res = await Axios.post(
        `http://localhost:8000/product/createCategory`,
        addProduct,
      );
      Swal.fire({
        icon: "success",
        text: "Category Added",
        width: "370px",
      });

      setTimeout(() => {
        window.location.replace("/dashboard/crud");
      }, 900);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/product/listCategory`);
      setCategory(res.data);
      dispatch(syncCategory(res.data));
      console.log(res.data.result);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  const onDeleteCategory = async id => {
    try {
      const res = await Axios.delete(
        `http://localhost:8000/product/removeCategory/${id}`,
      );
      console.log(res);
      getCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose1 = e => {
    console.log("e.target.files", e.target.files);
    setImage2(e.target.files[0]);
  };

  const handleUpload1 = async id => {
    const data = new FormData();
    console.log(data);
    data.append("file", image2);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `http://localhost:8000/product/single-uploaded-category/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    );
    console.log(resultImage.data);
    setProfile2(resultImage.data.image);
    setImage2({ image: "" });
    console.log(image2);
    console.log(profile2);
    window.location.replace("/dashboard");
  };

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
          maxW={"700px"}
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
              Branch Admin Management
            </Text>
          </Center>

          <Tabs
            isFitted
            variant="enclosed"
          >
            <TabList mb="1em">
              <Tab>Tambah Kategori</Tab>
              <Tab>Tambah Produk</Tab>
              <Tab>List Produk</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <>
                  <FormControl>
                    <FormLabel color="#285430">Nama Category</FormLabel>
                    <Input
                      ref={categoryName}
                      placeholder="Category"
                      _placeholder={{ color: "#5F8D4E" }}
                    ></Input>
                  </FormControl>
                  <TableContainer>
                    <Table
                      variant="simple"
                      colorScheme="teal"
                    >
                      <Thead>
                        <Tr>
                          <Th color={"#285430"}>Category</Th>
                          <Th color={"#285430"}>Actions</Th>
                          <Th color={"#285430"}>Picture</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data2?.map(item => {
                          return (
                            <Tr>
                              <Td
                                color={"#285430"}
                                textColor="black"
                              >
                                {item.categoryName}
                              </Td>
                              <Td>
                                <Button
                                  onClick={() => {
                                    setEdit2(item);
                                    setOverlay(<OverlayOne />);
                                    onOpen();
                                  }}
                                >
                                  <EditIcon color={"#285430"} />
                                </Button>
                                <Button
                                  onClick={() => onDeleteCategory(item.id)}
                                >
                                  <DeleteIcon color={"#285430"} />
                                </Button>
                              </Td>
                              <Td>
                                <Image
                                  boxSize={"50px"}
                                  src={`http://localhost:8000/` + item.image}
                                />
                                <ButtonGroup size="sm">
                                  <form encType="multipart/form-data">
                                    <input
                                      type={"file"}
                                      accept="image/*"
                                      name="file"
                                      size={"100px"}
                                      onChange={e => handleChoose1(e)}
                                    ></input>
                                  </form>
                                </ButtonGroup>
                              </Td>
                              <Td>
                                <Button
                                  bgColor={"#A4BE7B"}
                                  borderColor="#285430"
                                  border="2px"
                                  fontSize="14px"
                                  color="gray.800"
                                  width={"100%"}
                                  justifyContent="center"
                                  onClick={() => handleUpload1(item.id)}
                                  size="sm"
                                >
                                  Upload
                                </Button>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Center>
                    <Button
                      bgColor={"#A4BE7B"}
                      borderColor="#285430"
                      border="2px"
                      fontSize="18px"
                      color="gray.800"
                      width={"100%"}
                      justifyContent="center"
                      onClick={onCreateCategory}
                    >
                      Add Category
                    </Button>
                  </Center>
                </>
              </TabPanel>
              <TabPanel>
                <CreateComp />
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table
                    variant="simple"
                    colorScheme="teal"
                  >
                    <Thead alignContent={"center"}>
                      <Tr>
                        <Th color={"#285430"}>Actions</Th>
                        <Th color={"#285430"}>Name</Th>
                        <Th color={"#285430"}>Price</Th>
                        <Th color={"#285430"}>Statement</Th>
                        <Th color={"#285430"}>Detail</Th>
                        <Th color={"#285430"}>Size</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.map(item => {
                        return (
                          <Tr>
                            <Td color={"#285430"}>
                              <Box
                                mr="28px"
                                display={"flex"}
                                justifyContent="space-evenly"
                              >
                                <Button
                                  onClick={() => {
                                    setEdit(item);
                                    // console.log("test2")
                                  }}
                                >
                                  <EditIcon color={"#285430"} />
                                </Button>
                                <Button onClick={() => onDelete(item.id)}>
                                  <DeleteIcon color={"#285430"} />
                                </Button>
                              </Box>
                            </Td>
                            <Td color={"#285430"}>{item.name}</Td>
                            <Td color={"#285430"}>{item.statement}</Td>
                            <Td color={"#285430"}>{item.detail}</Td>
                            <Td color={"#285430"}>{item.size}</Td>
                            <Td>
                              <Image
                                boxSize={"50px"}
                                src={`{http://localhost:8000/` + item.image}
                              />
                              <ButtonGroup size="sm">
                                <form encType="multipart/form-data">
                                  <input
                                    color="#285430"
                                    type={"file"}
                                    accept="image/*"
                                    name="file"
                                    size={"100px"}
                                    // onChange={e => handleChoose(e)}
                                  ></input>
                                </form>
                                <Button
                                  bgColor={"#A4BE7B"}
                                  borderColor="#285430"
                                  border="2px"
                                  fontSize="14px"
                                  color="gray.800"
                                  width={"100%"}
                                  justifyContent="center"
                                  // onClick={handleUpload}
                                  size="sm"
                                >
                                  Upload
                                </Button>
                              </ButtonGroup>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Button
                    onClick={() => {
                      async function submit() {
                        setPage(page === 1 ? 1 : page - 1);
                      }
                      submit();
                      var pageNow = page - 1;
                      pageNow = pageNow <= 0 ? 1 : pageNow;
                      document.getElementById("pagingInput").value =
                        parseInt(pageNow);
                    }}
                    size="sm"
                    m="3px"
                    borderColor="yellow.400"
                    borderRadius="9px"
                    bg="white"
                    borderWidth="2px"
                    bgColor="inherit"
                    _hover={{ bg: "yellow.400" }}
                  >
                    Sebelumnya
                  </Button>
                  <Text
                    alignSelf="center"
                    mx="5px"
                  >
                    {" "}
                    {page} of {totalPage}
                  </Text>
                  <Button
                    onClick={() => {
                      async function submit() {
                        setPage(totalPage === page ? page : page + 1);
                      }
                      submit();
                      var pageNow = page + 1;
                      pageNow = pageNow > totalPage ? page : pageNow;
                      document.getElementById("pagingInput").value =
                        parseInt(pageNow);
                    }}
                    size="sm"
                    m="3px"
                    borderColor="yellow.400"
                    borderRadius="9px"
                    bg="white"
                    borderWidth="2px"
                    bgColor="inherit"
                    _hover={{ bg: "yellow.400" }}
                  >
                    Selanjutnya
                  </Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* <Tabs
            isFitted
            variant="enclosed"
          > */}
          {/* <TabList mb="1em">
              <Tab
                color="#285430"
                as="button"
              >
                Edit Product
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UpdateProductComp data={edit} />
              </TabPanel>
            </TabPanels> */}

          <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
          >
            {overlay}
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UpdateCategoryComp data={edit2} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* </Tabs> */}
        </Box>
      </Box>
    </div>
  );
};
