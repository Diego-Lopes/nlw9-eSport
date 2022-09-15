import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';


export default function App() {
  const [fontsLoad] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black });
  return (
    <Background>
      <StatusBar
        barStyle="light-content" //tipo de estilo barStyle
        backgroundColor="transparent" //definindo transparencia
        translucent //deixa o background transparente.
      />
      {fontsLoad ? <Routes /> : <Loading />}
    </Background>
  );
}
