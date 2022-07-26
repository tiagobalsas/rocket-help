import { useState, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { OrderProps } from '../components/Order';

import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import { Header } from '../components/Header';
import { dateFormat } from '../utils/firestoreDateFormat';

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
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
  return (
    <VStack flex={1} bg='gray.700'>
      <Header title='Solicitação' />
      <Text color='white'>{orderId}</Text>
    </VStack>
  );
}
