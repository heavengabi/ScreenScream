import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CardProfile from "../components/CardProfile";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CardProfile
          imagem="https://images.unsplash.com/photo-1676385901228-64ad87402847?q=80&w=765&auto=format&fit=crop"
          name={"luiza"}
          email={"luiza@gmail.com"}
        />

      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1d1d1dff",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
