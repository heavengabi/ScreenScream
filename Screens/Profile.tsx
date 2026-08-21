import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Perfil = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      <View style={styles.card}>
        <View style={styles.avatarBorder}>
          <Image
            source={{ uri: "https://picsum.photos/150" }}
            style={styles.foto}
          />
        </View>

        <Text style={styles.nome}>Gabriela</Text>
        <Text style={styles.email}>gabriela@email.com</Text>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#E63946", // Cor combinando com o coração dos favoritos
    marginBottom: 12,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
  },
});