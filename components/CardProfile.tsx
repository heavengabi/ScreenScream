import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

type Props = {
  imagem: string;
  name: string;
  email: string;

};

const CardProfile = ({ imagem, name, email, desc }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        <Image source={{ uri: imagem }} style={styles.imagem} />
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    gap: 30,
  },

  fotoContainer: {
    backgroundColor: "#D32F2F",
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  imagem: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  info: {
    justifyContent: "center",
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: "white",
  },
});