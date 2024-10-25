import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface ButtonFunction {
  next: () => void;
  previous: () => void;
  onChangeFileName: (event: ChangeEvent<HTMLSelectElement>) => void;
  fileName: string;
}

export const AddPropertyScreenFour = ({
  next,
  previous,
  fileName,
  onChangeFileName,
}: ButtonFunction) => {
  const subs: any[] = [
    {
      id: 1,
      count: <FaCheck />,
      title: "Property Title & Category",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 2,
      count: <FaCheck />,
      title: "Location & Pricing",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 3,
      count: "3",
      title: "Images",
      bg: "#1FC16B",
      text: "#FFF",
    },
    {
      id: 4,
      count: "4",
      title: "Documents",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
  ];

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", (e: any) => {
      const file = e.target.files[0];
      console.log(file);
    });
  };

  return (
    <>
      <Box w={"100%"} px={"20px"} className="inter">
        <Flex w={"100%"} justifyContent={"space-between"}>
          {subs.map((sub) => (
            <Flex
              key={sub?.id}
              my={"24px"}
              w={"fit-content"}
              alignItems={"center"}
              gap={{ base: "12px", md: "16px" }}
              className="inter"
            >
              <Flex alignItems={"center"} gap={"8px"}>
                <Flex
                  w={"20px"}
                  h={"20px"}
                  border={"1px solid var(--soft200)"}
                  borderRadius={"100%"}
                  bg={`${sub?.bg}`}
                  alignItems={"center"}
                  justifyContent={"center"}
                  textColor={`${sub?.text}`}
                  fontSize={"14px"}
                  fontWeight={400}
                >
                  {sub?.count}
                </Flex>
                <Text
                  fontWeight={400}
                  textColor={"var(--strong950)"}
                  fontSize={"14px"}
                >
                  {sub?.title}
                </Text>
              </Flex>
              <IoIosArrowForward className="arrow" />
            </Flex>
          ))}
        </Flex>
        <Flex flexDir={"column"} gap={"16px"} w="100%" py={"20px"}>
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
              FAMILY RECEIPT
            </Text>
          </Flex>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property document
            </FormLabel>
            <Select
              fontSize={"12px"}
              fontWeight={500}
              textColor={"var(--soft600)"}
              bg={"var(--weak50)"}
              w={"100%"}
              alignItems={"center"}
              border={"none"}
              py={"6px"}
              className="robotoF"
              borderRadius={"2px"}
              _placeholder={{ textColor: "var--(soft400)" }}
              placeholder="File name"
              value={fileName}
              onChange={onChangeFileName}
            >
              {[
                { val: "FamilyReceipt", name: "Family receipt" },
                { val: "SurveyPlan", name: "Survey plan" },
                { val: "Layout", name: "Layout" },
                { val: "Affidavit", name: "Affidavit" },
                { val: "Agreement", name: "Agreement" },
                { val: "CofO", name: "C of O" },
                { val: "PowerOfAttorney", name: "Power of attorney" },
                { val: "GovConsent", name: "Gov Consent" },
              ].map((entry) => (
                <option value={`${entry.val}`} key={entry.val}>
                  {entry.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Flex w={"100%"} p={"8px"} gap={"20px"}>
            <Box
              borderRadius={"100%"}
              overflow={"hidden"}
              w={"64px"}
              h={"64px"}
            >
              <Image w={"100%"} h={"100%"} src="" alt="/" />
            </Box>
            <Box className="inter" fontWeight={500}>
              <Text fontSize={"16px"} textColor={"var(--strong950)"}>
                Upload Documents
              </Text>
              <Text
                fontSize={"14px"}
                textColor={"var(--sub600)"}
                fontWeight={400}
              >
                Min 400x400px, PNG or PDF
              </Text>
            </Box>
          </Flex>

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
              SURVEY PLAN
            </Text>
          </Flex>
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
              C OF O
            </Text>
          </Flex>
        </Flex>
        <Flex gap={"2rem"}>
          <Btn
            onClick={previous}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
          >
            Previous
          </Btn>
          <Btn
            onClick={next}
            my={"20px"}
            border={"1px solid var(--primaryBase)"}
            display={"flex"}
            alignItems={"center"}
            w={"100%"}
            h={"40px"}
            bg={"#FFFFFF"}
            borderRadius={"10px"}
            textColor={"var(--primaryBase)"}
          >
            Completed
          </Btn>
        </Flex>
        {/* <Btn
          onClick={handleUpload}
          my={"20px"}
          border={"1px solid var(--primaryBase)"}
          display={"flex"}
          alignItems={"center"}
          w={"100%"}
          h={"40px"}
          bg={"#FFFFFF"}
          borderRadius={"10px"}
          textColor={"var(--primaryBase)"}
        >
          Completed
        </Btn> */}
      </Box>
    </>
  );
};
