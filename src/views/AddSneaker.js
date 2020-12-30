import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import {queryCache, useMutation} from 'react-query';
import SneakerServices from '../services/SneakerServices';

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    paddingBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

const AddSneaker = () => {
  const [name, setName] = useState('');
  async function handleSubmit() {
    await mutate({name});
  }
  // tiene que devolver una función asincrona para realizar la llamada a la api
  const [mutate, {isLoading}] = useMutation(SneakerServices.createSneaker, {
    onSuccess: function () {
      queryCache.invalidateQueries('GET_SNEAKERS');
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Añade el nombre de la zapatilla"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Button
          onPress={handleSubmit}
          style={styles.button}
          title="Añadir Zapatilla"
        />
        {isLoading && <Text>Añadiendo zapatilla a tu armario.</Text>}
      </View>
    </SafeAreaView>
  );
};

export default AddSneaker;
