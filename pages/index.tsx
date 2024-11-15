import useAuth from "@/hooks/useAuth";
import HomePage from "@/screens/home/home";
import { Resdesign } from "@/screens/home/redesign";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import {
  Box,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CheckboxInput, SelectInput, TextInput } from "@/components/Inputs";
import { useInputSettings } from "@/hooks/useInput";
import { nigerianStates } from "@/utils/modules";
import Btn from "@/components/Btn";
import { HappyIcon } from "@/components/svg";
import Divider from "@/components/Divider";
import { useApiUrl } from "@/hooks/useApi";
import useUser from "@/hooks/useUser";

type InformationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ValidationType = {
  [key in keyof {
    state: string;
    propertyInterest: string;
    locationInterest: string;
  }]: (input: string) => boolean;
};

const validation: ValidationType = {
  state: (input: string) => (input ? input.trim().length > 1 : false),
  propertyInterest: (input: string) => (input ? input.trim().length > 1 : false),
  locationInterest: (input: string) => true,
};

const PREFERED_PROPERTY_TYPE = ["Land", "House"];

const OnboardingModal = ({ isOpen, onClose }: InformationModalProps) => {
  const client = useApiUrl()
  const { toast }:any = useToast()
  const [loading, setLoading] = useState(false);
  const { isWindow, user } = useAuth()

  const {
    input,
    onChangeHandler,
    inputIsinvalid,
    inputIsvalid,
    onBlurHandler,
  } = useInputSettings(
    {
      state: "",
      propertyInterest:"",
      locationInterest:"",
    },
    validation
  )

  console.log(user)

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    try{
      const data = await client.put(`/user/profile?onboarding=true`, { ...input, ...user })
      console.log(data);
      toast({
        status: "success",
        description: "Preference updated successfully",
        title: "Onboarding Completed",
        position: "top",
        duration: 1000,
      });
      setLoading(false)
    }
    catch (error){
      // toast({
      //   status: "error",
      //   description: "Failed to set preference, please try again.",
      //   title: "Onboarding Failed",
      //   position: "top",
      //   duration: 1000,
      // });
      setLoading(false)
    }
   
  };





  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={"lg"}
      closeOnOverlayClick={true}
    >
      <ModalOverlay />
      <ModalContent className="robotoF">
        <ModalHeader
          className="robotoF"
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <HappyIcon />
          <Box>
            <Text
              fontWeight={400}
              fontSize={"24px"}
              className="robotoF"
              textAlign={"center"}
            >
              Welcome to E-Swift 🏠
            </Text>
            <Text
              fontWeight={400}
              fontSize={"12px"}
              color={"#525866"}
              textAlign={"center"}
            >
              Let us help you find your dream property effortlessly using our
              tailored search options. We’re excited to have you join our
              community!
            </Text>
          </Box>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Divider w="90%" h={"1px"} color="#E1E4EA" />
        </Box>

        <form onSubmit={submitHandler}>
          <ModalBody pb={4}>
            <Box mt={1}>
              <Text className="inter" fontWeight={700} fontSize={"14px"}>
                Preferred Property Type
              </Text>
              {/* <Box display={"flex"} flexDir={"column"} gap={"10px"}>
                {PREFERED_PROPERTY_TYPE.map((property, index) => {
                  return <CheckboxInput key={index} label={property} />;
                })}
              </Box> */}
            </Box>
            <Box my={5}>
              <SelectInput
                items={["Land", "House", "Both"]}
                label="What property are you interested in buying"
                placeholder="Select property"
                name="propertyInterest"
                errorMessage="Select property"
                inputIsinvalid={inputIsinvalid("propertyInterest")}
                value={input?.propertyInterest}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("propertyInterest")}
              />
            </Box>
            <Box>
              <SelectInput
                items={nigerianStates}
                label="State"
                placeholder="Select state"
                name="state"
                inputIsinvalid={inputIsinvalid("state")}
                errorMessage="Select state"
                value={input?.state}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("state")}
              />
            </Box>
            <Box mt={5}>
              <TextInput
                label="Where are you interested in buying property"
                name="locationInterest"
                placeholder="Enter location"
                errorMessage="enter your location"
                value={input?.locationInterest}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("locationInterest")}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Btn
              bg={"transparent"}
              display={"flex"}
              alignItems={"center"}
              w={"100%"}
              h={"40px"}
              border={"1px solid var(--primaryBase)"}
              borderRadius={"10px"}
              textColor={"var(--primaryBase)"}
              my={"24px"}
              type="submit"
              _hover={{
                bg: "#1A1D66",
                textColor: "#FFF",
              }}
              isLoading={loading}
              // loadingText="submitting"
              disabled={loading}
            >
              submit
            </Btn>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default function Home() {
  const [building, setBuilding] = useState<boolean>(false);
  // const [cookie, setCookie] = useState("")
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const navigate = useRouter();

  const isWidow = typeof window !== "undefined";

  const { user } = useAuth();

  useEffect(() => {
    if (user && !user?.isOnboarded) {
      setShowModal(true);
    }
  }, [user]);

  useEffect(() => {
    if (isWidow) {
      const getCookie = (name: string) => {
        if (window?.document?.cookie) {
          const windowCookie = window.document.cookie;
          const value = `; ${windowCookie}`;
          const parts = value.split(`; ${name}=`);

          if (parts.length === 2) {
            let uriEncodedValue = parts.pop()?.split(";").shift() as string;
            return decodeURIComponent(uriEncodedValue);
          }
        }
      };
      try {
        const myCookie = getCookie("auth-cookie") as string;
        myCookie && localStorage.setItem("userData", myCookie);
        console.log("old cookie", myCookie);
        const authRoute = sessionStorage.getItem("authRoute");
        authRoute && navigate.push(authRoute);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    return () => localStorage.removeItem("authRoute");
  }, [isWidow]);

  return (
    <>
      <OnboardingModal isOpen={showModal} onClose={toggleModal} />

      {building ? <Resdesign /> : <HomePage />}
    </>
  );
}
