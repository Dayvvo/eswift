"use client";
import React from "react";
import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  // Grid,
  // GridItem,
  // SimpleGrid,
  Text,
  Image,
  // Heading,
} from "@chakra-ui/react";
// import { BsDot } from "react-icons/bs";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { FaRegImages } from "react-icons/fa";
import useProperty from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import {  PropertyCardProps } from "../Property/propertyCard";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";
import {  ZigiZagaIcon } from "../../components/svg";

export const PropertyDetails = ({ clientView }: { clientView?: boolean }) => {
  const Images: string[] = [
    "/Grid-1.png",
    "/Grid-2.png",
    "/Grid-1.png",
    "/Grid-2.png",
    "/Grid-1.png",
    "/Grid-2.png",
    "/Grid-1.png",
    "/Grid-2.png",
    "/Grid-1.png",
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const Features: any[] = [
    {
      id: 1,
      key: "Spacious living area with ample natural light",
    },
    {
      id: 2,
      key: "Modern kitchen with stainless steel appliances",
    },
    {
      id: 3,
      key: "3 generously sized bedrooms",
    },
    {
      id: 4,
      key: "2 well-appointed bathrooms.",
    },
    {
      id: 5,
      key: "Spacious living area with ample natural light",
    },
    {
      id: 6,
      key: "Spacious living area with ample natural light",
    },
  ];
  const Documents: any[] = [
    {
      id: 1,
      doc: "/",
    },
    {
      id: 2,
      doc: "/",
    },
    {
      id: 3,
      doc: "/",
    },
    {
      id: 4,
      doc: "/",
    },
    {
      id: 5,
      doc: "/",
    },
  ];
  const properties: any[] = [
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
      id: 2,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
    {
      id: 3,
      title: "3 bedroom flat",
      pricing: "2,000,000",
      location: "12, Osinowo estate Gbagada, Lagos, Nigeria",
      email: "Dominic@gmail.com",
      user: "Miss Dominic Tromp",
      userImage: "/userImage.png",
      image: "/prop-img.png",
    },
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const { globalContext } = useAppContext();

  const { user } = globalContext;

  const [detailsData, setDetailsData] = useState<PropertyCardProps | null>(null);

  const { getPropertyDetails } = useProperty();

  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      (async () => {
        try {
          const request = await getPropertyDetails(query?.id as string);
          const data = request.data as R;
          setDetailsData(data?.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isReady]);

  // console.log('property details', query?.id );

  const isAdmin = user?.role === "Admin";

  return (
    <Box bg={"#FFF"} w={clientView ? "80%" : "100%"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={"16px"}>
          <Text
            className="urbanist"
            fontWeight="600"
            fontSize="40px"
            whiteSpace="nowrap"
          >
            {detailsData?.title}
          </Text>
          {/* <Flex
            w={"100%"}
            h={"37px"}
            alignItems={"center"}
            px={"8px"}
            borderRadius={"6px"}
            border={"1px solid #262626"}
            gap={"4px"}
            textColor={"black"}
            fontSize={"14px"}
            className="urbanist"
            fontWeight={500}
          >
            <MdLocationOn />
            <Text
              fontSize="14px"
              maxW={"90%"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              className="urbanist"
              whiteSpace={"nowrap"}
            >
              {detailsData?.address}
            </Text>
          </Flex>
      */}
        </Flex>
      </Flex>
      <Flex
        gap="15px"
        overflow="auto"
        wrap="nowrap"
        justifyContent={"center"}
        bgColor={"#E2EDF3"}
        mt={"20px"}
        border={"1px solid #262626"}
        padding="10px"
        borderRadius={"12px"}
        css={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
          },
        }}
      >
        {detailsData?.images.map((image, index) => (
          <Box
            key={index}
            h="74px"
            borderRadius="6px"
            cursor="pointer"
            flexShrink="0"
            width="122.22px"
            onClick={() => handleImageClick(index)}
          >
            <Image
              h="100%"
              w="100%"
              src={image}
              alt=""
              borderRadius="6px"
              objectFit="cover"
              border={
                index === selectedImageIndex ? "2px solid #335CFF" : "none"
              }
            />
          </Box>
        ))}
      </Flex>

      {
        <Box
          border="1px solid #262626"
          borderRadius={"12px"}
          padding={"40px"}
          mt="24px"
          display={"flex"}
          gap={"10px"}
        >
          <Box w={"585px"} h={"507px"}>
            <Image
              w={"100%"}
              h={"100%"}
              src={detailsData?.images[selectedImageIndex]}
              alt={``}
              borderRadius={"10px"}
            />
          </Box>
          <Box w={"585px"} h={"507px"}>
            <Image
              w={"100%"}
              h={"100%"}
              src={
                selectedImageIndex - 1 >= 0
                  ? detailsData?.images[selectedImageIndex - 1]
                  : detailsData?.images[selectedImageIndex + 1]
              }
              alt={``}
              borderRadius={"10px"}
            />
          </Box>
        </Box>
      }
      <Flex gap={"16px"} mt={"16px"}>
        <Box
          display={"flex"}
          flexDir={"column"}
          borderRadius={"10px"}
          border="1px solid #262626"
          padding={"40px"}
          w="630px"
          h={"514px"}
        >

          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Property Type
            </Text>
            <Text
              mt={"6px"}
              color="#999999"
              className="robotoF"
              fontWeight={"500"}
              fontSize={"16px"}
            >
              {detailsData?.category}
            </Text>
          </Box>

          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Description
            </Text>
            <Text
              mt={"6px"}
              color="#999999"
              className="robotoF"
              fontWeight={"500"}
              fontSize={"16px"}
            >
              {detailsData?.description}
            </Text>
          </Box>

          <Box flex={"1"}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Location
            </Text>
            <Flex>
              <MdLocationOn />
              <Text
                fontSize="14px"
                maxW={"90%"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                className="urbanist"
                whiteSpace={"nowrap"}
              >
                {detailsData?.address}
              </Text>
            </Flex>
          </Box>

          <Box flex={'1'}>
            <Text
              as={"h2"}
              fontWeight={"600"}
              fontSize={"20px"}
              className="robotoF"
              color={"#000"}
            >
              Price
            </Text>

            <Text
              className="urbanist"
              fontSize={"20px"}
              fontWeight={600}
              color={"#000"}
            >
              {detailsData?.price?.amount}
            </Text>
          </Box>
          

          {/* <Flex
            borderTop={"1px solid #262626"}
            justifyContent={"space-between"}
            pt={"10px"}
          >
            <Box>
              <Flex gap={"8px"}>
                <BedroomsIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Bedrooms
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                04
              </Text>
            </Box>
            <Box borderLeft={"1px solid #262626"} pl={"16px"}>
              <Flex gap={"8px"}>
                <BathroomsIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Bethrooms
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                03
              </Text>
            </Box>
            <Box borderLeft={"1px solid #262626"} pl={"16px"}>
              <Flex gap={"8px"}>
                <AreaIcon />
                <Text
                  color={"#999999"}
                  className="robotoF"
                  fontSize="14px"
                  fontWeight="500"
                >
                  Areas
                </Text>
              </Flex>
              <Text
                color={"#000"}
                className="robotoF"
                fontSize="20px"
                fontWeight="600"
              >
                2,500 Square Feet
              </Text>
            </Box>
          </Flex> */}
          <Flex gap={"8px"} mt={"20px"}>
            <Btn
              border="1px solid #335CFF"
              borderRadius={"10px"}
              padding={"10px"}
              color="#335CFF"
              bgColor="transparent"
              className="robotoF"
              w="100%"
            >
              Contact
            </Btn>
            <Btn
              border="1px solid #FB3748"
              borderRadius={"10px"}
              padding={"10px"}
              color="#FB3748"
              className="robotoF"
              bgColor="transparent"
              w="100%"
            >
              Add to favourite
            </Btn>
          </Flex>
 
        </Box>
        <Box
          borderRadius={"10px"}
          border="1px solid #262626"
          padding={"40px"}
          w="630px"
        >
          <Text
            fontWeight={"600"}
            fontSize={"20px"}
            className="robotoF"
            color={"#000"}
          >
            Key Features and Amenities
          </Text>
          <Box display={"flex"} gap="14px" flexDir="column" mt={"10px"}>
            {detailsData?.features?.map((feature: string, index: number) => {
              return (
                <Box
                  bgGradient="linear(to-r, #E2EDF3, #FFFFFF00)"
                  p={"14px 16px"}
                  display={"flex"}
                  gap={"10px"}
                  key={index}
                  borderLeft="1px solid #703BF7"
                >
                  <ZigiZagaIcon />
                  <Text
                    fontSize={"16px"}
                    color={"#000"}
                    fontWeight={500}
                    className="robotoF"
                  >
                    {feature}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Flex>
      {/* <Flex flexDir={"column"} w={"100%"} p={"20px"} gap={"24px"}>
        <Flex flexDir={"column"} w={"100%"} gap={"18px"} className="roboto">
          <Flex w="100%" justify={"space-between"}>
            <Flex fontSize={{ base: "20px", lg: "28px" }}>
              <HiOutlineLocationMarker />
              <Text>{detailsData?.address}</Text>
            </Flex>

            <Btn
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#3170A6"}
              borderRadius={"6px"}
              px="2em"
              h={"48px"}
              textColor={"#FFF"}
              fontWeight={500}
              className="roboto"
              fontSize={"16px"}
            >
              Contact us
            </Btn>
          </Flex>

          <Text
            textColor={"#626871"}
            fontWeight={400}
            fontSize={"18px"}
            className="roboto"
          >
            {detailsData?.description}
          </Text>
          <Box fontSize={"18px"} fontWeight={300} textColor={"#626871"}>
            <Text>Key Features</Text>
            {detailsData?.features.map((feature: string, key: number) => {
              return (
                <Flex key={feature + key} alignItems={"center"} gap={"4px"}>
                  <BsDot />
                  <Text>{feature}</Text>
                </Flex>
              );
            })}
          </Box>
          {isAdmin ? (
            <Flex
              bg={"var(--weak50)"}
              w={"100%"}
              alignItems={"center"}
              px={"20px"}
              py={"6px"}
              className="robotoF"
            >
              <Text
                fontSize={"12px"}
                fontWeight={500}
                textColor={"var(--soft400)"}
              >
                DOCUMENTS
              </Text>
            </Flex>
          ) : null}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {Documents.map((document) => {
              return (
                <Flex
                  key={document?.id}
                  alignItems={"center"}
                  position={"relative"}
                  borderRadius={"8.5px"}
                  border={"0.71px solid var(--soft200)"}
                  px={"10px"}
                  w={"100%"}
                  h={"52px"}
                >
                  <Btn
                    pos={"absolute"}
                    bg={"transparent"}
                    display={"flex"}
                    w={"38px"}
                    h={"24px"}
                    alignItems={"center"}
                    borderRadius={"6px"}
                    border={"0.71px solid var(--soft200)"}
                    className="inter"
                    textColor={"var(--sub600)"}
                    fontSize={"10px"}
                    fontWeight={500}
                    insetEnd={4}
                  >
                    View
                  </Btn>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Flex>

        {isAdmin ? (
          <Flex
            flexDir={"column"}
            w={{ base: "100%", lg: "20%" }}
            gap={"16px"}
            className="robotoF"
          >
            <Btn
              bg={"transparent"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              border="1px solid var(--primaryBase)"
              borderRadius={"10px"}
              h={"40px"}
              textColor={"var(--primaryBase)"}
            >
              Resume
            </Btn>
            <Btn
              bg={"transparent"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w="100%"
              border="1px solid var(--errorBase)"
              borderRadius={"10px"}
              h={"40px"}
              textColor={"var(--errorBase)"}
            >
              Delete
            </Btn>
            <Flex
              bg={"var(--weak50)"}
              w={"100%"}
              alignItems={"center"}
              px={"20px"}
              py={"6px"}
              className="robotoF"
            >
              <Text
                fontSize={"12px"}
                fontWeight={500}
                textColor={"var(--soft400)"}
              >
                USER
              </Text>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={"16px"}
              w={"100%"}
              p={"20px"}
              className="robotoF"
            >
              <Flex alignItems={"center"} gap={4}>
                <Box
                  overflow={"hidden"}
                  borderRadius={"100%"}
                  h={"40px"}
                  w={"42px"}
                >
                  <Image width={42} height={40} src={"/profile.png"} alt="" />
                </Box>
                <Text fontWeight={500} fontSize={"18px"}>
                  John Doe
                </Text>
              </Flex>
              <Box textColor={"#626871"} fontWeight={500}>
                <Text mb={"4px"} textColor={"var(--soft400)"} fontSize={"12px"}>
                  EMAIL
                </Text>
                <Text fontSize={"14px"}>Johndoe@gmail.com</Text>
              </Box>
              <Flex w={"100%"} gap={"28px"}>
                <Box textColor={"#626871"} fontWeight={500}>
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    PHONE NO.
                  </Text>
                  <Text fontSize={"14px"}>08123456786</Text>
                </Box>
                <Box textColor={"#626871"} fontWeight={500}>
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    USER TYPE
                  </Text>
                  <Text fontSize={"14px"}>Affiliate</Text>
                </Box>
              </Flex>
              <Box textColor={"#626871"} fontWeight={500}>
                <Text mb={"4px"} textColor={"var(--soft400)"} fontSize={"12px"}>
                  PROPERTY
                </Text>
                <Text fontSize={"14px"}>2</Text>
              </Box>
            </Flex>
          </Flex>
        ) : null}
      </Flex> */}
      {/* 
      {isAdmin ? (
        <Flex
          w={"100%"}
          justifyContent={"center"}
          gap={{ base: "24px", lg: "28px" }}
          flexWrap={"wrap"}
          mt={{ base: "60px", lg: "120px" }}
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
              />
            );
          })}
        </Flex>
      ) : null} */}
    </Box>
  );
};
