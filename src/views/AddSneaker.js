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
import DatePicker from 'react-native-date-picker';

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
    paddingTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  datePicker: {
    margin: 'auto',
    width: 400,
  },
});

const AddSneaker = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState(new Date());
  async function handleSubmit() {
    await mutate({name, brand, size, date});
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
        <Text style={styles.label}>Marca </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Añade la marca de la zapatilla"
          onChangeText={(text) => setBrand(text)}
          value={brand}
        />
        <Text style={styles.label}>Talla </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Añade la talla de la zapatilla"
          onChangeText={(text) => setSize(text)}
          value={size}
        />
        <Text style={styles.label}>Fecha de compra </Text>
        <DatePicker
          style={styles.datePicker}
          date={date}
          onDateChange={setDate}
          mode="date"
          locale="es"
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
