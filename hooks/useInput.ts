import { useState, ChangeEvent } from "react";

export const useInputText = (validation: (input: string) => boolean) => {
  const [input, setInput] = useState("");
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  const valueIsValid = validation(input);
  const valueIsInvalid = !valueIsValid && isTouch;

  const onChangeInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setInput(event.target.value);
  };
  const onBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
    setInput("");
    setIsTouch(false);
  };
  return {
    input,
    onChangeInput,
    onBlurHandler,
    reset,
    valueIsValid,
    valueIsInvalid,
  };
};

export const useInputNumber = (
  validation: (input: number | null) => boolean
) => {
  const [input, setInput] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  const valueIsValid = validation(input ?? 0);
  const valueIsInvalid = !valueIsValid && isTouch;

  const parseNumber = (value: string): number | null => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseNumber(event.target.value);
    setInput(parsedNumber);
    setIsTouch(true);
  };
  const onBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
    setInput(null);
    setIsTouch(false);
  };
  return {
    input,
    onChangeInput,
    onBlurHandler,
    reset,
    valueIsValid,
    valueIsInvalid,
  };
};


export const useImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const validfileTypes: string[] = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSize: number = 5 * 1024 * 1024;

  // const validateFile = (File: File): void => {
  //   if (!validfileTypes.includes(File.type)) {
  //     setError(
  //       `Invalid file type. ${validfileTypes.join(",")} are supported, only`
  //     );
  //     return;
  //   }

  //   if (File.size > maxFileSize) {
  //     setError(`File exceeds maximum size of ${maxFileSize}MB`);
  //     return;
  //   }

  //   setUploadedFile(File);
  //   setError(null);
  // };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const selectedFile = event.target.files![0];
      if (selectedFile) {
        if (!validfileTypes.includes(selectedFile.type)) {
          setError(
            `Invalid file type. ${validfileTypes.join(",")} are supported, only`
          );
          return;
        }
        if (selectedFile.size > maxFileSize) {
          setError(`File exceeds maximum size of ${maxFileSize}MB`);
          return;
        }
        setImage(selectedFile);
        setError(null);
      }
    }
  };

  const reset = () => {
    setImage(null);
    // setIsTouch(false);
  };

  return {
    image,
    onChangeHandler,
    error,
    reset,
  };
};
