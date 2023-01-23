import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import pesanan from "../assets/pesanan.svg";
import keranjang from "../assets/keranjang.svg";
import user from "../assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { cartDel } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      w={"100px"}
      h={"50px"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      onClick={onclick}
      // _hover={{
      //   bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      // }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Navbar() {
  const { name, cart, email } = useSelector(state => state.userSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(cartDel());
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
  };

  const transaksi = () => {
    if (!email) {
      return Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Silahkan Masukan Akun Anda",
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } else {
      return navigate(`/cart`, { replace: true });
    }
  };

  return (
    <Box
      bg={useColorModeValue("#ebf5e9")}
      position={"fixed"}
      justifyContent={"center"}
      bottom={0}
    >
      <Container
        as={Stack}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        position={"relative"}
      >
        <Stack
          direction={"row"}
          spacing={6}
        >
          <SocialButton
            label={"Produk"}
            href={"/"}
          >
            <Box textAlign={"center"}>
              <FontAwesomeIcon icon={faHouse} />
              <Text>Produk</Text>
            </Box>
          </SocialButton>
          <SocialButton>
            <IconButton
              onClick={() => transaksi()}
              bg="#ebf5e9"
            >
              <Box textAlign={"center"}>
                <Image
                  src={pesanan}
                  margin="auto"
                />
                <Text>Transaksi</Text>
              </Box>
            </IconButton>
          </SocialButton>
          <SocialButton
            label={"Cart"}
            href={"/cart"}
          >
            <Box textAlign={"center"}>
              {/* {name && cart !== 0 ? (
                <Badge p="1" ml="-2" mt="-3">
                  <Text fontSize="xx-small">{cart}</Text>
                </Badge>
              ) : null} */}
              <Image
                src={keranjang}
                margin="auto"
              />
              <Text>Keranjang</Text>
            </Box>
          </SocialButton>
          <SocialButton>
            <Box textAlign={"center"}>
              {name ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    bg
                  >
                    <Image
                      src={user}
                      margin="auto"
                    />
                    <Text>{name}</Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link href="/profile">Profile</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/changePassword">Change Password</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/address">Address</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link onClick={onLogout}>Logout</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <SocialButton
                    label={"Akun"}
                    href={"/login"}
                  >
                    <Box textAlign={"center"}>
                      <Image
                        src={user}
                        margin="auto"
                      />
                      <Text>Akun</Text>
                    </Box>
                  </SocialButton>
                </>
              )}
            </Box>
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
