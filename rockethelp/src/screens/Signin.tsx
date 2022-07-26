import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Signin() {
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  function handleSignin() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha');
    }

    setIsloading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsloading(false);

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido.');
        }

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Usuário não cadastrado.');
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida.');
        }

        return Alert.alert('Entrar', 'Não foi possível acessar');
      });
  }

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder='E-mail'
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete='email'
      />
      <Input
        mb={8}
        placeholder='Password'
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title='Entrar'
        w='full'
        onPress={handleSignin}
        isLoading={isloading}
      />
    </VStack>
  );
}
