import Btn from "../../components/Btn";
import React, { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { IoIosArrowForward } from "react-icons/io";
import useToast from "@/hooks/useToast";
import { BsPlus } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

interface AddPropertyScreenOneProps {
  onClick: () => void;
  title: string;
  category: string;
  description: string;
  // onChangeType: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
  invalidCategory: boolean | null;
  invalidTitle: boolean | null;
  invalidType: boolean | null;
  invalidDescription: boolean | null;
  validCategory: boolean;
  validTitle: boolean;
  // validType: boolean;
  validDescription: boolean;
  onBlurTitle: any;
  // onBlurType: any;
  onBlurCategory: any;
  onBlurDescription: any;
  Features:(features:string[])=> void;
}
export const AddPropertyScreenOne = ({
  onClick,
  title,
  onChangeTitle,
  category,
  onChangeCategory,
  // onChangeType,
  description,
  invalidCategory,
  invalidTitle,
  invalidDescription,
  validCategory,
  validTitle,
  validDescription,
  onBlurTitle,
  onBlurDescription,
  onBlurCategory,
  invalidType,
  onChangeDescription,
  Features
  
}: AddPropertyScreenOneProps) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState<string>('');
  const [features ,setFeatures] = useState<string[]>([]);
  const subs: any[] = [
    {
      id: 1,
      title: "Property Title & Category",
      bg: "var(--primaryBase)",
      text: "#FFF",
    },
    {
      id: 2,
      title: "Location & Pricing",
      bg: "#FFF",
      text: "var(--sub600)",
    },
    {
      id: 3,
      title: "Images",
      bg: "#FFF",
      text: "var(--sub600)",
    },
    {
      id: 4,
      title: "Documents",
      bg: "#FFF",
      text: "var(--sub600)",
    },
  ];

  const validate = () => {
    if (!validTitle) {
      onBlurTitle();
      return false;
    } else if (!validCategory) {
      onBlurCategory();
      return false;
    } else if (!validDescription) {
      onBlurDescription();
      return false;
    }
    else if (!features){
      return false;
    }
    return true;
  };

  const nextFn = () => {
    const isFormValid = validate();

    if (!isFormValid) {
      toast({
        status: "error",
        description: "Validation failed",
        title: "Failed",
        position: "top",
        duration: 1500,
      });
      return;
    }
    onClick();
  };

  const handleAddTag = () => {
    const newFeatures:string = inputValue.trim();
    if(newFeatures && !features.includes(newFeatures)){
      setFeatures([...features, newFeatures])
      setInputValue('')
    }
  };

  const handleRemoveTag =(index: number)=> {
    setFeatures(features.filter((features, i) => i !== index));
  }

  const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  
  const handleTagInput =(e:any)=> {
    setInputValue(e.target.value)
  }

  useEffect(()=> {
    Features(features)
  },[features, Features])

  

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
                  {sub?.id}
                </Flex>
                <Text
                  fontWeight={400}
                  textColor={"var(--strong950)"}
                  fontSize={"12px"}
                >
                  {sub?.title}
                </Text>
              </Flex>
              <IoIosArrowForward className="arrow" />
            </Flex>
          ))}
        </Flex>
        <Flex flexDir={"column"} gap={"16px"} w="100%" py={"20px"}>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property Title
            </FormLabel>
            <InputGroup
              border={"1px"}
              borderRadius={"10px"}
              borderColor={"var(--soft200)"}
              cursor={"text"}
              fontSize={14}
              textColor={"var--(sub600)"}
              w="100%"
              h="40px"
              _placeholder={{ textColor: "var--(soft400)" }}
            >
              <Input
                w={"100%"}
                h={"100%"}
                border={invalidTitle ? "1px solid var(--errorBase)" : ""}
                type="text"
                placeholder="A descriptive name for the property"
                name="title"
                value={title}
                onBlur={onBlurTitle}
                onChange={onChangeTitle}
              />
            </InputGroup>
            {invalidTitle && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Enter a valid property title"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Property type
            </FormLabel>
            <Select
              w="100%"
              h="40px"
              border={
                invalidType
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              borderRadius={"10px"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              placeholder="Type of property"
              onBlur={onBlurCategory}
              value={category}
              onChange={onChangeCategory}
            >
              {["Land", "House"].map((entry) => (
                <option value={`${entry}`} key={entry}>
                  {entry}
                </option>
              ))}
            </Select>
            {invalidType && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Select valid property type"}
              </FormHelperText>
            )}
          </FormControl>

          {/* {typeOfProperty && (
            <FormControl w={"100%"}>
              <FormLabel
                fontWeight={500}
                fontSize={"14px"}
                textColor={"var(--strong950)"}
              >
                Property category
              </FormLabel>
              <Select
                w="100%"
                h="40px"
                border={
                  invalidCategory
                    ? "1px solid var(--errorBase)"
                    : "1px solid var(--soft200)"
                }
                borderRadius={"10px"}
                fontSize={14}
                textColor={"var--(sub600)"}
                _placeholder={{ textColor: "var--(soft400)" }}
                placeholder="Category of the property"
                value={category}
                onBlur={onBlurCategory}
                onChange={onChangeCategory}
              >
                {typeOfProperty === "House" &&
                  ["Bungalo", "Duplex", "Self contain"].map((entry) => (
                    <option value={`${entry}`} key={entry}>
                      {entry}
                    </option>
                  ))}
                {typeOfProperty === "Land" &&
                  ["100 X 100", "100 X 150", "200 X 200"].map((entry) => (
                    <option value={`${entry}`} key={entry}>
                      {entry}
                    </option>
                  ))}
              </Select>
              {invalidCategory && (
                <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                  {"Select type of property"}
                </FormHelperText>
              )}
            </FormControl>
          )} */}

          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
              Description
            </FormLabel>
            <Textarea
              border={
                invalidDescription
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              borderRadius={"10px"}
              cursor={"text"}
              fontSize={14}
              textColor={"var--(sub600)"}
              _placeholder={{ textColor: "var--(soft400)" }}
              value={description}
              onBlur={onBlurDescription}
              onChange={onChangeDescription}
            />
            {invalidDescription && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"Description must be at least 10 characters long"}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w={"100%"}>
            <FormLabel
              fontWeight={500}
              fontSize={"14px"}
              textColor={"var(--strong950)"}
            >
                Features
            </FormLabel>
            <Flex w={'100%'}  h={'fit-content'}
              alignItems={'center'} justifyContent={'space-between'}
              border={
                invalidType
                  ? "1px solid var(--errorBase)"
                  : "1px solid var(--soft200)"
              }
              gap={'8px'}
              borderRadius={'10px'}
            >
              <Flex
                gap={'8px'} w={'100%'}
                h={'fit-content'}
                flexDir={'column'}
                alignItems={'start'}
              >
                <InputGroup
                  cursor={"text"}
                  fontSize={14}
                  textColor={"var--(sub600)"}
                  h={'40px'}
                >
                    <Input
                      type={'text'}
                      height={'100%'}
                      _placeholder={{ textColor: "var--(soft400)" }}
                      border={'1px solid transparent'}
                      borderRadius={'4px'}
                      value={inputValue}
                      onChange={handleTagInput}
                      onKeyDown={handleKeyPress}
                    />
                </InputGroup>
              </Flex>
              <Flex w={'24px'} h={'24px'} fontSize={'36px'} px={'4px'}
                borderRadius={'10'} justifyContent={'center'} alignItems={'center'}
                onClick={handleAddTag}
              >
                <BsPlus/>
              </Flex>
            </Flex>
            <Flex flexWrap={'wrap'} gap={'8px'} mt={'2px'}>
              { 
                features.map((feature,index)=>(
                  <Flex gap="8px" key={index} alignItems={'center'} fontSize={'14px'}
                    bg={'var(--soft200)'} px={'8px'} py={'2px'} borderRadius={'10px'}
                  >
                    {feature} 
                    <Flex onClick={()=> handleRemoveTag(index)} fontSize={'14px'}>
                      <IoCloseOutline />
                    </Flex>
                  </Flex>
                ))
              }
            </Flex>
            {invalidDescription && (
              <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
                {"No Feature listed"}
              </FormHelperText>
            )}
          </FormControl>
        </Flex>
        <Btn
          onClick={nextFn}
          my={"20px"}
          border={"1px solid var(--primaryBase)"}
          display={"flex"}
          alignItems={"center"}
          w={"100%"}
          h={"40px"}
          bg={"#FFFFFF"}
          borderRadius={"10px"}
          textColor={"var(--primaryBase)"}
          _hover={{
            bg: "#1A1D66",
            textColor: "#FFF",
          }}
        >
          Next
        </Btn>
      </Box>
    </>
  );
};
