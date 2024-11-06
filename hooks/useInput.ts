import { useState, ChangeEvent } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}

type ValidationType = {
  [key in keyof UserData]: (input: string) => boolean;
};

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
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const validFileTypes: string[] = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSize: number = 5 * 1024 * 1024;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const selectedFiles = event.target.files;

      if (selectedFiles) {
        const newImages: File[] = [];

        for (const file of Array.from(selectedFiles)) {
          if (!validFileTypes.includes(file.type)) {
            setError(
              `Invalid file type for '${file.name}'. ${validFileTypes.join(
                ", "
              )} are supported.`
            );
            continue;
          }
          if (file.size > maxFileSize) {
            setError(
              `File '${file.name}' exceeds maximum size of ${maxFileSize}MB`
            );
            continue;
          }
          newImages.push(file);
        }

        setImages([...images, ...newImages]);
        setError(null);
      }
    }
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const reset = () => {
    setImages([]);
  };

  return {
    images,
    onChangeHandler,
    error,
    reset,
    deleteImage,
  };
};

export const useInputSettings = (
  data: UserData,
  validation: ValidationType
) => {
  const [input, setInput] = useState<UserData>(data);
  const [touched, setIsTouched] = useState<{
    [Key in keyof UserData]?: boolean;
  }>({});

  const validateInput = (name: keyof UserData) => validation[name](input[name]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBlurHandler = (name: keyof UserData) => {
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  const inputIsvalid = (name: keyof UserData) => validateInput(name);
  const inputIsinvalid = (name: keyof UserData) =>
    !inputIsvalid(name) && touched[name];
  return {
    input,
    onChangeHandler,
    setInput,
    onBlurHandler,
    inputIsvalid,
    inputIsinvalid,
  };
};
