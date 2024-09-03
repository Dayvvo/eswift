import { Flex, Text } from "@chakra-ui/react"
import Image from "next/image"

type AuthHeaderProps = {
    icon?: string,
    title?: string, 
    description?: string,
    user?: string,
}

export const AuthHeaderProps =({
    icon, title, description, user
}:AuthHeaderProps) => {
    return(
        <Flex 
            flexDir={'column'}
            alignItems={'center'}
            w={'100%'}
            gap={'8px'}
            className="robotoF"
        >
            <Image 
                width={96}
                height={96}
                src={`${icon}`} alt="/"
            />
            <Text
                textColor={'var(--strong950)'}
                fontSize={'24px'}
                fontWeight={400}
            >
                {title}
            </Text>
            <Text
                textColor={'var(--sub600'}
                fontSize={'16px'}
                fontWeight={400}
            >
                {description} <Text as={'span'} fontWeight={500} textColor={'var(--strong950)'}>
                    {user || null}
                </Text>
            </Text>
            
        </Flex>
    )
}