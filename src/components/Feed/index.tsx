import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, RefreshControl } from "react-native";
import { fazerChamadaAutenticada } from "../../service/api";
import {
  Post,
  Header,
  Avatar,
  Name,
  PostImage,
  Description,
  Ellipse,
  Icons,
} from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const Feed = () => {
  const [dados, setDados] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await fazerChamadaAutenticada("foto/list");
      setDados(dadosRecebidos);
    } catch (erro) {
      console.error("Erro ao carregar dados autenticados:", erro);
      Alert.alert("Erro", "Não foi possível carregar os dados autenticados.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarDados();
  };

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onEndReachedThreshold={0.1}
        data={dados}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar
                source={{
                  uri: `data:image/jpeg;base64,${item.autor.fotoPerfil}`,
                }}
              />
              <Name>{item.autor.usuario}</Name>
              <Ellipse>
                <FontAwesome5 name="ellipsis-v" size={24} color="black" />
              </Ellipse>
            </Header>

            <PostImage
              source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
            />
            <Icons>
              <Ionicons name="ios-heart-outline" size={24} color="black" />
              <Ionicons name="md-chatbubble-outline" size={24} color="black" />
            </Icons>
            <Description>
              <Name>{item.autor.usuario}</Name> {item.descricao}
            </Description>
          </Post>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Feed;