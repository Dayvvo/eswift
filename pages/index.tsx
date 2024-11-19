import useAuth from "@/hooks/useAuth";
import HomePage from "@/screens/home/home";
import { Resdesign } from "@/screens/home/redesign";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import {
  Box,
  Modal,
  ModalBody,
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
import Preloader from "@/components/Preloader";

// Onboarding Modal Component
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
  const client = useApiUrl();
  const { toast }: any = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const {
    input,
    onChangeHandler,
    inputIsinvalid,
    onBlurHandler,
  } = useInputSettings(
    {
      state: "",
      propertyInterest: "",
      locationInterest: "",
    },
    validation
  );

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await client.put(`/user/profile?onboarding=true`, {
        ...input,
        ...user,
      });
      toast({
        status: "success",
        description: "Preference updated successfully",
        title: "Onboarding Completed",
        position: "top",
        duration: 1000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={"flex"} flexDir={"column"} alignItems={"center"}>
          <HappyIcon />
          <Box>
            <Text fontWeight={400} fontSize={"24px"} textAlign={"center"}>
              Welcome to E-Swift 🏠
            </Text>
            <Text fontWeight={400} fontSize={"12px"} color={"#525866"} textAlign={"center"}>
              Let us help you find your dream property effortlessly using our tailored search options. We’re excited to have you join our community!
            </Text>
          </Box>
        </ModalHeader>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Divider w="90%" h={"1px"} color="#E1E4EA" />
        </Box>

        <form onSubmit={submitHandler}>
          <ModalBody pb={4}>
            <Box mt={1}>
              <Text fontWeight={700} fontSize={"14px"}>
                Preferred Property Type
              </Text>
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
                errorMessage="Select state"
                inputIsinvalid={inputIsinvalid("state")}
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
              disabled={loading}
            >
              Submit
            </Btn>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default function Home() {
  const [building, setBuilding] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user && !user?.isOnboarded) {
      setShowModal(true);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return decodeURIComponent(parts.pop()?.split(";").shift() || "");
        }
      };

      const myCookie = getCookie("auth-cookie");
      if (myCookie) {
        localStorage.setItem("userData", myCookie);
        const authRoute = sessionStorage.getItem("authRoute");
        if (authRoute) {
          navigate.push(authRoute);
        }
      }
    }

    return () => localStorage.removeItem("authRoute");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoadingScreen ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Preloader />
        </div>
      ) : (
        <>
          <OnboardingModal isOpen={showModal} onClose={() => setShowModal(false)} />
          {building ? <Resdesign /> : <HomePage />}
        </>
      )}
    </>
  );
}
