import { useToast } from "@chakra-ui/react";

export default function Toast({ error, type, status }) {
  const toast = useToast();
  return toast({
    title: type,
    description: `${error?.message}`,
    status: status,
    duration: 4000,
    isClosable: true,
  });
}
