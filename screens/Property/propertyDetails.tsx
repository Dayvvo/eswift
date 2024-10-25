import Btn from "@/components/Btn";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  Checkbox,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa";
// import { PropertyCard } from "./propertyCard";
import useProperty from "@/hooks/useProperty";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { R } from "@/utils/types";
import { PropertyCard } from "./propertyCard";
import { useRouter } from "next/router";
import {
  DeclineState,
  DeleteProperty,
  SuspendState,
  VerifyState,
} from "./VerificationState";
import useToast from "@/hooks/useToast";

interface MyData {
  _id: any;
  title: string;
  price: string;
  address: string;
  email: string;
  owner: string;
  userImage: string;
  verificationState: string;
  images: any;
  creatorID: any;
}

export const PropertyDetails = ({
  my,
  p,
  cardWidth,
}: {
  my?: string;
  p?: string;
  cardWidth?: any;
}) => {
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

  const { globalContext } = useAppContext();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    avatar: "",
    propertyCount: 0,
  });

  const [detailsData, setDetailsData] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);
  const [showSuspendModal, setShowSuspendModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [getProperty, setGetProperty] = useState<MyData[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] = useState(
    detailsData?.verification
  );
  const {
    getPropertyDetails,
    propertyCreator,
    verifyProperty,
    deleteProperty,
    getAdminProperty,
  } = useProperty();

  const id = router.query.id as string;

  const getPropertyDetailFn = async () => {
    try {
      const request = await getPropertyDetails(id);
      const data = request.data as R;
      setVerificationStatus(data?.data.verification);
      if (data.statusCode === 200) {
        const creator = await propertyCreator(data?.data?.creatorID);

        setUser(creator?.data?.data);
      }
      setDetailsData(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPropertyFunction = async () => {
    setIsVerifying(true);
    try {
      setIsVerifying(false);
      const getAllProperties = await getAdminProperty("", 1);
      setGetProperty(getAllProperties?.data?.data);
    } catch (error) {
      setIsVerifying(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getPropertyFunction();
  }, [showModal, isVerifying]);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const toggleDeclineModal = () => {
    setShowDeclineModal((prevState) => !prevState);
  };
  const toggleSuspendModal = () => {
    setShowSuspendModal((prevState) => !prevState);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal((prevState) => !prevState);
  };

  const verifyPropertyFn = async (status: string) => {
    if (!id) {
      toast({
        status: "error",
        description: "Invalid property ID",
        title: "Error",
        position: "top",
        duration: 1000,
      });
      return;
    }
    setIsVerifying(true);
    try {
      const req = await verifyProperty(id, {
        verification: status,
      });
      console.log(req);
      if (req.statusCode === 201) {
        setVerificationStatus(req.data);
        toast({
          status: "success",
          description: `Property ${req.data}`,
          title: "Success",
          position: "top",
          duration: 1000,
        });
        setShowDeclineModal(false);
        setShowModal(false);
        setShowSuspendModal(false);
      }
    } catch (err) {
      toast({
        status: "error",
        description: "Failed to perform action",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const deletePropertyFn = async () => {
    try {
      const req = await deleteProperty(id); // If no error occurs, the following code runs
      // console.log("response", req);
      router.push("/property");
      toast({
        status: "success",
        description: "Property deleted",
        title: "Success",
        position: "top",
        duration: 1000,
      });
    } catch (err) {
      toast({
        status: "error",
        description: "Failed to delete property",
        title: "Failed",
        position: "top",
        duration: 1000,
      });
      // console.log("err", err);
    }
  };

  useEffect(() => {
    getPropertyDetailFn();
  }, [id, showModal, isVerifying]);

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        onClose={() => {
          setShowModal(false);
        }}
        isOpen={showModal}
      >
        <ModalOverlay />
        <ModalContent width={"440px"}>
          <VerifyState
            toggleModal={toggleModal}
            verifyPropertyFn={verifyPropertyFn}
            isVerifying={isVerifying}
          />
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={true}
        onClose={() => {
          setShowDeclineModal(false);
        }}
        isOpen={showDeclineModal}
      >
        <ModalOverlay />
        <ModalContent width={"440px"}>
          <DeclineState
            toggleModal={toggleDeclineModal}
            verifyPropertyFn={verifyPropertyFn}
            isVerifying={isVerifying}
          />
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={true}
        onClose={() => {
          setShowSuspendModal(false);
        }}
        isOpen={showSuspendModal}
      >
        <ModalOverlay />
        <ModalContent width={"440px"}>
          <SuspendState
            verifyPropertyFn={verifyPropertyFn}
            isVerifying={isVerifying}
            toggleModal={toggleSuspendModal}
          />
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={true}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        isOpen={showDeleteModal}
      >
        <ModalOverlay />
        <ModalContent width={"440px"}>
          <DeleteProperty
            deletePropertyFn={deletePropertyFn}
            isVerifying={isVerifying}
            toggleModal={toggleDeleteModal}
          />
        </ModalContent>
      </Modal>
      <Box bg={"#FFF"} w={"100%"}>
        <Flex w={"100%"} my={my || "24px"} pos={"relative"}>
          <Grid
            templateColumns={
              detailsData?.images.length === 1 ? "" : "repeat(2, 1fr)"
            }
            gap={"16px"}
            w={"100%"}
            h={"max-content"}
          >
            {detailsData?.images.map((item: any, index: any) => (
              <GridItem rowSpan={index === 0 ? 2 : 1} key={index}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  src={item}
                  alt={`Image ${index + 1}`}
                  maxHeight={"65vh"}
                  objectFit="cover"
                />
              </GridItem>
            ))}
          </Grid>
          <Flex
            w={"100%"}
            pos={"absolute"}
            justifyContent={"end"}
            insetBlockEnd={0}
          >
            <Flex
              cursor={"pointer"}
              bg={"#FFF"}
              alignItems={"center"}
              justifyContent={"center"}
              w={"250px"}
              h={{ base: "48px", lg: "60px" }}
              borderRadius={"8px"}
              gap={"16px"}
              className="robotoF"
              textColor={"#03142B"}
              fontWeight={500}
              fontSize={{ base: "18px", lg: "30px" }}
            >
              <Text>View Gallery</Text>
              <FaRegImages />
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDir={"column"} w={"100%"} p={p || "20px"} gap={"24px"}>
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            className="montserrat"
            w={"100%"}
            alignItems={{ base: "", lg: "center" }}
            justifyContent={"space-between"}
            fontWeight={600}
            textColor={"#000"}
            fontSize={"40px"}
          >
            <Text fontSize={"40px"}>{detailsData?.title}</Text>
            <Text fontWeight={500} display={"flex"} alignItems={"center"}>
              <TbCurrencyNaira />
              <Text as={"span"}>{detailsData?.price}</Text>
            </Text>
          </Flex>
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            w={"100%"}
            justifyContent={"space-between"}
            gap={"26px"}
          >
            <Flex flexDir={"column"} w={"100%"} gap={"18px"} className="roboto">
              <Flex
                w={"100%"}
                alignItems={{ base: "start", md: "center" }}
                gap={"4px"}
                textColor={"#626871"}
                fontWeight={400}
                fontSize={{ base: "20px", lg: "28px" }}
              >
                <HiOutlineLocationMarker />
                <Text>{detailsData?.address}</Text>
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
                {detailsData?.features.map((feature: string, index: number) => {
                  return (
                    <Flex key={index} alignItems={"center"} gap={"4px"}>
                      <BsDot />
                      <Text>
                        {feature.slice(0, 1).toUpperCase()}
                        {feature.slice(1, feature.length).toLowerCase()}
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
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
            <Flex
              flexDir={"column"}
              w={{ base: "100%", lg: "20%" }}
              gap={"16px"}
              className="robotoF"
            >
              {user.role === "ADMIN" ? (
                verificationStatus === "verified" ? (
                  <Flex gap={"16px"} direction={"column"}>
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
                      onClick={toggleSuspendModal}
                    >
                      Suspend
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
                      onClick={toggleDeleteModal}
                    >
                      Delete
                    </Btn>
                  </Flex>
                ) : verificationStatus === "suspend" ? (
                  <Flex gap={"16px"} direction={"column"}>
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
                      onClick={toggleModal}
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
                      onClick={toggleDeleteModal}
                    >
                      Delete
                    </Btn>
                  </Flex>
                ) : (
                  <Flex gap={"16px"} direction={"column"}>
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
                      onClick={toggleModal}
                    >
                      Verify
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
                      onClick={toggleDeclineModal}
                    >
                      Decline
                    </Btn>
                  </Flex>
                )
              ) : (
                <></>
              )}
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
                  {user?.role}
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
                    {`${user.firstName} ${user.lastName}`}
                  </Text>
                </Flex>
                <Box textColor={"#626871"} fontWeight={500}>
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    EMAIL
                  </Text>
                  <Text fontSize={"14px"}>{`${user.email}`}</Text>
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
                  <Text
                    mb={"4px"}
                    textColor={"var(--soft400)"}
                    fontSize={"12px"}
                  >
                    PROPERTY
                  </Text>
                  <Text fontSize={"14px"}>{user?.propertyCount}</Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          justifyContent={"space-around"}
          gap={{ base: "24px", lg: "20px" }}
          flexWrap={"wrap"}
          mt={{ base: "60px", lg: "120px" }}
        >
          {getProperty.map((property, index) => {
            return (
              <PropertyCard
                key={index}
                id={property?._id}
                image={property?.images}
                title={property?.title}
                pricing={property?.price}
                location={property?.address}
                verificationState={property?.verificationState}
                userImage={user?.avatar || "/"}
                email={user?.email}
                user={user?.firstName}
                // count={page}
              />
            );
          })}
        </Flex>
      </Box>
    </>
  );
};
