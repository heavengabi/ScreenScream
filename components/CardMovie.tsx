import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Favorite from "../Screens/Favorite";
import Details from "../Screens/Details";

interface Movie {
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

}

const CardMovie = ({ filme, }: CardMovieProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: filme.image?.medium || "https://via.placeholder.com/210x295",
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
          ⭐ {filme.rating?.average ?? "Sem nota"}
        </Text>
        <View style={styles.btn}>
          <Pressable onPress={Details}>
            <Text>Ver detalhes..</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CardMovie;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    justifyContent: "center",
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  genero: {
    fontSize: 13,
    color: "#666666",
    marginTop: 4,
  },

  nota: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
    color: "#333333",
  },

  btn:{
    backgroundColor:"red",
    width:200,
    height:20,
    alignItems:"center",
    right:-50
  }
});
