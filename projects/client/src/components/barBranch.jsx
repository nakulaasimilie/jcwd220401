import {
  Box,
  Flex,
  Avatar,
  chakra,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { logoutAdmin } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

const ButtonDraw = ({ children, label, href }) => {
  return (
    <chakra.button
      w={"full"}
      h={"50px"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      onClick={onclick}
      _hover={{
        bg: useColorModeValue("green.300"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function BarAdminBranch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name } = useSelector(state => state.adminSlice.value);
  const [placement, setPlacement] = React.useState("left");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    sessionStorage.removeItem("id");
    return navigate(`/loginAdmin`, { replace: true });
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            colorScheme="green"
            onClick={onOpen}
          >
            Menu
          </Button>
          <Drawer
            placement={placement}
            onClose={onClose}
            isOpen={isOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                Branch Admin Menu
              </DrawerHeader>
              <DrawerBody>
                <ButtonDraw href={"/dashboard"}>
                  <Box textAlign={"center"}>
                    <Text>Dashboard</Text>
                  </Box>
                </ButtonDraw>
                {/* <ButtonDraw href={"/dashboard/branchManagement"}>
                  <Box textAlign={"center"}>
                    <Text>Branch Management</Text>
                  </Box>
                </ButtonDraw> */}
                {/* <ButtonDraw href={"/dashboard/crud"}>
                  <Box textAlign={"center"}>
                    <Text>Product and Category Management</Text>
                  </Box>
                </ButtonDraw> */}
                <ButtonDraw href={"/dashboard/crud"}>
                  <Box textAlign={"center"}>
                    <Text>Transaction</Text>
                  </Box>
                </ButtonDraw>
                <ButtonDraw href={"/addInventory"}>
                  <Box textAlign={"center"}>
                    <Text>Add Inventory</Text>
                  </Box>
                </ButtonDraw>
                <ButtonDraw href={"/dashboard/crud"}>
                  <Box textAlign={"center"}>
                    <Text>Sales Report</Text>
                  </Box>
                </ButtonDraw>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Box
            margin={"auto"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            textAlign="center"
          >
            DASHBOARD
          </Box>
          <Flex alignItems={"center"}>
            {name ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                  <Text>{name}</Text>
                </MenuButton>
                <MenuList>
                  <Link onClick={onLogout}>Logout</Link>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Box textAlign={"center"}>
                <Text>Akun</Text>
              </Box>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box
            pb={4}
            display={{ md: "none" }}
          >
            <Stack
              as={"nav"}
              spacing={4}
            >
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
