import React, { FC, useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deletePub, editPub } from "../../service/api";
import {
  Container,
  EditWindow,
  Header,
  Buttons,
  StyledButton,
  ButtonText,
  TexEdit,
  DescriptionEdit,
  Salvar,
  Deletar,
  TextButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface EditModalProps {
  isVisible: boolean;
  onClose: () => void;
  description: string | null;
  imageId: string | null;
}

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  onClose,
  description,
  imageId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(description || ""); // Inicializa com a descrição atual ou uma string vazia se for nula
  const navigation = useNavigation();
  

  const deletePublish = () => {
    if (imageId) {
      deletePub(`foto/${imageId}`);
      console.log("Deletado com sucesso");
      Alert.alert("Deletado com sucesso.");
      navigation.navigate("Home");
    }
  };

  const editImageDescription = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    console.log(imageId);
    editPub(`foto/${imageId}`, editedText);
    console.log("Editado com sucesso");
    Alert.alert("Editado com sucesso.");
    setIsEditing(false);
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <Container>
        <EditWindow>
          <Header>
            <Text>Opções</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={25} color="black" />
            </TouchableOpacity>
          </Header>
          {isEditing ? (
            <DescriptionEdit>
              <TexEdit
                placeholder="Edite sua descrição aqui"
                value={editedText}
                onChangeText={(text) => setEditedText(text)}
              />
              <Salvar onPress={saveChanges}>
                <TextButton>Salvar</TextButton>
              </Salvar>

              <Deletar onPress={onClose}>
                <TextButton>Cancelar</TextButton>
              </Deletar>
            </DescriptionEdit>
          ) : (
            <Buttons>
              <StyledButton onPress={editImageDescription}>
                <Ionicons name="pencil-outline" size={25} color="black" />
                <ButtonText>Editar</ButtonText>
              </StyledButton>
              <StyledButton onPress={deletePublish}>
                <Ionicons name="trash" size={25} color="black" />
                <ButtonText>Deletar</ButtonText>
              </StyledButton>
            </Buttons>
          )}
        </EditWindow>
      </Container>
    </Modal>
  );
};

export default EditModal;
