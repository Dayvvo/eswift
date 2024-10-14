import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { IoFilter } from "react-icons/io5";
import { PropertyCard } from "./propertyCard";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { BsPlus } from "react-icons/bs";

import useProperty from "@/hooks/useProperty";
import { useImage, useInputNumber, useInputText } from "@/hooks/useInput";
import { useApiUrl } from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { AddPropertyScreenOne } from "./AddPropertyScreen1";
import { AddPropertyScreenTwo } from "./AddPropertyScreen2";
import { AddPropertyScreenThree } from "./AddPropertyScreen3";
import { AddPropertyScreenFour } from "./AddPropertyScreen4";

interface MyData {
  _id: any;
  title: string;
  price: string;
  address: string;
  email: string;
  owner: string;
  userImage: string;
  images: any;
  creatorID: any;
}
interface User {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  avatar: any;
}
export const PropertyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [getProperty, setGetProperty] = useState<MyData[]>([]);
  const [page, setPage] = useState<any>(1);
  const [inputValue, setInputValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [showScreen, setShowScreen] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const {
    input: title,
    onChangeInput: onChangeTitle,
    reset: titleReset,
  } = useInputText((title) => title.length > 2);
  const {
    input: category,
    onChangeInput: onChangeCategory,
    reset: categoryReset,
  } = useInputText((category) => category !== "");

  const {
    input: description,
    onChangeInput: onChangeDescription,
    reset: descriptionReset,
  } = useInputText((description) => description.length > 8);
  const {
    input: address,
    onChangeInput: onChangeAddress,
    reset: addressReset,
  } = useInputText((address) => address.length > 3);
  const {
    input: typeOfProperty,
    onChangeInput: onChangeType,
    reset: typeReset,
  } = useInputText((typeOfProperty) => typeOfProperty !== "");

  const {
    input: duration,
    onChangeInput: onChangeDuration,
    reset: durationReset,
  } = useInputText((duration) => duration !== "");
  const {
    input: fileName,
    onChangeInput: onChangeFileName,
    reset: fileNameReset,
  } = useInputText((fileName) => fileName !== "");

  const {
    input: price,
    onChangeInput: onChangePrice,
    reset: priceReset,
  } = useInputText((price) => price !== "");
  const {
    image,
    onChangeHandler: onChangeImage,
    error: imageError,
    reset: imageReset,
  } = useImage();
  const { toast } = useToast();
  const client = useApiUrl();

  const { addProperty } = useProperty();
  // const toast = useToast();
  const propertyData = {
    title,
    type: typeOfProperty,
    address,
    price,
    category,
    duration,
    description,
    features: ["nice", "cheap", "open spaces"],
    images: [
      "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    name: fileName,
    file: "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  // console.log(propertyData);
  const addPropertyFn = async () => {
    try {
      const req = await addProperty(propertyData); // If no error occurs, the following code runs
      // console.log("response", req);
      setShowModal(false);

      toast({
        status: "success",
        description: "Property created",
        title: "Success",
        position: "top",
        duration: 5000,
      });
      // Reset the form fields after successful creation

      titleReset();
      categoryReset();
      descriptionReset();
      durationReset();
      imageReset();
      fileNameReset();
      priceReset();
      typeReset();
      addressReset();
      setShowScreen(1);
    } catch (err) {
      // In case of error, this block will handle it and show the error toast
      toast({
        status: "error",
        description: "Failed to create property",
        title: "Failed",
        position: "top",
        duration: 5000,
      });
      // console.log("err", err);
    }
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ data: User[] }> = await client.query(
          `/user/users`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const getPropertyFunction = async () => {
      setLoading(true);
      try {
        setLoading(false);
        const getAllProperties = await axios.get(
          `/api/property?keyword=${inputValue}&PageNumber={${page}}`
        );
        setGetProperty(getAllProperties?.data?.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getPropertyFunction();
  }, [page, inputValue, showModal]);

  return (
    <>
      <Modal onClose={toggleModal} isVisible={showModal}>
        {/* {currentChildComponent} */}
        {showScreen === 1 ? (
          <AddPropertyScreenOne
            onChangeTitle={onChangeTitle}
            onChangeCategory={onChangeCategory}
            onChangeDescription={onChangeDescription}
            typeOfProperty={typeOfProperty}
            onChangeType={onChangeType}
            description={description}
            title={title}
            category={category}
            onClick={() => setShowScreen(2)}
          />
        ) : showScreen === 2 ? (
          <AddPropertyScreenTwo
            address={address}
            price={price}
            duration={duration}
            onChangeAddress={onChangeAddress}
            onChangePrice={onChangePrice}
            onChangeDuration={onChangeDuration}
            next={() => setShowScreen(3)}
            previous={() => setShowScreen(1)}
          />
        ) : showScreen === 3 ? (
          <AddPropertyScreenThree
            next={() => setShowScreen(4)}
            previous={() => setShowScreen(2)}
            images={image}
            onChangeImage={onChangeImage}
            error={imageError}
          />
        ) : showScreen === 4 ? (
          <AddPropertyScreenFour
            next={addPropertyFn}
            previous={() => setShowScreen(3)}
            fileName={fileName}
            onChangeFileName={onChangeFileName}
          />
        ) : (
          ""
        )}
      </Modal>
      <Box className="robotoF" px={{ base: "16px", lg: "0" }}>
        <Flex my={"24px"} gap={"12px"} w={"100%"} h={"36px"}>
          <Flex w={"100%"}>
            <InputGroup
              display={"flex"}
              alignItems={"center"}
              border={"1px"}
              borderRadius={"8px"}
              borderColor={"var(--soft200)"}
              cursor={"search"}
              fontSize={14}
              textColor={"var--(sub600)"}
              w="100%"
              h="100%"
              _placeholder={{ textColor: "var--(soft400)" }}
            >
              <InputLeftElement pointerEvents="none" color={"var(--soft400)"}>
                <RiSearch2Line />
              </InputLeftElement>
              <Input
                w={"100%"}
                h={"100%"}
                type="search"
                placeholder="Search..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
              />
            </InputGroup>
          </Flex>
          <Btn
            onClick={() => setPage(inputValue)}
            display={"flex"}
            gap={"4px"}
            alignItems={"center"}
            bg={"#fff"}
            h={"100%"}
            w={"80px"}
            border={"1px solid var(--soft200)"}
            borderRadius={"8px"}
            textColor={"var--(sub600)"}
            fontWeight={500}
            fontSize={"14px"}
            px={"0"}
            pt={"0"}
            pb={"0"}
          >
            <IoFilter className="icon" />
            <Text>Filter</Text>
          </Btn>
          <Btn
            onClick={toggleModal}
            display={"flex"}
            gap={"4px"}
            alignItems={"center"}
            bg={"#fff"}
            h={"100%"}
            w={"80px"}
            border={"1px solid var(--soft200)"}
            borderRadius={"8px"}
            textColor={"var--(sub600)"}
            fontWeight={500}
            fontSize={"14px"}
            px={"0"}
            pt={"0"}
            pb={"0"}
          >
            <BsPlus className="icon" />
            <Text>Add</Text>
          </Btn>
        </Flex>
        {loading && (
          <Stack>
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}

        {!loading && getProperty?.length > 0 && (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: "24px", lg: "28px" }}
          >
            {getProperty.map((property) => {
              const user = users.find((u) => u._id === property?.creatorID);

              return (
                <PropertyCard
                  key={property?._id}
                  image={property?.images}
                  title={property?.title}
                  pricing={property?.price}
                  location={property?.address}
                  userImage={user?.avatar || "/"}
                  email={user?.email}
                  user={user?.firstName}
                  count={page}
                />
              );
            })}
          </Grid>
        )}
        {!loading && getProperty?.length === 0 && (
          <Card>
            <CardBody>
              <Text>No property available please wait</Text>
            </CardBody>
          </Card>
        )}
      </Box>
    </>
  );
};
