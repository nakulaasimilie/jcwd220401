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
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { syncAddress } from "../redux/addressSlice";

export const UpdateAddress = () => {
  const { data } = useSelector(state => state.addressSlice.value);
  const { id } = useSelector(state => state.userSlice.value);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [postal, setPostal] = useState([]);
  const [selectProvince, setSelectProvince] = useState(0);
  const [selectCity, setSelectCity] = useState(0);
  const [selectPostal, setSelectPostal] = useState(0);
  const inputAddressFill = useRef("");
  const inputCity = useRef("");
  const inputProvince = useRef("");
  const inputDetail = useRef("");
  const inputDistrict = useRef("");
  const inputIsPrimaryAddress = useRef("");
  const inputPostalCode = useRef("");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const onAddressUpdate = async () => {
    try {
      const addressUpdate = {
        addressFill: inputAddressFill.current.value,
        district: inputDistrict.current.value,
        city: selectCity,
        postal_code: inputPostalCode.current.value,
        province: selectProvince,
        detail: inputDetail.current.value,
      };
      const res = await axios.patch(
        `http://localhost:8000/address/updateAddress/${params.id}`,
        addressUpdate,
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Address Updated",
      });
      navigate("/address");
    } catch (err) {
      console.log(err);
    }
  };

  const getProvince = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/address/province`,
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
        `http://localhost:8000/address/city/${selectProvince}`,
      );
      console.log("get city", response);
      setCity(response.data.results);
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
        `http://localhost:8000/address/postal/${selectPostal}`,
      );
      console.log(response);
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
    // console.log(setSelectProvince(value));
    console.log(selectProvince);
  };

  const cityHandle = ({ target }) => {
    const { value } = target;
    setSelectCity(value);
    console.log(selectCity);
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
  }, [selectCity]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/address/findAddressById/${params.id}`,
      );
      console.log(res.data);
      dispatch(syncAddress(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  // const toListAddress = () => {
  //   navigate(`/address/${id}`);
  //   getData();
  // };

  const refreshPage = () => {
    window.location.replace(`/address/${id}`);
  };

  console.log("params", params);
  return (
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
          as="button"
          onClick={refreshPage}
          marginRight="950px"
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
              Edit Alamat
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
                    defaultValue={data?.addressFill}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Kecamatan</FormLabel>
                  <Input
                    ref={inputDistrict}
                    defaultValue={data?.district}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Provinsi</FormLabel>
                  <Select
                    icon={<ChevronDownIcon />}
                    placeholder={data?.province}
                    onChange={provinceHandle}
                  >
                    {rendProvince()}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Kota</FormLabel>
                  <Select
                    placeholder={data?.city}
                    onChange={cityHandle}
                  >
                    {rendCity()}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Kode Pos</FormLabel>
                  <Input
                    ref={inputPostalCode}
                    defaultValue={data?.postal_code}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Detail Alamat</FormLabel>
                  <Textarea
                    ref={inputDetail}
                    placeholder="blok/lantai atau persimpangan"
                    defaultValue={data?.detail}
                  ></Textarea>
                  <Checkbox iconSize={"1rem"}>
                    Pakai Sebagai Alamat Utama
                  </Checkbox>
                </FormControl>
                <Center>
                  <Button
                    onClick={() => onAddressUpdate()}
                    bg={"yellow.400"}
                    color={"black"}
                    _hover={{
                      bg: "yellow.300",
                    }}
                    width="210px"
                    justifyContent="center"
                  >
                    {" "}
                    Update Address Confirm
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
