import { Footer } from "@/components/footer";
import { HeroPropsVideo } from "@/components/heroPropsVideo";
import NavBar from "@/components/navBar";
import {
  Box,
  Text,
  Textarea,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { Background } from "../home/Background";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationDot, FaFacebookF } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { TextHeader } from "../home/textHeader";
import { ChangeEvent, useState } from "react";
import Btn from "@/components/Btn";
import useBlog from "@/hooks/useBlog";
import useToast from "@/hooks/useToast";

const ContactScreen = () => {
  function scrollToSection() {
    const section = document.querySelector("#main") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth" });
  }

  const contact = [
    {
      id: 1,
      icon: <FaEnvelope />,
      title: "Eswiftpropertmart",
      navigate: "mailto:ewiftpropertymart",
    },
    {
      id: 2,
      icon: <BsTelephoneFill />,
      title: "(+234) 805-911-2878",
      navigate: "tel:+2348059112878",
    },
    {
      id: 3,
      icon: <FaLocationDot />,
      title: "Main Headquarters",
      navigate: "",
    },
    {
      id: 4,
      icon: <BiLogoInstagramAlt />,
      title: "Instagram",
      navigate: "",
    },
    {
      id: 5,
      icon: <FaFacebookF />,
      title: "Facebook",
      navigate: "",
    },
    {
      id: 6,
      icon: <FaLinkedin />,
      title: "LinkedIn",
      navigate: "",
    },
  ];
  const [isAgree, setIsAgree] = useState(false);
  const [isContact, setIsContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phoneNumber: "",
    inquiryType: "",
    howDidYouHear: "",
  });
  const { contactApi } = useBlog();
  const { toast } = useToast();

  const contactUsFn = async () => {
    try {
      const req = await contactApi(isContact);
      
      toast({
        status: "success",
        description: "Email sent",
        title: "Success",
        position: "top",
        duration: 5000,
      });
      setIsContact({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phoneNumber: "",
        inquiryType: "",
        howDidYouHear: "",
      });
      setIsAgree(false);
    } catch (error) {
      toast({
        status: "error",
        description: "Failed to send email",
        title: "Failed",
        position: "top",
        duration: 5000,
      });
      setIsAgree(true);
    }
  };

  const handleInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setIsContact({ ...isContact, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Box>
        <NavBar />
        <HeroPropsVideo
          bg={"#00000070"}
          header={"Contact Us"}
          details={
            "Have a question or need assistance? Feel free to reach out to us using the following information:"
          }
          buttonPos={null}
          w={"100%"}
          h={"100vh"}
          video={"/AboutVid.mp4"}
          click={scrollToSection}
        />
        <Background />
        <Box
          id="main"
          py={"120px"}
          px={{ base: "0.5rem", lg: "2rem" }}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"20px"}
          mb={{ base: "10px", lg: "120px" }}
        >
          <Flex
            w={"100%"}
            flexWrap={"wrap"}
            gap={"10px"}
            justifyContent={"center"}
            py="20px"
            px="20px"
          >
            {contact.map((item) => (
              <Flex
                key={item?.id}
                bg={"#3170A6"}
                borderRadius={"10px"}
                w={{ base: "100%", md: "40%", lg: "20%" }}
                h={"160px"}
                p={"20px"}
                textColor={"white"}
                className="urbanist"
                flexDir={"column"}
                alignItems={"center"}
                _hover={{ bg: "#3170A690" }}
              >
                <Flex w={"100%"} justifyContent={"end"}>
                  <Link href={item?.navigate}>
                    <Box fontSize={"26px"}>
                      <MdArrowOutward />
                    </Box>
                  </Link>
                </Flex>
                <Flex
                  position={"relative"}
                  w={"60px"}
                  h={"60px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontSize={"24px"}
                >
                  <Image
                    src="/Icon-Container.png"
                    alt=""
                    w={"60px"}
                    height={"60px"}
                    position={"absolute"}
                  />
                  {item?.icon}
                </Flex>
                <Text
                  mt={"16px"}
                  className="urbanist"
                  fontSize={"16px"}
                  fontWeight={600}
                >
                  {item?.title}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Text
            className="antic"
            fontSize={{ base: "24px", md: "32px", lg: "48px" }}
            textColor={"#3A3148"}
            fontWeight={400}
            maxW={"1240px"}
            textAlign={"center"}
            my={10}
          >
            Have a question or need assistance? Our friendly team is here to
            help. Contact us today for a personalized consultation and let us
            guide you through your real estate journey.
          </Text>

          <TextHeader
            Header="Let's Connect"
            sub="We`re excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Eswift. Whether you`re a prospetive client, partner, or simply curious about our services, we`re here to answer your questions and provide the assistance you need."
          />

          <FormControl
            w={"100%"}
            p={{ base: "20px", md: "40px", lg: "80px" }}
            border={"1px solid #262626"}
            borderRadius={"12px"}
            className="urbanist"
          >
            <Flex
              w={"100%"}
              flexWrap={"wrap"}
              gap={{ base: "20px", lg: "30px" }}
            >
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  First Name
                </FormLabel>
                <Input
                  w={"100%"}
                  h={"52px"}
                  border={"1px solid #262626"}
                  borderRadius={"6px"}
                  textColor={"#666"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={isContact.firstName}
                  onChange={handleInput}
                />
              </Flex>
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  Last Name
                </FormLabel>
                <Input
                  w={"100%"}
                  h={"52px"}
                  border={"1px solid #262626"}
                  borderRadius={"6px"}
                  textColor={"#666"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={isContact.lastName}
                  onChange={handleInput}
                />
              </Flex>
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  Email
                </FormLabel>
                <Input
                  w={"100%"}
                  h={"52px"}
                  borderRadius={"6px"}
                  border={"1px solid #262626"}
                  textColor={"#666"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={isContact.email}
                  onChange={handleInput}
                />
              </Flex>
            </Flex>
            <Flex
              w={"100%"}
              flexWrap={"wrap"}
              gap={{ base: "20px", lg: "30px" }}
            >
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  Phone Number
                </FormLabel>
                <Input
                  w={"100%"}
                  h={"52px"}
                  border={"1px solid #262626"}
                  borderRadius={"6px"}
                  textColor={"#666"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  type="tel"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  value={isContact.phoneNumber}
                  onChange={handleInput}
                />
              </Flex>
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  Inquiry Type
                </FormLabel>
                <Select
                  w={"100%"}
                  h={"52px"}
                  border={"1px solid #262626"}
                  cursor={"pointer"}
                  borderLeftRadius={"6px"}
                  _focusWithin={"0px solid #FFFFFF"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  textColor={"#666"}
                  _placeholder={{ textColor: "#666" }}
                  placeholder="Select Inquiry Type"
                  onChange={handleInput}
                  value={isContact.inquiryType}
                  name="inquiryType"
                >
                  {["General", "Support", "Customer care", "Payment"].map(
                    (entry) => (
                      <option key={entry} value={`${entry}`}>
                        {entry}
                      </option>
                    )
                  )}
                </Select>
              </Flex>
              <Flex
                flexDir={"column"}
                w={{ base: "100%", md: "48%", lg: "30%" }}
              >
                <FormLabel
                  fontWeight={600}
                  fontSize={"16px"}
                  textColor={"#3170A6"}
                >
                  How did you hear about us?
                </FormLabel>
                <Select
                  cursor={"pointer"}
                  border={"1px solid #262626"}
                  borderLeftRadius={"6px"}
                  _focusWithin={"0px solid #FFFFFF"}
                  fontWeight={500}
                  fontSize={{ base: "12px", lg: "14px" }}
                  textColor={"#666"}
                  w={"100%"}
                  h={"52px"}
                  _placeholder={{ textColor: "#666" }}
                  placeholder="how did you hear about us"
                  onChange={handleInput}
                  value={isContact.howDidYouHear}
                  name="howDidYouHear"
                >
                  {["Twitter", "Instagram", "Tik tok", "Facebook"].map(
                    (entry) => (
                      <option key={entry} value={`${entry}`}>
                        {entry}
                      </option>
                    )
                  )}
                </Select>
              </Flex>
            </Flex>
            <Textarea
              my={8}
              w={"100%"}
              h={"122px"}
              border={"1px solid #262626"}
              borderRadius={"6px"}
              textColor={"#666"}
              fontWeight={500}
              fontSize={{ base: "12px", lg: "14px" }}
              _placeholder={{ textColor: "#666" }}
              placeholder="Enter your Message here"
              name="message"
              value={isContact.message}
              onChange={handleInput}
            />

            <Flex w="100%" my={"24px"} justifyContent={"space-between"}>
              <Checkbox
                fontWeight={500}
                fontSize={{ base: "10px", lg: "16px" }}
                textColor={"#262626"}
                isChecked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
              >
                I agree with Terms of Use and Privacy Policy
              </Checkbox>
              <Btn
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                W={{ base: "60px", lg: "191px" }}
                h={{ base: "32px", lg: "52px" }}
                bg={isAgree ? "#3170A6" : "#ccc"}
                borderRadius={"6px"}
                textColor={"white"}
                _hover={{ opacity: 0.7 }}
                fontSize={{ base: "8px", lg: "14px" }}
                onClick={contactUsFn}
                disabled={!isAgree}
              >
                Send Your Message
              </Btn>
            </Flex>
          </FormControl>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default ContactScreen;
