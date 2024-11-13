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
} from "@chakra-ui/react";
import { CheckboxInput, SelectInput, TextInput } from "@/components/Inputs";
import { useInputSettings } from "@/hooks/useInput";
import { nigerianStates } from "@/utils/modules";
import Btn from "@/components/Btn";
import { HappyIcon } from "@/components/svg";
import Divider from "@/components/Divider";

type InformationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ValidationType = {
  [key in keyof {
    state: string;
    property: string;
    location: string;
  }]: (input: string) => boolean;
};

const validation: ValidationType = {
  state: (input: string) => (input ? input.trim().length > 1 : false),
  property: (input: string) => (input ? input.trim().length > 1 : false),
  location: (input: string) => true,
};

const PREFERED_PROPERTY_TYPE = ["Apartment", "House", "Condo", "Townhouse"];

const OnboardingModal = ({ isOpen, onClose }: InformationModalProps) => {
  const [loading, setLoading] = useState();
  const {
    input,
    onChangeHandler,
    inputIsinvalid,
    inputIsvalid,
    onBlurHandler,
  } = useInputSettings(
    {
      state: "",
      property: "",
      location: "",
    },
    validation
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
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
              <Box display={"flex"} flexDir={"column"} gap={"10px"}>
                {PREFERED_PROPERTY_TYPE.map((property, index) => {
                  return <CheckboxInput key={index} label={property} />;
                })}
              </Box>
            </Box>
            <Box>
              <SelectInput
                items={nigerianStates}
                label="State"
                placeholder="Select state"
                name="state"
                inputIsinvalid={inputIsinvalid("state")}
                errorMessage="Select state"
                value={input.state}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("state")}
              />
            </Box>
            <Box mt={5}>
              <SelectInput
                items={["Land", "House", "or both"]}
                label="What property are you intrested in buying"
                placeholder="Select property"
                name="property"
                errorMessage="Select property"
                inputIsinvalid={inputIsinvalid("property")}
                value={input.property}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("property")}
              />
            </Box>
            <Box mt={5}>
              <TextInput
                label="Where are you interested in buying property"
                name="location"
                placeholder="Enter location"
                value={input.location}
                onChange={onChangeHandler}
                onBlur={() => onBlurHandler("location")}
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
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const navigate = useRouter();

  const isWidow = typeof window !== "undefined";

  const { user } = useAuth();

  useEffect(() => {
    if (user && !user?.onboard) {
      // setShowModal(true);
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
