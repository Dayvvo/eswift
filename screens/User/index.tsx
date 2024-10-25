import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import React, { FormEvent, useEffect, useState } from "react";
import { ActionIcon, FilterIcon, SearchIcon } from "../../components/svg";
import axios from "axios";
import { useApiUrl } from "@/hooks/useApi";
import UserDrawer from "./UserDrawer";
import useUser from "@/hooks/useUser";
import Btn from "@/components/Btn";
import { Modal } from "@/components/modal";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useToast from "@/hooks/useToast";

const UserScreen = () => {
  const [table, setTable] = useState<any>([]);
  const [userEl, setUserEl] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "CLIENT",
  });
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [err3, setErr3] = useState(false);
  const [err4, setErr4] = useState(false);

  // const updatedTable = [...table, ...userData]

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useToast();
  
  const { addUser } = useUser();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name) {
      setUserData((prevDetails) => ({
        ...prevDetails,
        [name]: value, // Use the name from the target as the key
      }));
    }
  };

  const validateFirstName = () => {
    if (userData.firstName.length === 0) {
      setErr1(true);
    } else {
      setErr1(false);
    }
  };

  const validateLastName = () => {
    if (userData.lastName.length === 0) {
      setErr2(true);
    } else {
      setErr2(false);
    }
  };

  const validateEmail = () => {
    if (userData.email.length === 0) {
      setErr3(true);
    } else {
      setErr3(false);
    }
  };

  const validatePassword = () => {
    if (userData.password?.length < 8) {
      setErr4(true);
    } else {
      setErr4(false);
    }
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const res = await addUser(userData);
      setUserData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "CLIENT",
      });
      setShowModal(false);
      toast({
        status: "success",
        title: "User created",
      });
      return res;
    } catch (err) {
      console.log("err", err);
    }
    finally {
      setLoading(false);
    }
  };

  const { getUser, getUserById } = useUser();
  console.log("userEl", userEl);

  const getUserFn = async () => {
    const res: any = await getUser();
    setTable(res?.data?.data);
  };

  useEffect(() => {
    getUserFn();
  }, []);

  
  const btnRef = React.useRef();

  const openDrawer = async (userId: string) => {
    onOpen();
    const res: any = await getUserById(userId);
    console.log("res", res);
    setUserEl(res?.data?.data);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <Box>
      <Flex gap={"20px"}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            border={"1px solid #E1E4EA"}
          />
        </InputGroup>
        <Flex
          border={"1px solid #E1E4EA"}
          borderRadius={"8px"}
          gap="4px"
          align={"center"}
          justify={"center"}
          p="8px"
        >
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FilterIcon />}
              bgColor={"transparent"}
              h="20px"
              className="robotoF"
              fontSize={".875rem"}
              fontWeight={500}
              _hover={{ bgColor: "none" }}
            >
              Filter
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
        <Btn className="robotoF" onClick={() => setShowModal(true)}>
          Add User
        </Btn>
        <Modal onClose={toggleModal} isVisible={showModal} label="Add User">
          <FormControl>
            <Box pt="15px">
              <FormLabel
                className="robotoF"
                display={"flex"}
                gap={"4px"}
                fontSize={".875rem"}
              >
                <Text>First Name</Text>
                <Text color={"red"}>*</Text>
              </FormLabel>
              <Input
                className="robotoF"
                type="text"
                w="314px"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                onBlur={validateFirstName}
              />
              {err1 && (
                <Text className="robotoF" color="red" fontSize={".625rem"}>
                  First name is important
                </Text>
              )}
            </Box>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"} display={"flex"}
                gap={"4px"}>
                <Text>Last Name</Text>
                <Text color={"red"}>*</Text>
              </FormLabel>
              <Input
                className="robotoF"
                type="text"
                w="314px"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                onBlur={validateLastName}
              />
              {err2 && (
                <Text className="robotoF" color="red" fontSize={".625rem"}>
                  Last name is important
                </Text>
              )}
            </Box>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"} display={"flex"}
                gap={"4px"}>
                <Text>Email</Text>
                <Text color={"red"}>*</Text>
              </FormLabel>
              <Input
                className="robotoF"
                type="email"
                w="314px"
                name="email"
                value={userData.email}
                onChange={handleChange}
                onBlur={validateEmail}
              />
              {err3 && (
                <Text className="robotoF" color="red" fontSize={".625rem"}>
                  Email is important
                </Text>
              )}
            </Box>
            <Box pt="15px">
              <FormLabel className="robotoF" fontSize={".875rem"} display={"flex"}
                gap={"4px"}>
                <Text>Password</Text>
                <Text color={"red"}>*</Text>
                </FormLabel>
              {/* <Input className="robotoF" type="text" w="314px" name="password" value={userData.password} onChange={handleChange} /> */}
              <InputGroup
                display={"flex"}
                justifyContent={"center"}
                border={"1px"}
                borderRadius={"10px"}
                borderColor={"var(--soft200)"}
                className="robotoF"
                cursor={"text"}
                fontSize={14}
                textColor={"var--(sub600)"}
                w="100%"
                h="40px"
                _placeholder={{ textColor: "var--(soft400)", fontSize: 12 }}
              >
                <Input
                  w={"100%"}
                  h={"100%"}
                  outline={"none"}
                  type={show ? "text" : "Password"}
                  placeholder="*********"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  onBlur={validatePassword}
                />
                <InputRightElement
                  width="fit-content"
                  marginRight={"20px"}
                  cursor={"pointer"}
                >
                  <Box onClick={() => setShow(!show)}>
                    {!show ? (
                      <BsEyeSlash className="formicon" />
                    ) : (
                      <BsEye className="formicon" />
                    )}
                  </Box>
                </InputRightElement>
              </InputGroup>
              {err4 && (
                <Text className="robotoF" color="red" fontSize={".625rem"}>
                  Password must be more than 7 characters
                </Text>
              )}
            </Box>
            <Box pt="15px" mb="20px">
              <FormLabel className="robotoF" fontSize={".875rem"}>
                User Type
              </FormLabel>
              <Select
                className="robotoF"
                name="role"
                w="314px"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="CLIENT">ADMIN</option>
                <option value="GUEST">AFFILIATE</option>
              </Select>
            </Box>
            <Btn
              className="robotoF"
              type={"submit"}
              w="full"
              onClick={createUser}
              isDisabled={
                err1 ||
                err2 ||
                err3 ||
                err4 ||
                userData.firstName.length === 0 ||
                userData.lastName.length === 0 ||
                userData.email.length === 0 ||
                userData.password.length === 0
              }
              isLoading={loading}
            >
              Create User
            </Btn>
          </FormControl>
        </Modal>
      </Flex>
      <TableContainer mt="30px">
        <Table size="sm">
          <Thead>
            <Tr bgColor={"#F5F7FA"}>
              {[
                "Full Name",
                "Email",
                "Phone No.",
                "Date Created",
                "Property",
                "User Type",
                "Action",
              ].map((item, key) => (
                <Th key={key} textTransform={"none"} p="8px">
                  <Text
                    className="robotoF"
                    color={"#525866"}
                    fontWeight={400}
                    fontSize={".875rem"}
                  >
                    {item}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={".875rem"} fontWeight={400} className="robotoF">
            {table &&
              table.map((item: any) => (
                <Tr
                  key={item._id}
                  cursor={"pointer"}
                  onClick={() => openDrawer(item._id)}
                >
                  <Td color={"#0E121B"} py="12px">{`${item.firstName
                    .slice(0, 1)
                    .toUpperCase()}${item.firstName.slice(
                    1,
                    item.firstName.length
                  )} ${item.lastName
                    .slice(0, 1)
                    .toUpperCase()}${item.lastName.slice(
                    1,
                    item.lastName.length
                  )}`}</Td>
                  <Td color={"#525866"} py="12px">
                    {item.email}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {"09094631170"}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.createdAt.split("T")[0]}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.propertyCount}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    {item.role}
                  </Td>
                  <Td color={"#525866"} py="12px">
                    <Menu>
                      <MenuButton as={"button"} className="robotoF">
                        <ActionIcon />
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            <UserDrawer
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              userEl={userEl}
            />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserScreen;
