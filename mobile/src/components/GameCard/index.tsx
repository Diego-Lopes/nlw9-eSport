import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps
}

export function GameCard({ data, ...rest }: Props) {

  console.log(data);



  return (
    <TouchableOpacity style={styles.container} {...rest}>

      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {data._count.ads > 0 ? `${data._count.ads} anúcio(s)` : `${data._count.ads} anúcio`}
          </Text>

        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}