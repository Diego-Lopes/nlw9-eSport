import { View, Text, ColorValue } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function DuoInfo({ colorValue = THEME.COLORS.TEXT, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
      </Text>

      <Text style={[styles.value, { color: colorValue }]}>
        {props.value}
      </Text>
    </View>
  );
}