import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
  Container,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage, Field, useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
export { SmallCloseIcon } from "@chakra-ui/icons";

export const UserProfile = () => {
  const {
    id,
    name: ngaran,
    email: pesan,
    gender: jenis,
    birthdate: ulangTahun,
    profile_picture_url,
  } = useSelector(state => state.userSlice.value);

  console.log(jenis);

  //useState untuk panggil data profile dan edit image
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");
  const [move, setMove] = useState(false);
  const [data, setData] = useState([]);

  //url get ID dan Update Profile
  const urlGetId = `http://localhost:8000/usersLogin/getUserId/${id}`;
  const urlUpdateProfile = `http://localhost:8000/usersLogin/editProfile/${id}`;
  const urlUpdateImage = `http://localhost:8000/usersLogin/uploadFile/${id}`;

  //choose file upload
  const handleChoose = e => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
    console.log(setImage);
  };

  //upload picture
  const handleUpload = async () => {
    const up = new FormData();
    console.log(up);
    up.append("file", image);
    console.log(up.get("file"));

    const uploadImage = await axios.post(urlUpdateImage, up, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(uploadImage.data);
    setProfile(uploadImage.data.profile_picture_url);
    setImage({ images: "" });

    Swal.fire({
      icon: "success",
      tittle: "Sukses",
      text: "Gambar Profile Berhasil diganti",
    });
  };
  console.log(image);
  console.log(profile);

  //edit data profile using useRef
  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputGender = useRef("");
  const inputBirthdate = useRef("");

  const editProfile = async () => {
    try {
      const editData = {
        name: inputName.current.value,
        email: inputEmail.current.value,
        gender: inputGender.current.value,
        birthdate: inputBirthdate.current.value,
      };
      const resultEdit = axios.patch(urlUpdateProfile, editData);
      console.log(resultEdit);
      Swal.fire({
        icon: "success",
        title: "Edited",
        text: "Succesfuly Edited",
        timer: 20000,
      });
      setMove(true);
    } catch (err) {
      console.log(err);
    }
  };

  // //get user ID by Formik
  const getUserId = async () => {
    try {
      const getId = await axios.get(urlGetId);
      setData(getId.data);
    } catch (err) {
      console.log(err);
    }
  };

  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      birthdate: "",
    },
  });

  // panggil UserID
  useEffect(() => {
    getUserId();
  }, []);

  console.log(data);

  return move ? (
    <Navigate
      to="/"
      replace={true}
    />
  ) : (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          bg={"#ebf5e9"}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            textAlign={"center"}
          >
            User Profile Edit
          </Heading>
          <br></br>
          <FormControl id="name">
            <Stack
              direction={["column", "row"]}
              spacing={6}
            >
              <Center>
                <Avatar
                  size={"xl"}
                  src={`http://localhost:8000/${profile_picture_url}`}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded={"full"}
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w={"full"}>
                <Button
                  w="full"
                  onClick={handleUpload}
                >
                  Change Icon
                </Button>
              </Center>
              <Center w={"full"}>
                <form encType="multipart/form-data">
                  <Input
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={e => handleChoose(e)}
                  />
                </form>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              ref={inputName}
              // value={formik.values.name}
              // onChange={event =>
              //   formik.setFieldValue("name", event.target.value)
              // }
              defaultValue={ngaran}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              ref={inputEmail}
              // value={formik.value.email}
              defaultValue={pesan}
              // onChange={event =>
              //   formik.setFieldValue("email", event.target.value)
              // }
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              border={"2px"}
              borderColor="yellow.300"
              width={"max"}
              ml="8"
              ref={inputGender}
            >
              <option
                selected={jenis === ""}
                value=""
              >
                Select Gender
              </option>
              <option
                selected={jenis === "male"}
                value="male"
              >
                Male
              </option>
              <option
                selected={jenis === "female"}
                value="female"
              >
                Female
              </option>
            </Select>
          </FormControl>
          {/* <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Input
              ref={inputGender}
              // value={formik.value.gender}
              defaultValue={jenis}
              // onChange={event =>
              //   formik.setFieldValue("gender", event.target.value)
              // }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl> */}
          <FormControl id="birthdate">
            <FormLabel>Birthdate</FormLabel>
            <Input
              ref={inputBirthdate}
              // value={formik.value.birthdate}
              defaultValue={ulangTahun}
              // onChange={event =>
              //   formik.setFieldValue("birthdate", event.target.value)
              // }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack
            spacing={6}
            direction={["column", "row"]}
            display="flex"
            justifyContent={"space-around"}
          >
            <Box
              as={Link}
              to={"/"}
            >
              <Button
                bg={"red.400"}
                color={"white"}
                w="150px"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
            </Box>
            <Button
              type="submit"
              onClick={editProfile}
              bg={"blue.400"}
              color={"white"}
              w="150px"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};
