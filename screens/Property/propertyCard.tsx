import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Btn from "@/components/Btn";

type PropertyCardProps = {
  image?: any;
  count?: number;
  title?: string;
  pricing?: string;
  location?: string;
  email?: string;
  user?: string;
  userImage?: string;
};

export const PropertyCard = ({
  image,
  title,
  count,
  pricing,
  location,
  email,
  user,
  userImage,
}: PropertyCardProps) => {
  return (
    <Box
      className="RobotoF"
      bg={"#FFF"}
      w={{ base: "100%", sm: "314px" }}
      h={"408px"}
      pb={"16px"}
      boxShadow={"lg"}
      borderRadius={"15px"}
      overflow={"hidden"}
    >
      <Flex position={"relative"} w="100%" h="55%">
        <Text
          className="montserrat"
          position={"absolute"}
          m={4}
          fontSize={"18px"}
          fontWeight={700}
          textColor={"#FFF"}
        >
          {count || null} of 3
        </Text>
        <Image
          width={1000}
          height={1000}
          layout="responsive"
          src={`${image}`}
          alt={"property"}
        />
        {/* <Img
                    width={'340px'}
                    src={`${image}`}
                    alt="property"
                /> */}
      </Flex>
      <Flex
        className=""
        flexDir={"column"}
        gap={"8px"}
        px={"16px"}
        w={"100%"}
        mt={"8px"}
      >
        <Flex
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          textColor={"#000"}
        >
          <Text fontSize={{ base: "16px", lg: "18px" }} fontWeight={600}>
            {title}
          </Text>
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={500}
          >
            <TbCurrencyNaira />
            {pricing}
          </Text>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={"4px"}
          textColor={"#626871"}
          fontWeight={400}
          fontSize={"14px"}
        >
          <HiOutlineLocationMarker />
          <Text
            fontSize={{ base: "12px", lg: "14px" }}
            width={"100%"}
            isTruncated
          >
            {location}
          </Text>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"4px"}
          textColor={"#626871"}
          fontSize={"14px"}
        >
          <Flex h={"18px"} gap={"8px"} alignItems={"center"}>
            <Box w={"18px"} h={"18px"} borderRadius={"100px"} overflow={"clip"}>
              <Image width={18} height={18} src={`${userImage}`} alt="/" />
            </Box>
            <Text fontWeight={300} fontSize={{ base: "12px", lg: "14px" }}>
              {user}
            </Text>
          </Flex>
          <Box w={"1px"} h={"17px"} bg={"#DDE0E5"} />
          <Text fontWeight={200} fontSize={{ base: "12px", lg: "14px" }}>
            {email}
          </Text>
        </Flex>
        <Box w={"100%"} h={"1.5px"} bg={"#DDE0E5"} />
        <Btn
          m="1px"
          bg={"#fff"}
          textColor={"#000"}
          fontSize={"15px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          w="100%"
          h="44px"
          border={"1px solid #000"}
          borderRadius={"6px"}
        >
          Verify
        </Btn>
      </Flex>
    </Box>
  );
};
