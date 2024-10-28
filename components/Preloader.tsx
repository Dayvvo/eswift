import { Image, Modal, ModalOverlay, ModalContent, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const Preloader = () => {
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
            <ModalOverlay />
            <ModalContent bg="transparent" boxShadow="none">
                <Center>
                    <Image src={"/Company.gif"} alt="/" width={150} height={144} />
                </Center>
            </ModalContent>
        </Modal>
    )
}

export default Preloader
