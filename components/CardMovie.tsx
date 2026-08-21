import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

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

interface CardMovieProps {
  filme: Movie;
  navigation: any;
  onFavoriteChange?: () => void;
}

const CardMovie = ({
  filme,
  navigation,
  onFavoriteChange,
}: CardMovieProps) => {
  const [favoritado, setFavoritado] = useState(false);


  useFocusEffect(
    useCallback(() => {
      verificarFavorito();
    }, [filme.id])
  );

  const verificarFavorito = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem("favoritos");

      if (favoritosSalvos) {
        const favoritos: Movie[] = JSON.parse(favoritosSalvos);
        const existe = favoritos.some((item) => item.id === filme.id);
        setFavoritado(existe);
      } else {
        setFavoritado(false);
      }
    } catch (error) {
      console.log("Erro ao verificar favorito:", error);
    }
  };

  const favoritar = async () => {
    const estadoAnterior = favoritado;
    const novoEstado = !favoritado;

    // 1. Atualiza visualmente o ícone na hora
    setFavoritado(novoEstado);

    try {
      const favoritosSalvos = await AsyncStorage.getItem("favoritos");
      const favoritos: Movie[] = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

      let novosFavoritos: Movie[];

      if (estadoAnterior) {
        novosFavoritos = favoritos.filter((item) => item.id !== filme.id);
      } else {
        novosFavoritos = [...favoritos, filme];
      }

      await AsyncStorage.setItem("favoritos", JSON.stringify(novosFavoritos));

      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.log("Erro ao favoritar:", error);
      setFavoritado(estadoAnterior);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: filme.image?.medium,
        }}
        style={styles.imagem}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.nome} numberOfLines={1}>
          {filme.name}
        </Text>

        <Text style={styles.genero} numberOfLines={1}>
          {filme.genres?.[0] || "Sem gênero"}
        </Text>

        <Text style={styles.nota}>
          {filme.rating?.average ?? "Sem nota"}
        </Text>

        <Pressable
          onPress={() =>
            navigation.navigate("Detalhes", {
              id: filme.id,
            })
          }
          style={styles.btn}
        >
          <Ionicons name="play-outline" size={18} color="black" />
          <Text style={styles.text}>Ver detalhes</Text>
        </Pressable>
      </View>

      <Pressable onPress={favoritar} style={styles.favorito}>
        <Ionicons
          name={favoritado ? "heart" : "heart-outline"}
          size={25}
          color={favoritado ? "#E63946" : "#555"}
        />
      </Pressable>
    </View>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  imagem: {
    width: 80,
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
    height: 120,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  genero: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },
  nota: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
  btn: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: 4,
  },
  text: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "bold",
  },
  favorito: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
});