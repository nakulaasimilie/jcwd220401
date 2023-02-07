import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Center,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Select,
  Text,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { syncAddress } from "../redux/addressSlice";

export const ListAddressUser = () => {
  const { data } = useSelector(state => state.addressSlice.value);
  const { id } = useSelector(state => state.userSlice.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getAddress = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE}/address/addressById/${id}`,
      );
      // console.log(result.data);
      dispatch(syncAddress(result.data));
      // console.log(syncAddress(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
  }, [id]);

  const onDeleteAddress = async id => {
    try {
      const resDel = await axios.delete(
        `${process.env.REACT_APP_API_BASE}/address/delAddress/${id}`,
      );
      // console.log(resDel);
      getAddress();
    } catch (err) {
      console.log(err);
    }
  };

  const toAddAddress = () => {
    navigate(`/addAddress/${id}`);
  };

  const toUpdateAddress = addressId => {
    navigate(`/updateAddress/${addressId}`);
  };

  // console.log(data);

  return (
    <Flex
      minH={"100vh"}
      // algin={"center"}
      // justify={"center"}
      bg="#ffff"
      maxWidth={"506px"}
      flexDirection="column"
    >
      <Stack
        spacing={4}
        mx={"auto"}
        maxW={"lg"}
        py={3}
        px={3}
      >
        <Stack
          align={"center"}
          marginBottom="15px"
          marginTop="10px"
        >
          <Heading
            fontSize={"2xl"}
            color="black"
          >
            Alamat
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={"#ebf5e9"}
          boxShadow={"lg"}
          p={8}
          marginTop="5px"
        >
          <Stack spacing={4}>
            <Stack>
              {data?.map(item => {
                return (
                  <>
                    <Flex justifyContent={"space-between"}>
                      <Menu theme={{ direction: "rtl" }}>
                        <MenuButton
                          color={"black"}
                          minBlockSize="10px"
                          as={IconButton}
                          aria-label="Options"
                          icon={<HamburgerIcon />}
                          variant="ghost"
                          _
                          bg={"yellow.400"}
                          _hover={{
                            bg: "yellow.300",
                          }}
                        />
                        <MenuList bgColor={"white"}>
                          <MenuItem
                            as={"button"}
                            onClick={() => toUpdateAddress(item.id)}
                            icon={<EditIcon />}
                            bgColor={"white"}
                            textColor={"black"}
                            placement="bottom"
                            direction="ltr"
                          >
                            Edit Address
                          </MenuItem>
                          <MenuItem
                            as={"button"}
                            onClick={() => onDeleteAddress(item.id)}
                            icon={<DeleteIcon />}
                            bgColor={"white"}
                            textColor={"black"}
                          >
                            Delete Address
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>

                    <Text>{item.addressFill}</Text>
                    <Text>{item.district}</Text>
                    <Text>{item.city}</Text>
                    <Text>{item.province}</Text>

                    <Text>{item.detail}</Text>
                    <Text>Alamat Utama?</Text>
                  </>
                );
              })}
              <Center>
                <Button
                  bg={"yellow.400"}
                  color={"black"}
                  _hover={{
                    bg: "yellow.300",
                  }}
                  onClick={toAddAddress}
                  width="160px"
                  justifyContent="center"
                >
                  Add Address
                </Button>
              </Center>
              {/* <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  colorScheme={"yellow"}
                >
                  Select City here...
                </MenuButton>
                <MenuList>
                  <MenuItem>contoh Karawang</MenuItem>
                  <MenuItem>contoh Yogyakarta</MenuItem>
                  <MenuItem>contoh Jakarta</MenuItem>
                </MenuList>
              </Menu> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
