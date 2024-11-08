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
import Btn, { PaginationButton } from "@/components/Btn";
import { IoFilter } from "react-icons/io5";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { BsPlus } from "react-icons/bs";
import { PlusIcon, SearchIcon } from "../../components/svg";

import useProperty from "@/hooks/useProperty";
import { useImage, useInputText } from "../../hooks/useInput";
import { useApiUrl } from "../../hooks/useApi";
import useToast from "../../hooks/useToast";
import { AddPropertyScreenOne } from "./AddPropertyScreenOne";
import { AddPropertyScreenTwo } from "./AddPropertyScreenTwo";
import { AddPropertyScreenThree } from "./AddPropertyScreenThree";
import { AddPropertyScreenFour } from "./AddPropertyScreenFour";
import {
  DoubleNextBtn,
  DoublePrevBtn,
  NextBtn,
  PreviousBtn,
} from "@/components/svg";
import { PropertyCard, PropertyCardProps } from "./propertyCard";
import { DocumentTypes, R } from "@/utils/types";
import useUpload from "@/hooks/useUpload";

// interface MyData {
//   _id: any;
//   title: string;
//   price: string;
//   address: string;
//   email: string;
//   owner: string;
//   userImage: string;
//   verificationState: string;
//   images: any;
//   creatorID: any;
// }

interface User {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  avatar: any;
}

export type Documents = {
  [K in DocumentTypes]: File | null;
};

