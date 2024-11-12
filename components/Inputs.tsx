import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

type SelectInputProps = {
  items: string[];
  label: string;
  placeholder: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: any;
  value?: string;
  inputIsinvalid?: boolean;
  errorMessage?: string;
};

type TextInputProps = {
  label: string;
  placeholder: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: any;
  value?: string;
};

export const SelectInput = ({
  items,
  label,
  placeholder,
  name,
  value,
  onBlur,
  onChange,
  inputIsinvalid,
  errorMessage,
}: SelectInputProps) => {
  return (
    <FormControl w={"100%"}>
      <FormLabel
        fontWeight={500}
        fontSize={"14px"}
        textColor={"var(--strong950)"}
      >
        {label}
      </FormLabel>
      <Select
        w="100%"
        h="40px"
        border={
          inputIsinvalid
            ? "1px solid var(--errorBase)"
            : "1px solid var(--soft200)"
        }
        borderRadius={"10px"}
        name={name}
        fontSize={14}
        textColor={"var--(sub600)"}
        _placeholder={{ textColor: "var--(soft400)" }}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      >
        {items.map((entry) => (
          <option value={`${entry}`} key={entry}>
            {entry}
          </option>
        ))}
      </Select>
      {inputIsinvalid && (
        <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const TextInput = ({
  label,
  placeholder,
  name,
  onChange,
  onBlur,
  value,
}: TextInputProps) => {
  return (
    <Flex flexDir={"column"} w={{ base: "100%" }}>
      <FormLabel
        fontWeight={500}
        fontSize={"14px"}
        textColor={"var(--strong950)"}
      >
        {label}
      </FormLabel>
      <Input
        w={"100%"}
        h={"40px"}
        // border={
        //   invalidLastName ? "1px solid var(--errorBase)" : "1px solid #262626"
        // }
        borderRadius={"6px"}
        // variant={"unstyled"}
        px={"0.7rem"}
        textColor={"#666"}
        fontWeight={500}
        fontSize={{ base: "12px", lg: "14px" }}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />

      {/* {invalidLastName && (
        <FormHelperText color={"var(--errorBase)"} fontSize={"12px"}>
          {"Enter a valid last name"}
        </FormHelperText>
      )} */}
    </Flex>
  );
};
