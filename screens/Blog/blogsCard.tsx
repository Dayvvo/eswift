import { Box, Flex, Img, Text } from "@chakra-ui/react";
import Image from "next/image";
import moment from "moment";
import DOMPurify from "dompurify";

type BlogCardProps = {
  picture?: string;
  title?: string;
  date?: string;
  details?: string;
};

export const BlogCard = ({ picture, title, date, details }: BlogCardProps) => {
  return (
    <>
      <Box
        className="roboto"
        bg={"#FFF"}
        maxW={"312px"}
        h={"600px"}
        boxShadow={"lg"}
        pb={"1px"}
        overflow={"hidden"}
      >
        <Flex position={"relative"} w="100%" h="388px" mb={"40px"}>
          <Image
            width={1000}
            height={1000}
            layout="responsive"
            src={`${picture}` || "/blogdumy.png"}
            alt={"project"}
          />
          {/* <Img src={picture} alt={title} w="100%" /> */}
        </Flex>
        <Flex
          className="roboto"
          flexDir={"column"}
          gap={"10px"}
          w={"100%"}
          mb={"20px"}
        >
          <Text
            display={"flex"}
            alignItems={"center"}
            fontSize={{ base: "14px", lg: "14px" }}
            fontWeight={500}
            textColor={"#848484"}
          >
            {moment(date).format("DD.MM.YYYY")}
          </Text>
          <Text
            fontSize={{ base: "16px", lg: "22px" }}
            fontWeight={300}
            textColor={"#1A1D66"}
          >
            {title}
          </Text>
          <Text
            fontSize={"14px"}
            fontWeight={300}
            textColor={"#3A3148"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(details as string),
            }}
          />
          {/* <Text
            fontSize={"14px"}
            fontWeight={300}
            textColor={"#3A3148"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {details}
          </Text> */}
        </Flex>
      </Box>
    </>
  );
};
