import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute } from '@react-navigation/native'; //resgatar as informações da rota.

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([])

  //navegação
  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }


  useEffect(() => {
    fetch(`http://192.168.2.79:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, [])

  return (
    <Background>

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => { }} />

          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}

        />
      </SafeAreaView>
    </Background>
  );
}