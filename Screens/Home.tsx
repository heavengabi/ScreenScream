import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMovie from "../components/CardMovie";

interface HomeProps {
  navigation: any;
}

const Home = ({ navigation }: HomeProps) => {
  const [nomeFilme, setNomeFilme] = useState("");
  const [filme, setFilme] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const dados = await response.json();
        setFilme(dados);
      } catch (error) {
        console.log("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarFilmes();
  }, []);

  const filmesFiltrados = filme.filter((item) =>
    item.name.toLowerCase().includes(nomeFilme.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor="#888"
        value={nomeFilme}
        onChangeText={setNomeFilme}
      />

      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardMovie filme={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#2b2929",
    color: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});