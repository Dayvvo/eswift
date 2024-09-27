import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
} from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import Btn from "@/components/Btn";
import { IoFilter } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { BsPlus } from "react-icons/bs";
import { AddPropertyScreenOne } from "./AddPropertyScreen1";
import { AddPropertyScreenTwo } from "./AddPropertyScreen2";
import { AddPropertyScreenThree } from "./AddPropertyScreen3";
import { AddPropertyScreenFour } from "./AddPropertyScreen4";
<<<<<<< HEAD
import { PropertyCard } from "./propertyCard";
=======
import { BsPlus } from "react-icons/bs";
import useProperty from "@/hooks/useProperty";
>>>>>>> 11fce3048c3a19c41cee10867ea295a45c6bed75

export const PropertyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentChildComponent, setCurrentChildComponent] = useState<React.ReactNode | null>(null);

  const propertyData = {
    title: "Nice house2",
    type: "Bungalow",
    address: "12 Main St",
    price: "120000",
    category: "Sample",
    description: "Very NIce House",
    features: ["nice", "cheap", "open spaces"],
    images: [
      "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };

  const { addProperty } = useProperty();

  const addPropertyFn = async() => {
    try {
        const req = await addProperty(propertyData);
        console.log('req', req);
    }
    catch (err) {
        console.log('err', err)
    }
  }

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const openAddPropertyScreenOne = () => {
    setCurrentChildComponent(
      <AddPropertyScreenOne onClick={openAddPropertyScreenTwo} />
    );
    setShowModal(true);
  };
  
  const openAddPropertyScreenTwo = () => {
    setCurrentChildComponent(
      <AddPropertyScreenTwo onClick={openAddPropertyScreenThree} />
    );
    setShowModal(true);
  };
  
  const openAddPropertyScreenThree = () => {
    setCurrentChildComponent(
      <AddPropertyScreenThree onClick={openAddPropertyScreenFour} />
    );
    setShowModal(true);
  };
  
  const openAddPropertyScreenFour = () => {
    setCurrentChildComponent(<AddPropertyScreenFour onClick={toggleModal} />);
    setShowModal(true);
  };

<<<<<<< HEAD
    const openAddPropertyScreenOne =()=> {
        setCurrentChildComponent (<AddPropertyScreenOne onClick={openAddPropertyScreenTwo}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenTwo =()=> {
        setCurrentChildComponent (<AddPropertyScreenTwo onClick={openAddPropertyScreenThree}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenThree =()=> {
        setCurrentChildComponent (<AddPropertyScreenThree onClick={openAddPropertyScreenFour}  />)
        setShowModal(true);
    }
    const openAddPropertyScreenFour =()=> {
        setCurrentChildComponent (<AddPropertyScreenFour onClick={toggleModal}  />)
        setShowModal(true);
    }
    
    const [getProperty, setGetProperty] = useState([]);
    const [page, setPage] = useState<number>(1)
    const [inputValue, setInputValue] = useState<string | number>('');
=======
  const [getProperty, setGetProperty] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState();
>>>>>>> 11fce3048c3a19c41cee10867ea295a45c6bed75

  useEffect(() => {
    axios
      .get("/api/property/:id")
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/property?keyword=for&PageNumber={page}")
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [page]);

  const properties = [
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 1,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
  ];

  return (
    <>
      <Modal onClose={toggleModal} isVisible={showModal}>
        {currentChildComponent}
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
            onClick={openAddPropertyScreenOne}
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
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: "24px", lg: "28px" }}
        >
          {properties.map((property) => {
            return (
              <PropertyCard
                key={property?.id}
                image={property?.image}
                title={property?.title}
                pricing={property?.pricing}
                location={property?.location}
                userImage={property?.userImage}
                email={property?.email}
                user={property?.user}
                count={page}
              />
            );
          })}
        </Grid>
      </Box>
  
    </>
  );
};
