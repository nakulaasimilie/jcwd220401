import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect } from "react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function CreateComp() {
  const [data2, setData2] = useState([]);

  const inputName = useRef("");
  const inputStatement = useRef("");
  const inputDetail = useRef("");
  const inputSize = useRef("");
  const inputPrice = useRef("");

  const onCreate = async () => {
    try {
      const addProduct = {
        name: inputName.current.value,
        price: inputPrice.current.value,
        statement: inputStatement.current.value,
        detail: inputDetail.current.value,
        size: inputSize.current.value,
      };

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE}/product/create`,
        addProduct,
      );

      Swal.fire({
        icon: "success",
        text: "Product Added",
        width: "370px",
      });
      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 900);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE}/product/listCategory`,
      );
      // console.log(res.data);
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Flex
      minH={"70vh"}
      justify={"center"}
      bg={useColorModeValue("white.50", "white.800")}
      mt={2}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "white.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        mt={0}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          textAlign="center"
        >
          Tambah Produk
        </Heading>
        <Flex></Flex>
        <Flex>
          <FormControl
            id="title"
            isRequired
          >
            <FormLabel>Nama</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="text"
              ref={inputName}
            />
          </FormControl>
        </Flex>
        <FormControl
          id="author"
          isRequired
        >
          <FormLabel>Keterangan</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="author"
            ref={inputStatement}
          />
        </FormControl>
        <FormControl
          id="publisher"
          isRequired
        >
          <FormLabel>Detail</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            type="publisher"
            ref={inputDetail}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Size</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            ref={inputSize}
            isRequired
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            _placeholder={{ color: "gray.500" }}
            ref={inputPrice}
            isRequired
          />
        </FormControl>
        <FormControl>
          <FormLabel color="#285430">Category </FormLabel>
          <Select
            color={"#285430"}
            borderColor="#285430"
            width="100%"
          >
            <option>Select Category</option>
            {data2?.map(item => {
              return (
                <>
                  <option color="#285430">{item.categoryName}</option>
                </>
              );
            })}
          </Select>
        </FormControl>

        <Stack
          spacing={6}
          direction={["column", "row"]}
        >
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={onCreate}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
