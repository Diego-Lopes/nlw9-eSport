import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';

import { styles } from './styles';
import logo from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])

  useEffect(() => {
    fetch("http://192.168.2.79:3333/games")
      .then(response => response.json())
      .then(data => setGames(data));
  }, [])



  //função de navegação de rotas
  const navigation = useNavigation();
  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>

      <SafeAreaView style={styles.container} >
        <Image
          source={logo}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."

        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )
          }
          horizontal
          showsHorizontalScrollIndicator={false}

          contentContainerStyle={styles.contentList}
        />



      </SafeAreaView>
    </Background>

  );
}