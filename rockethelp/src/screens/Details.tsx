import { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from 'phosphor-react-native';

import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { OrderProps } from '../components/Order';

import { useRoute } from '@react-navigation/native';
import { HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';

import { dateFormat } from '../utils/firestoreDateFormat';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const { colors } = useTheme();

  const [isloading, setIsloading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();

  const { orderId } = route.params as RouteParams;

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          status,
          patrimony,
          description,
          solution,
          createdAt,
          closedAt,
        } = doc.data();

        const closed = closedAt ? dateFormat(closedAt) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(createdAt),
          closed,
        });

        setIsloading(false);
      });
  }, []);

  if (isloading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg='gray.700'>
      <Header title='Solicitação' />
      <HStack bg='gray.500' justifyContent='center' p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize='sm'
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform='uppercase'
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={4} showsVerticalScrollIndicator={false}>
        <CardDetails
          title='equipament'
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title='Descrição do problema'
          description={`${order.description}`}
          icon={Clipboard}
        />
        <CardDetails
          title='Solução'
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          <Input
            placeholder='Descrição da solução'
            onChangeText={setSolution}
            textAlignVertical='top'
            multiline
            h={24}
          />
        </CardDetails>
      </ScrollView>
      {order.status === 'open' && <Button title='Encerrar solicitação' m={5} />}
    </VStack>
  );
}
