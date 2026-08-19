import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMovie from "../components/CardMovie";

const Home = () => {
  const [nomeFilme, setNomeFilme] = useState("");
  const [filme, setFilme] = useState<any[]>([]);

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");

        const dados = await response.json();

        setFilme(dados);
      } catch (error) {
        console.log("Erro na busca:", error);
      }
    };

    buscarFilmes();
  }, []);

  const filmesFiltrados = filme.filter((item) =>
    item.name.toLowerCase().includes(nomeFilme.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        value={nomeFilme}
        onChangeText={setNomeFilme}
      />

      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardMovie filme={item} />}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
