import { VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  const navigation = useNavigation();

  const [isloading, setIsloading] = useState(false);
  const [patrimony, setpatrimony] = useState('');
  const [description, setdescription] = useState('');

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setIsloading(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        return Alert.alert(
          'Solicitação',
          'Não foi possível registrar o pedido.'
        );
      });
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Solicitação' />

      <Input
        placeholder='Número do patrimônio'
        mt={4}
        onChangeText={setpatrimony}
      />

      <Input
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setdescription}

      />
      <Button
        title='Cadastrar'
        mt={5}
        isLoading={isloading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
