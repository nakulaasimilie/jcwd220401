// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Axios from "axios";
// import { BsFilterLeft } from "react-icons/bs";
// import { BiReset, BiSearchAlt } from "react-icons/bi";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   Accordion,
//   AccordionItem,
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   ButtonGroup,
//   Collapse,
//   Grid,
//   GridItem,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
//   useColorMode,
//   useDisclosure,
//   Table,
//   TableContainer,
//   Thead,
//   Tr,
//   Th,
//   Tbody,
//   Td,
//   Image,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   ModalOverlay,
//   Center,
//   Flex,
//   useColorModeValue,
//   Icon,
//   FormControl,
//   FormLabel,
//   Select,
//   InputGroup,
//   Input,
//   InputRightElement,
//   FormHelperText,
// } from "@chakra-ui/react";
// import { UpdateProductComp } from "../../components/admin/UpdateProductComp";
// import { UpdateCategoryComp } from "../../components/admin/UpdateCategoryComp";
// import { AddProduct } from "../../components/admin/AddProduct";
// import { AddCategory } from "../../components/admin/AddCategory";
// import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { LogoutBranch } from "../../components/LogoutBranch";
// import { AddPicWeb } from "../../components/admin/AddPicWeb";
// import { syncData } from "../../redux/productSlice";
// import { syncCategory } from "../../redux/categorySlice";

// export const BranchComp = () => {
//   const [product, setProduct] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [image, setImage] = useState("");
//   const [profile, setProfile] = useState("upload");
//   const [edit, setEdit] = useState({});
//   const [edit2, setEdit2] = useState({});
//   const [image2, setImage2] = useState("");
//   const [profile2, setProfile2] = useState("upload");
//   const [show, setShow] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5);
//   const [sort, setSort] = useState("ASC");
//   const [order, setOrder] = useState("productName");
//   const [searchProduct, setSearchProduct] = useState("");
//   const [totalPage, setTotalPage] = useState(0);
//   const [state, setState] = useState(0);
//   const [page2, setPage2] = useState(1);
//   const [limit2, setLimit2] = useState(5);
//   const [sort2, setSort2] = useState("ASC");
//   const [order2, setOrder2] = useState("categoryName");
//   const [searchCategory2, setSearchCategory2] = useState("");
//   const [totalPage2, setTotalPage2] = useState(0);
//   const [state2, setState2] = useState(0);
//   const { username, BranchId } = useSelector(state => state.adminSlice.value);
//   const data = useSelector(state => state.productSlice.value);
//   const data2 = useSelector(state => state.categorySlice.value);
//   const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
//   const dispatch = useDispatch();
//   const handleToggle = () => setShow(!show);
//   const handleToggle1 = () => setShow2(!show2);
//   const OverlayOne = () => (
//     <ModalOverlay
//       bg="blackAlpha.300"
//       backdropFilter="blur(10px) hue-rotate(90deg)"
//     />
//   );
//   const [overlay, setOverlay] = useState(<OverlayOne />);

//   const getData = async () => {
//     try {
//       const res = await Axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/product/list`,
//       );
//       console.log(res.data);
//       setProduct(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [edit]);

