import { ImageBackground } from 'react-native';

import { styles } from './styles';

// const image = { uri: "#" };

import background from '../../assets/background-galaxy.png'

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={background}
      defaultSource={background}
      resizeMode="cover"
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}