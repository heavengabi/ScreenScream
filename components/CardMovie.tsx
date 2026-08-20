import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
}

const CardMovie = ({ filme, navigation }: CardMovieProps) => {
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
          ⭐ {filme.rating?.average ?? "Sem nota"}
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
    left:100
  },
  text: {
    fontSize: 13,
    color: "#000000ff",
    fontWeight: "bold",
  },
});