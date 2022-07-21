import { Text, Button, IBadgeProps, useTheme } from 'native-base';

type Props = IBadgeProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
};

export function Filter({ title, isActive = false, type, ...rest }: Props) {
  return (
    <Button variant='outline'>
      <Text>{title}</Text>
    </Button>
  );
}