//   const onDelete = async id => {
//     try {
//       const res = await Axios.delete(
//         `${process.env.REACT_APP_API_BASE_URL}/product/remove/${id}`,
//       );
//       console.log(res);
//       getData();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChoose = e => {
//     console.log("e.target.files", e.target.files);
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async id => {
//     const data = new FormData();
//     console.log(data);
//     data.append("file", image);
//     console.log(data.get("file"));

//     const resultImage = await Axios.post(
//       `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded/${id}`,
//       data,
//       {
//         headers: {
//           "Content-type": "multipart/form-data",
//         },
//       },
//     );
//     console.log(resultImage.data);
//     setProfile(resultImage.data.picture);
//     setImage({ images: "" });
//     console.log(image);
//     console.log(profile);
//     window.location.replace("/admin");
//   };

//   const getCategory = async () => {
//     try {
//       const res = await Axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`,
//       );
//       console.log(res.data);
//       setCategory(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCategory();
//   }, [edit2]);

//   const onDeleteCategory = async id => {
//     try {
//       const res = await Axios.delete(
//         `${process.env.REACT_APP_API_BASE_URL}/product/removeCategory/${id}`,
//       );
//       console.log(res);
//       getCategory();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleChoose1 = e => {
//     console.log("e.target.files", e.target.files);
//     setImage2(e.target.files[0]);
//   };

//   const handleUpload1 = async id => {
//     const data = new FormData();
//     console.log(data);
//     data.append("file", image2);
//     console.log(data.get("file"));

//     const resultImage = await Axios.post(
//       `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded-category/${id}`,
//       data,
//       {
//         headers: {
//           "Content-type": "multipart/form-data",
//         },
//       },
//     );
//     console.log(resultImage.data);
//     setProfile2(resultImage.data.categoryPicture);
//     setImage2({ images: "" });
//     console.log(image2);
//     console.log(profile2);
//     window.location.replace("/admin");
//   };

//   const getProduct = async () => {
//     try {
//       const res = await Axios.get(
//         `${
//           process.env.REACT_APP_API_BASE_URL
//         }/product/pagProduct?search_query=${searchProduct}&page=${
//           page - 1
//         }&limit=${limit}&order=${order ? order : `productName`}&sort=${
//           sort ? sort : "ASC"
//         }`,
//       );
//       dispatch(syncData(res.data.result));
//       console.log(res.data.result);
//       setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
//       setState(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, [searchProduct, page, limit, sort]);

//   async function fetchSort(filter) {
//     setSort(filter);
//   }

//   useEffect(() => {
//     fetchSort();
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       searchName: ``,
//     },
//     validationSchema: Yup.object().shape({
//       searchName: Yup.string().min(3, "Minimal 3 huruf"),
//     }),
//     validationOnChange: false,
//     onSubmit: async () => {
//       const { searchName } = formik.values;
//       setSearchProduct(searchName);
//     },
//   });

//   const getCategory2 = async () => {
//     try {
//       const res = await Axios.get(
//         `${
//           process.env.REACT_APP_API_BASE_URL
//         }/product/pagCategory?search_query=${searchCategory2}&page=${
//           page2 - 1
//         }&limit=${limit2}&order=${order2 ? order2 : `categoryName`}&sort=${
//           sort2 ? sort2 : "ASC"
//         }`,
//       );
//       dispatch(syncCategory(res.data.result));
//       console.log(res.data.result);
//       setTotalPage2(Math.ceil(res.data.totalRows / res.data.limit));
//       setState2(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCategory2();
//   }, [searchCategory2, page2, limit2, sort2]);

//   async function fetchSort2(filter) {
//     setSort2(filter);
//   }

//   useEffect(() => {
//     fetchSort2();
//   }, []);

//   const formik2 = useFormik({
//     initialValues: {
//       searchName: ``,
//     },
//     validationSchema: Yup.object().shape({
//       searchName: Yup.string().min(3, "Minimal 3 huruf"),
//     }),
//     validationOnChange: false,
//     onSubmit: async () => {
//       const { searchName } = formik.values;
//       setSearchCategory2(searchName);
//     },
//   });

//   return (
//     <>
//       <Box
//         className="header"
//         w={"390px"}
//         h={"80px"}
//         bgColor="#E5D9B6"
//         display={"flex"}
//         justifyContent="space-between"
//         pt={"10px"}
//         pl={"1px"}
//         pos="fixed"
//         top={"0"}
//         zIndex={"2"}
//       >
//         <Box
//           margin={"auto"}
//           alignItems={"center"}
//           textColor="#285430"
//         >
//           <Text
//             as={"b"}
//             fontSize="xl"
//           >
//             Product Management
//           </Text>
//         </Box>
//       </Box>
//       <Box
//         mt={"70px"}
//         className="body"
//         bgColor="white"
//         color="gray.800"
//         h={"1580px"}
//         w={"390px"}
//         // pos="fixed"
//       >
//         <Grid
//           h="100px"
//           templateRows="repeat(2, 1fr)"
//           templateColumns="repeat(5, 1fr)"
//           gap={"10px"}
//         >
//           <GridItem
//             m={"auto"}
//             rowSpan={2}
//             colSpan={1}
//           >
//             <Avatar
//               bgColor={"gray.500"}
//               display={"flex"}
//               size={"lg"}
//               ml="8"
//               mt="3"
//               mb="3"
//               name={username}
//             ></Avatar>
//           </GridItem>
//           <GridItem colSpan={1}>
//             <Badge
//               mt="8"
//               textColor={"#285430"}
//               fontSize="md"
//               ml={"10px"}
//               as="b"
//             >
//               {username}
//             </Badge>
//           </GridItem>
//         </Grid>
//         <Accordion
//           mb={"30px"}
//           allowToggle
//         >
//           <AccordionItem>
//             <AddPicWeb />
//           </AccordionItem>
//           <AccordionItem>
//             <AddProduct />
//           </AccordionItem>
//           <AccordionItem>
//             <AddCategory />
//           </AccordionItem>
//         </Accordion>

//         <Tabs
//           isFitted
//           variant="enclosed"
//         >
//           <TabList mb="1em">
//             <Tab
//               color="#285430"
//               as="button"
//             >
//               Product List
//             </Tab>
//             <Tab
//               color="#285430"
//               as="button"
//             >
//               Category List
//             </Tab>
//           </TabList>

//           <TabPanels>
//             <TabPanel>
//               <Center>
//                 <Flex
//                   ml="3"
//                   mr="3"
//                   flexWrap={"wrap"}
//                   color={useColorModeValue("#285430")}
//                   border="2px"
//                   borderRadius="xl"
//                 >
//                   <Box className="filter">
//                     <Box
//                       m="10px"
//                       mb="20px"
//                       borderWidth="2px"
//                       boxShadow="md"
//                       borderRadius="8px"
//                       borderColor="#285430"
//                     >
//                       <Box
//                         alignItems={"center"}
//                         h="50px"
//                         borderTopRadius="8px"
//                         align="center"
//                         bg="#E5D9B6"
//                         display="flex"
//                       >
//                         <Box
//                           h="25px"
//                           ml="10px"
//                         >
//                           <Icon
//                             color="#285430"
//                             boxSize="6"
//                             as={BsFilterLeft}
//                           />
//                         </Box>
//                         <Box h="25px">
//                           <Text
//                             mx="10px"
//                             fontWeight="bold"
//                             color="#285430"
//                           >
//                             Filter & Search
//                           </Text>
//                         </Box>
//                         <Icon
//                           color="#285430"
//                           sx={{ _hover: { cursor: "pointer" } }}
//                           boxSize="6"
//                           as={BiReset}
//                           onClick={() => {
//                             async function submit() {
//                               setSearchProduct("");
//                               document.getElementById("search").value = "";
//                               formik.values.searchName = "";
//                             }
//                             submit();
//                           }}
//                         />
//                       </Box>
//                       <Flex
//                         m={2}
//                         wrap="wrap"
//                       >
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Format Sort
//                           </FormLabel>
//                           <Select
//                             color={"#285430"}
//                             borderColor="#285430"
//                             onChange={event => {
//                               fetchSort(event.target.value);
//                             }}
//                           >
//                             <option value="ASC">A-Z</option>
//                             <option value="DESC">Z-A</option>
//                           </Select>
//                         </FormControl>
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Show
//                           </FormLabel>
//                           <Select
//                             color={"#285430"}
//                             borderColor="#285430"
//                             onChange={event => {
//                               setLimit(event.target.value);
//                             }}
//                           >
//                             <option value="10">10</option>
//                             <option value="20">20</option>
//                             <option value="30">30</option>
//                             <option value="50">50</option>
//                           </Select>
//                         </FormControl>
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Search Product & Category
//                           </FormLabel>
//                           <InputGroup>
//                             <Input
//                               placeholder="Search Product"
//                               _placeholder={{ color: "#5F8D4E" }}
//                               borderColor="#285430"
//                               border="1px"
//                               fontSize="18px"
//                               color="gray.800"
//                               id="search"
//                               type="text"
//                               onChange={event =>
//                                 formik.setFieldValue(
//                                   "searchName",
//                                   event.target.value,
//                                 )
//                               }
//                               onKeyDown={event => {
//                                 if (event.key === "Enter") {
//                                   formik.handleSubmit();
//                                 }
//                               }}
//                             />
//                             <InputRightElement>
//                               <Icon
//                                 fontSize="xl"
//                                 as={BiSearchAlt}
//                                 sx={{ _hover: { cursor: "pointer" } }}
//                                 onClick={() => formik.handleSubmit()}
//                               />
//                             </InputRightElement>
//                           </InputGroup>
//                           <FormHelperText color="red">
//                             {formik.errors.searchName}
//                           </FormHelperText>
//                         </FormControl>
//                       </Flex>
//                     </Box>
//                   </Box>
//                 </Flex>
//               </Center>
//               <TableContainer>
//                 <Table
//                   variant="simple"
//                   colorScheme="teal"
//                 >
//                   <Thead alignContent={"center"}>
//                     <Tr>
//                       <Th color={"#285430"}>Product</Th>
//                       <Th color={"#285430"}>Actions</Th>
//                       <Th color={"#285430"}>Picture</Th>
//                       <Th color={"#285430"}>Distributor</Th>
//                       <Th color={"#285430"}>Description</Th>
//                     </Tr>
//                   </Thead>
//                   <Tbody>
//                     {data?.map(item => {
//                       return (
//                         <Tr>
//                           <Td color={"#285430"}>{item.productName}</Td>
//                           <Td color={"#285430"}>
//                             <Box
//                               mr="28px"
//                               display={"flex"}
//                               justifyContent="space-evenly"
//                             >
//                               <Button
//                                 onClick={() => {
//                                   setEdit(item);
//                                   // console.log("test2")
//                                 }}
//                               >
//                                 <EditIcon color={"#285430"} />
//                               </Button>
//                               <Button onClick={() => onDelete(item.id)}>
//                                 <DeleteIcon color={"#285430"} />
//                               </Button>
//                             </Box>
//                           </Td>

//                           <Td>
//                             <Image
//                               boxSize={"50px"}
//                               src={
//                                 `${process.env.REACT_APP_API_BASE_URL}/` +
//                                 item.picture
//                               }
//                             />
//                             <ButtonGroup size="sm">
//                               <form encType="multipart/form-data">
//                                 <input
//                                   color="#285430"
//                                   type={"file"}
//                                   accept="image/*"
//                                   name="file"
//                                   size={"100px"}
//                                   onChange={e => handleChoose(e)}
//                                 ></input>
//                               </form>
//                               <Button
//                                 bgColor={"#A4BE7B"}
//                                 borderColor="#285430"
//                                 border="2px"
//                                 fontSize="14px"
//                                 color="gray.800"
//                                 width={"100%"}
//                                 justifyContent="center"
//                                 onClick={handleUpload}
//                                 size="sm"
//                               >
//                                 Upload
//                               </Button>
//                             </ButtonGroup>
//                           </Td>
//                           <Td color={"#285430"}>{item.description}</Td>
//                           <Td>{item.distributor}</Td>
//                         </Tr>
//                       );
//                     })}
//                   </Tbody>
//                 </Table>
//               </TableContainer>
//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignContent="center"
//               >
//                 <Button
//                   onClick={() => {
//                     async function submit() {
//                       setPage(page === 1 ? 1 : page - 1);
//                     }
//                     submit();
//                     var pageNow = page - 1;
//                     pageNow = pageNow <= 0 ? 1 : pageNow;
//                     document.getElementById("pagingInput").value =
//                       parseInt(pageNow);
//                   }}
//                   bgColor={"#A4BE7B"}
//                   borderColor="#285430"
//                   border="2px"
//                   fontSize="14px"
//                   color="gray.800"
//                   width={"60px"}
//                   justifyContent="center"
//                   size="sm"
//                   mt="1rem"
//                 >
//                   Prev
//                 </Button>
//                 <Text
//                   alignSelf="center"
//                   mx="10px"
//                   pt="15px"
//                 >
//                   {" "}
//                   {page} of {totalPage}
//                 </Text>
//                 <Button
//                   onClick={() => {
//                     async function submit() {
//                       setPage(totalPage === page ? page : page + 1);
//                     }
//                     submit();
//                     var pageNow = page + 1;
//                     pageNow = pageNow > totalPage ? page : pageNow;
//                     document.getElementById("pagingInput").value =
//                       parseInt(pageNow);
//                   }}
//                   bgColor={"#A4BE7B"}
//                   borderColor="#285430"
//                   border="2px"
//                   fontSize="14px"
//                   color="gray.800"
//                   width={"60px"}
//                   justifyContent="center"
//                   size="sm"
//                   mt="1rem"
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </TabPanel>
//             <TabPanel>
//               <Center>
//                 <Flex
//                   ml="3"
//                   mr="3"
//                   flexWrap={"wrap"}
//                   color={useColorModeValue("#285430")}
//                   border="2px"
//                   borderRadius="xl"
//                 >
//                   <Box className="filter">
//                     <Box
//                       m="10px"
//                       mb="20px"
//                       borderWidth="2px"
//                       boxShadow="md"
//                       borderRadius="8px"
//                       borderColor="#285430"
//                     >
//                       <Box
//                         alignItems={"center"}
//                         h="50px"
//                         borderTopRadius="8px"
//                         align="center"
//                         bg="#E5D9B6"
//                         display="flex"
//                       >
//                         <Box
//                           h="25px"
//                           ml="10px"
//                         >
//                           <Icon
//                             color="#285430"
//                             boxSize="6"
//                             as={BsFilterLeft}
//                           />
//                         </Box>
//                         <Box h="25px">
//                           <Text
//                             mx="10px"
//                             fontWeight="bold"
//                             color="#285430"
//                           >
//                             Filter & Search
//                           </Text>
//                         </Box>
//                         <Icon
//                           color="#285430"
//                           sx={{ _hover: { cursor: "pointer" } }}
//                           boxSize="6"
//                           as={BiReset}
//                           onClick={() => {
//                             async function submit() {
//                               setSearchCategory2("");
//                               document.getElementById("search").value = "";
//                               formik2.values.searchName = "";
//                             }
//                             submit();
//                           }}
//                         />
//                       </Box>
//                       <Flex
//                         m={2}
//                         wrap="wrap"
//                       >
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Format Sort
//                           </FormLabel>
//                           <Select
//                             color={"#285430"}
//                             borderColor="#285430"
//                             onChange={event => {
//                               fetchSort2(event.target.value);
//                             }}
//                           >
//                             <option value="ASC">A-Z</option>
//                             <option value="DESC">Z-A</option>
//                           </Select>
//                         </FormControl>
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Show
//                           </FormLabel>
//                           <Select
//                             color={"#285430"}
//                             borderColor="#285430"
//                             onChange={event => {
//                               setLimit2(event.target.value);
//                             }}
//                           >
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="15">15</option>
//                             <option value="20">20</option>
//                           </Select>
//                         </FormControl>
//                         <FormControl
//                           w=""
//                           m={1}
//                         >
//                           <FormLabel
//                             fontSize="x-small"
//                             color="#285430"
//                           >
//                             Search Product & Category
//                           </FormLabel>
//                           <InputGroup>
//                             <Input
//                               placeholder="Search Category"
//                               _placeholder={{ color: "#5F8D4E" }}
//                               borderColor="#285430"
//                               border="1px"
//                               fontSize="18px"
//                               color="gray.800"
//                               id="search"
//                               type="text"
//                               onChange={event =>
//                                 formik.setFieldValue(
//                                   "searchName",
//                                   event.target.value,
//                                 )
//                               }
//                               onKeyDown={event => {
//                                 if (event.key === "Enter") {
//                                   formik2.handleSubmit();
//                                 }
//                               }}
//                             />
//                             <InputRightElement>
//                               <Icon
//                                 fontSize="xl"
//                                 as={BiSearchAlt}
//                                 sx={{ _hover: { cursor: "pointer" } }}
//                                 onClick={() => formik2.handleSubmit()}
//                               />
//                             </InputRightElement>
//                           </InputGroup>
//                           <FormHelperText color="red">
//                             {formik2.errors.searchName}
//                           </FormHelperText>
//                         </FormControl>
//                       </Flex>
//                     </Box>
//                   </Box>
//                 </Flex>
//               </Center>
//               <TableContainer>
//                 <Table
//                   variant="simple"
//                   colorScheme="teal"
//                 >
//                   <Thead>
//                     <Tr>
//                       <Th color={"#285430"}>Category</Th>
//                       <Th color={"#285430"}>Actions</Th>
//                       <Th color={"#285430"}>Picture</Th>
//                     </Tr>
//                   </Thead>
//                   <Tbody>
//                     {data2?.map(item => {
//                       return (
//                         <Tr>
//                           <Td
//                             color={"#285430"}
//                             textColor="black"
//                           >
//                             {item.categoryName}
//                           </Td>
//                           <Td>
//                             <Button
//                               onClick={() => {
//                                 setEdit2(item);
//                                 setOverlay(<OverlayOne />);
//                                 onOpen();
//                               }}
//                             >
//                               <EditIcon color={"#285430"} />
//                             </Button>
//                             <Button onClick={() => onDeleteCategory(item.id)}>
//                               <DeleteIcon color={"#285430"} />
//                             </Button>
//                           </Td>
//                           <Td>
//                             <Image
//                               boxSize={"50px"}
//                               src={
//                                 `${process.env.REACT_APP_API_BASE_URL}/` +
//                                 item.categoryPicture
//                               }
//                             />
//                             <ButtonGroup size="sm">
//                               <form encType="multipart/form-data">
//                                 <input
//                                   type={"file"}
//                                   accept="image/*"
//                                   name="file"
//                                   size={"100px"}
//                                   onChange={e => handleChoose1(e)}
//                                 ></input>
//                               </form>
//                             </ButtonGroup>
//                             <Button
//                               bgColor={"#A4BE7B"}
//                               borderColor="#285430"
//                               border="2px"
//                               fontSize="14px"
//                               color="gray.800"
//                               width={"100%"}
//                               justifyContent="center"
//                               onClick={handleUpload1}
//                               size="sm"
//                             >
//                               Upload
//                             </Button>
//                           </Td>
//                         </Tr>
//                       );
//                     })}
//                   </Tbody>
//                 </Table>
//               </TableContainer>

//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignContent="center"
//               >
//                 <Button
//                   onClick={() => {
//                     async function submit() {
//                       setPage2(page2 === 1 ? 1 : page2 - 1);
//                     }
//                     submit();
//                     var pageNow = page2 - 1;
//                     pageNow = pageNow <= 0 ? 1 : pageNow;
//                     document.getElementById("pagingInput").value =
//                       parseInt(pageNow);
//                   }}
//                   bgColor={"#A4BE7B"}
//                   borderColor="#285430"
//                   border="2px"
//                   fontSize="14px"
//                   color="gray.800"
//                   width={"60px"}
//                   justifyContent="center"
//                   size="sm"
//                   mt="1rem"
//                 >
//                   Prev
//                 </Button>
//                 <Text
//                   alignSelf="center"
//                   mx="10px"
//                   pt="15px"
//                 >
//                   {" "}
//                   {page2} of {totalPage2}
//                 </Text>
//                 <Button
//                   onClick={() => {
//                     async function submit() {
//                       setPage2(totalPage2 === page2 ? page2 : page2 + 1);
//                     }
//                     submit();
//                     var pageNow = page2 + 1;
//                     pageNow = pageNow > totalPage2 ? page2 : pageNow;
//                     document.getElementById("pagingInput").value =
//                       parseInt(pageNow);
//                   }}
//                   bgColor={"#A4BE7B"}
//                   borderColor="#285430"
//                   border="2px"
//                   fontSize="14px"
//                   color="gray.800"
//                   width={"60px"}
//                   justifyContent="center"
//                   size="sm"
//                   mt="1rem"
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//         <Tabs
//           isFitted
//           variant="enclosed"
//         >
//           <TabList mb="1em">
//             <Tab
//               color="#285430"
//               as="button"
//             >
//               Edit Product
//             </Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <UpdateProductComp data={edit} />
//             </TabPanel>
//           </TabPanels>
//           <Modal
//             isCentered
//             isOpen={isOpen}
//             onClose={onClose}
//           >
//             {overlay}
//             <ModalContent>
//               <ModalHeader>Modal Title</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody>
//                 <UpdateCategoryComp data={edit2} />
//               </ModalBody>
//               <ModalFooter>
//                 <Button onClick={onClose}>Close</Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </Tabs>
//         <LogoutBranch />
//       </Box>
//     </>
//   );
// };
