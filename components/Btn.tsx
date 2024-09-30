import { Button, ButtonProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  type?: any;
  children?: ReactNode;
  border?: string;
  color?: string;
  pt?: string;
  pb?: string;
  px?: string;
  w?: string;
  size?: string;
  weight?: string;
  disabled?: boolean | any;
  bgColor?: string;
  hover?: any;
  // onClick?: () => void |  (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  [key: string]: any;
}

const Btn = ({
  border,
  color,
  type,
  children,
  pt,
  pb,
  px,
  w,
  size,
  weight,
  disabled,
  bgColor,
  hover,
  onClick,
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      type={type || "button"}
      onClick={onClick}
      border={border || "none"}
      pt={pt || "0.5rem"}
      pb={pb || "0.5rem"}
      px={px || "1.5rem"}
      w={w || "auto"}
      color={color || "#fff"}
      fontSize={size || "1rem"}
      fontWeight={weight || 500}
      isDisabled={disabled}
      bgColor={bgColor || "#000"}
      _hover={
        hover
          ? hover
          : {
              bgColor: "none",
              border: "none",
            }
      }
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Btn;