export const PropertyScreen = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [getProperty, setGetProperty] = useState<PropertyCardProps[]>([]);
  const [page, setPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [inputValue, setInputValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [showScreen, setShowScreen] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const [documents, setDocuments] = useState<Documents>({
    FamilyReceipt: null,
    SurveyPlan: null,
    Layout: null,
    Affidavit: null,
    Agreement: null,
    CofO: null,
    PowerOfAttorney: null,
    GovConsent: null,
  });

  const handleDocumentChange = (name: string, value: File) => {
    if (value) {
      setDocuments((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const {
    input: title,
    onChangeInput: onChangeTitle,
    onBlurHandler: onBlurTitle,
    valueIsInvalid: invalidTitle,
    valueIsValid: validTitle,
    reset: titleReset,
  } = useInputText((title) => title.length > 2);

  const {
    input: category,
    onChangeInput: onChangeCategory,
    onBlurHandler: onBlurCategory,
    valueIsInvalid: invlidCategory,
    valueIsValid: validCategory,
    reset: categoryReset,
  } = useInputText((category) => category !== "");

  const {
    input: description,
    onChangeInput: onChangeDescription,
    onBlurHandler: onBlurDescription,
    valueIsInvalid: invalidDescription,
    valueIsValid: validDescription,
    reset: descriptionReset,
  } = useInputText((description) => description.length > 8);

  const {
    input: address,
    onChangeInput: onChangeAddress,
    onBlurHandler: onBlurAddress,
    valueIsInvalid: invalidAddress,
    valueIsValid: validAddress,
    reset: addressReset,
  } = useInputText((address) => address.length > 3);

  const {
    input: typeOfProperty,
    onChangeInput: onChangeType,
    onBlurHandler: onBlurType,
    valueIsInvalid: invlidType,
    valueIsValid: validType,
    reset: typeReset,
  } = useInputText((typeOfProperty) => typeOfProperty !== "");

  const {
    input: duration,
    onChangeInput: onChangeDuration,
    onBlurHandler: onBlurDuration,
    valueIsInvalid: invalidDuration,
    valueIsValid: validDuration,
    reset: durationReset,
  } = useInputText((duration) => duration !== "");

  const {
    input: fileName,
    onChangeInput: onChangeFileName,
    onBlurHandler: onBlurFilename,
    valueIsInvalid: invalidFilename,
    valueIsValid: validFilename,
    reset: fileNameReset,
  } = useInputText((fileName) => fileName !== "");

  const {
    input: price,
    onChangeInput: onChangePrice,
    onBlurHandler: onBlurPrice,
    valueIsInvalid: invalidPrice,
    valueIsValid: validPrice,
    reset: priceReset,
  } = useInputText((price) => price !== "");

  const {
    images,
    onChangeHandler: onChangeImage,
    error: imageError,
    deleteImage,
    reset: imageReset,
  } = useImage();

  const { toast } = useToast();

  const client = useApiUrl();

  const { addProperty, getAdminProperty } = useProperty();

  const { uploadSingle, uploadMultiple } = useUpload();

  const propertyData = {
    title,
    address,
    price,
    category,
    description,
    features:[],
    images,
    documents,
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const resetFields = ()=>{
    titleReset();
    // categoryReset();
    descriptionReset();
    durationReset();
    imageReset();
    fileNameReset();
    priceReset();
    typeReset();
    addressReset();
    setShowScreen(1);

  };

  const uploadPropertyFiles = async(images:File[], documents: Documents)=>{
    try{

      const imagesFormData = new FormData();   
      
      images.map(img=>imagesFormData.append( images?.length > 1? 'files': 'file', img));

      const {data:uploadImages} =  images?.length >1 ? await uploadMultiple(imagesFormData): await uploadSingle(imagesFormData);
      
      const uploadedDocuments = Object.keys(documents).filter(val=> documents[val as validDocs] );
      
      let documentPayload: R[] = [];

      type validDocs = keyof typeof documents;

      for (const key in uploadedDocuments) {
          let keyVal = uploadedDocuments[key];

          const singleFormData = new FormData();

          const matchingFile = documents[keyVal as validDocs];

          const {data:uploadImg} = await uploadSingle(singleFormData);

          if(uploadImg){
            documentPayload.push({
              type: keyVal,
              document: uploadImg?.data
            })
          }
      }


      return {
        images: uploadImages?.data,
        documents: documentPayload
      }
      
    }
    catch(err){
      console.log('err',err)
    }
  }

  const addPropertyFn = async () => {
    const { documents,price,images,...rest } = propertyData;

    try {
      const uploadedFiles = await uploadPropertyFiles(images, documents) || {
        images:[],
        documents:[]
      };

          
      const payload = {
        ...rest,
        price:{
          mode:'one_off',
          amount: price
        },
        features:[],
        ...uploadedFiles
      };
      
      uploadedFiles &&  await addProperty(payload); // If no error occurs, the following code runs

      setShowModal(false);

      resetFields();

      toast({
        status: "success",
        description: "Property created",
        title: "Success",
        position: "top",
        duration: 5000,
      });

    } 
    catch (err) {
      toast({
        status: "error",
        description: "Failed to create property",
        title: "Failed",
        position: "top",
        duration: 5000,
      });
    }
  };

  const getPropertyFunction = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const getAllProperties = await getAdminProperty(inputValue, page);
      setGetProperty(getAllProperties?.data?.data);
      // console.log(getAllProperties?.data?.data);
      setTotalPages(getAllProperties.data?.pagination.pages);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleKeyPress =(e:React.KeyboardEvent<HTMLInputElement>)=> {
    if (e.key === 'Enter') {
      getPropertyFunction();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ data: User[] }> = await client.get(
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
    getPropertyFunction();
  }, [showModal, loading, inputValue]);

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  return (
    <>
      <form>
        <Modal onClose={toggleModal} isVisible={showModal}>
          {/* {currentChildComponent} */}
          {showScreen === 1 ? (
            <AddPropertyScreenOne
              onChangeTitle={onChangeTitle}
              onChangeCategory={onChangeCategory}
             
              // typeOfProperty={typeOfProperty}
              // validType={validType}
              // onBlurType={onBlurType}

              onChangeDescription={onChangeDescription}
              description={description}
              title={title}
              category={category}
              invalidCategory={invlidCategory}
              invalidTitle={invalidTitle}
              invalidType={invlidType}
              invalidDescription={invalidDescription}
              validCategory={validCategory}
              validTitle={validTitle}
              validDescription={validDescription}
              onBlurDescription={onBlurDescription}
              onBlurTitle={onBlurTitle}
              onBlurCategory={onBlurCategory}
              onClick={() => setShowScreen(2)}
            />
          ) : showScreen === 2 ? (
            <AddPropertyScreenTwo
              address={address}
              price={price}
              duration={duration}
              invalidPrice={invalidPrice}
              invalidDuration={invalidDuration}
              invalidAddress={invalidAddress}
              validPrice={validPrice}
              validDuration={validDuration}
              validAddress={validAddress}
              onBlurPrice={onBlurPrice}
              onBlurAdddress={onBlurAddress}
              onBlurDuration={onBlurDuration}
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
              images={images}
              onChangeImage={onChangeImage}
              deleteImage={deleteImage}
              error={imageError}
            />
          ) : showScreen === 4 ? (
            <AddPropertyScreenFour
              next={addPropertyFn}
              previous={() => setShowScreen(3)}
              fileName={fileName}
              documents={documents}
              onChangeFileName={handleDocumentChange}
            />
          ) : (
            ""
          )}
        </Modal>
      </form>
      <Box
        className="robotoF"
        px={{ base: "16px", lg: "0" }}
        height={{ base: "70vh", md: "78vh", lg: "60vh", xl: "65vh" }}
        overflowY="hidden"
      >
        <Flex
          mb={"24px"}
          // mt={"10px"}
          gap={"12px"}
          w={"100%"}
          h={{base:'fit-content',md:'36px'}}
          position="sticky"
          top="0"
          zIndex="10"
          bg="white"
        >
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
              h={{base:'36px',md:'100%'}}
              _placeholder={{ textColor: "var--(soft400)" }}
            >
              <InputLeftElement color={"var(--soft400)"} h="100%" display={'flex'} alignItems={'center'}>
                <Box onClick={getPropertyFunction}>
                  <SearchIcon />
                </Box>
              </InputLeftElement>
              <Input
                w={"100%"}
                h={"100%"}
                type="search"
                placeholder="Search..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </InputGroup>
          </Flex>
          <Flex gap={'12px'} flexDir={{base:'column',sm:'row'}} alignItems={'end'}>
                <Btn
                  onClick={toggleModal}
                  display={"flex"}
                  gap={"4px"}
                  alignItems={"center"}
                  bg={"#fff"}
                  h={{base:'36px',md:'100%'}}
                  w={"131px"}
                  border={"1px solid var(--soft200)"}
                  borderRadius={"8px"}
                  textColor={"var--(sub600)"}
                  fontWeight={500}
                  fontSize={"14px"}
                  px={"6px"}
                  pt={"0"}
                  pb={"0"}
                  _hover={{
                  bg: "#1A1D66",
                  textColor: "#FFF",
                  }}
                >
                    <Text fontSize={"14px"}>Add Property</Text>
                    <BsPlus className="icon" />
                </Btn>
                <Btn
                    onClick={() => setPage(inputValue)}
                    display={"flex"}
                    gap={"4px"}
                    alignItems={"center"}
                    bg={"#fff"}
                    h={{base:'36px',md:'100%'}}
                    w={"80px"}
                    border={"1px solid var(--soft200)"}
                    borderRadius={"8px"}
                    textColor={"var--(sub600)"}
                    fontWeight={500}
                    fontSize={"14px"}
                    px={"6px"}
                    pt={"0"}
                    pb={"0"}
                    _hover={{
                    bg: "#1A1D66",
                    textColor: "#FFF",
                    }}
                >
                    <IoFilter className="icon" />
                    <Text>Filter</Text>
                </Btn>
            </Flex>
        </Flex>

        {/* Scrollable Property Cards Container */}
        <Box
          overflowY={{ xl: "scroll" }}
          height={{ xl: "500px" }}
        // mt={4}
        >
          {loading && (
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          )}

          {!loading && getProperty?.length > 0 && (
            <Grid
                mt={4} w={"fit-content"}
                templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)"}}
                gap={{ base: "24px", lg: "28px" }}
                paddingBottom={{ base: "20rem", lg: "3rem", xl: "6rem" }}
            >
              {getProperty.map((property, index) => {
                const user = users.find((u) => u._id === property?.creatorID);

                return (
                  <PropertyCard
                    key={index}
                    _id={property?._id}
                    images={property?.images}
                    title={property?.title}
                    price={property?.price}
                    address={property?.address}
                    verificationState={property?.verificationState}
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
      </Box>
      {!loading && getProperty?.length > 0 && (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-between" }}
          mt={{ base: "14px", md: "10px" }}
          gap={{ base: "1rem", md: "0rem" }}
        >
          <Text
            fontSize={"14px"}
            color={"#525866"}
            className="inter"
          >{`page ${page} of ${totalPages}`}</Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"20px"}
            justifyContent={"center"}
            flex="1"
          >
            <Box>
              <DoublePrevBtn />
            </Box>
            <Box onClick={goToPrevPage}>
              <PreviousBtn />
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"5px"}>
              <PaginationButton onClick={() => goToPage(1)}>1</PaginationButton>
              <PaginationButton onClick={() => goToPage(2)}>2</PaginationButton>
              <PaginationButton onClick={() => goToPage(3)}>3</PaginationButton>
              <PaginationButton onClick={() => goToPage(4)}>4</PaginationButton>
              <PaginationButton onClick={() => goToPage(5)}>5</PaginationButton>
              <PaginationButton>...</PaginationButton>
              <PaginationButton onClick={() => goToPage(16)}>
                16
              </PaginationButton>
            </Box>
            <Box onClick={goToNextPage}>
              <NextBtn />
            </Box>
            <Box>
              <DoubleNextBtn />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};