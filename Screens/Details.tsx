import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

const Details = ({ route }: any) => {
  const id = route.params?.id;

  const [filme, setFilme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function buscarDetalhes() {
      try {
        setLoading(true);
        console.log("Buscando filme:", id);

        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        );
        const data = await response.json();
        setFilme(data);
      } catch (error) {
        console.log("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    }

    buscarDetalhes();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#7c344f" />
        <Text style={styles.carregando}>Carregando...</Text>
      </View>
    );
  }

  if (!id || !filme) {
    return (
      <View style={styles.loading}>
        <Text style={styles.carregando}>
          Selecione um filme para ver os detalhes.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: filme.image?.original || filme.image?.medium,
        }}
        style={styles.image}
      />

      <View style={styles.informacoes}>
        <Text style={styles.nome}>{filme.name}</Text>

        <Text style={styles.texto}>
          ⭐ Nota: {filme.rating?.average || "Sem nota"}
        </Text>

        <Text style={styles.texto}>
          📅 Estreia: {filme.premiered || "Não informado"}
        </Text>

        <Text style={styles.texto}>
          🎬 Gênero: {filme.genres?.join(", ") || "Não informado"}
        </Text>

        <Text style={styles.texto}>
          🌎 Idioma: {filme.language || "Não informado"}
        </Text>

        <Text style={styles.texto}>
          📺 Status: {filme.status || "Não informado"}
        </Text>

        <Text style={styles.titulo}>Sinopse</Text>

        <Text style={styles.sinopse}>
          {filme.summary
            ? filme.summary.replace(/<[^>]*>/g, "")
            : "Sinopse não disponível."}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2929",
  },
  loading: {
    flex: 1,
    backgroundColor: "#2b2929",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  carregando: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 450,
  },
  informacoes: {
    padding: 20,
  },
  nome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
});