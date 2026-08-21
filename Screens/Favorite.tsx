import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CardMovie from "../components/CardMovie";

interface Movie {
  id: number;
  name: string;
  image?: {
    medium?: string;
  };
  genres?: string[];
  rating?: {
    average?: number;
  };
}

interface FavoritosProps {
  navigation: any;
}

const Favoritos = ({ navigation }: FavoritosProps) => {
  const [favoritos, setFavoritos] = useState<Movie[]>([]);

  const carregarFavoritos = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem("favoritos");

      if (favoritosSalvos) {
        setFavoritos(JSON.parse(favoritosSalvos));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.log("Erro ao carregar favoritos:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.titulo}>Meus Favoritos ❤️</Text>

      {favoritos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>
            Você ainda não favoritou nenhum filme.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardMovie
              filme={item}
              navigation={navigation}
              onFavoriteChange={carregarFavoritos}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  vazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  textoVazio: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
  },
});