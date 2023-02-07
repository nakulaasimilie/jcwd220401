import {
  ArrowBackIcon,
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
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const AddAddress = () => {
  const [province, setProvince] = useState([]);
  const [postal, setPostal] = useState([]);
  const [city, setCity] = useState([]);
  const [selectProvince, setSelectProvince] = useState(0);
  const [selectCity, setSelectCity] = useState(0);
  const [selectPostal, setSelectPostal] = useState(0);
  const [move, setMove] = useState(false);
  const inputAddressFill = useRef("");
  const inputCity = useRef("");
  const inputProvince = useRef("");
  const inputDetail = useRef("");
  const inputDistrict = useRef("");
  const inputPostal = useRef("");
  const inputIsPrimaryAddress = useRef("");
  const navigate = useNavigate();
  const params = useParams();

  const createAddress = async () => {
    try {
      const addAddress = {
        addressFill: inputAddressFill.current.value,
        city: selectCity,
        district: inputDistrict.current.value,
        province: selectProvince,
        postal_code: inputPostal.current.value,
        detail: inputDetail.current.value,
      };

      // console.log("addAddress", addAddress);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE}/address/createAddress/${params.id}`,
        addAddress,
      );
      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Alamat Telah ditambah",
        timer: 2000,
      });
      setMove(true);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getProvince = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}/address/province`,
      );
      setProvince(response.data.results);
      // console.log("get Province", response);
      // console.log("get province result", response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const rendProvince = () => {
    return province.map(valProp => {
      return (
        <option
          value={valProp.province_id}
          key={valProp.province_id.toString()}
        >
          {valProp.province}
        </option>
      );
    });
  };

  const getCity = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}/address/city/${selectProvince}`,
      );
      // console.log("get city", response);
      setCity(response.data.results);
      // console.log("get city result", response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const rendCity = () => {
    return Array.from(city).map((valueProp, i) => {
      return (
        <option
          value={valueProp.city_id}
          key={i}
        >
          {valueProp.type + " "} {valueProp.city_name}
        </option>
      );
    });
  };

  const getPostal = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}/address/postal/${selectPostal}`,
      );
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const rendPostal = () => {
    return Array.from(postal).map((valProp, i) => {
      return (
        <option
          value={valProp.city_id}
          key={i}
        >
          {valProp.type + " "} {valProp.postal_code}
        </option>
      );
    });
  };

  const provinceHandle = ({ target }) => {
    const { value } = target;
    setSelectProvince(value);
    // console.log("value", value);
    // console.log("setSelectProvince", setSelectProvince(value));
    // console.log("Select Province", selectProvince);
  };

  const cityHandle = ({ target }) => {
    const { value } = target;
    setSelectCity(value);
    // console.log("value", value);
    // console.log("setSelectCity", setSelectCity(value));
    // console.log("Select City", selectCity);
  };

  const postalHandle = ({ target }) => {
    const { value } = target;
    setSelectPostal(value);
  };

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    getCity();
  }, [selectProvince]);

  useEffect(() => {
    getPostal();
  }, []);

  return move ? (
    <Navigate
      to="/address:id"
      replace={true}
    />
  ) : (
    <>
      <Flex
        minH={"100vh"}
        // algin={"center"}
        // justify={"center"}
        bg="#ffff"
        maxWidth={"506px"}
        flexDirection="column"
      >
        <Box
          as={Link}
          to={"/address"}
        >
          <ArrowBackIcon
            mt={"20px"}
            ml={"20px"}
            pos={"fixed"}
            color={"black"}
            fontSize={"20px"}
            position="absolute"
          />
        </Box>
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
              Buat Alamat Baru
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
                <FormControl>
                  <FormLabel>Alamat</FormLabel>
                  <Input
                    ref={inputAddressFill}
                    placeholder="Alamat"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Kecamatan</FormLabel>
                  <Input ref={inputDistrict} />
                </FormControl>
                <FormControl>
                  <FormLabel>Provinsi</FormLabel>
                  <Select
                    placeholder="pilih provinsi"
                    onChange={provinceHandle}
                  >
                    {rendProvince()}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Kota</FormLabel>
                  <Select
                    placeholder="pilih kota"
                    onChange={cityHandle}
                  >
                    {rendCity()}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Kode Pos</FormLabel>
                  <Input ref={inputPostal} />
                </FormControl>
                <FormControl>
                  <FormLabel>Detail Alamat</FormLabel>
                  <Textarea
                    ref={inputDetail}
                    placeholder="blok/lantai atau persimpangan"
                  ></Textarea>
                  <Checkbox iconSize={"1rem"}>
                    Pakai Sebagai Alamat Utama
                  </Checkbox>
                </FormControl>
                <Center>
                  <Button
                    onClick={createAddress}
                    bg={"yellow.400"}
                    color={"black"}
                    _hover={{
                      bg: "yellow.300",
                    }}
                    width="160px"
                    justifyContent="center"
                  >
                    {" "}
                    Buat Alamat Baru
                  </Button>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
