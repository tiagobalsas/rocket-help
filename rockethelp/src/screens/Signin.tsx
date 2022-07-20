import { VStack, Heading } from 'native-base';

import Logo from '../assets/logo_primary.svg';
import { Loading } from '../components/Loading';

export function Signin() {
  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
        Acesse sua conta
      </Heading>
    </VStack>
  );
}
