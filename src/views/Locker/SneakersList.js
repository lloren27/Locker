import React from 'react';
import {useQuery} from 'react-query';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import SneakerListItem from '../../components/SneakerListItem';
import SneakerServices from '../../services/SneakerServices';

//useState se utiliza para almacenar datos en el estado del componente.
// podemos definir nuestra llamada fuera para usarlar en el query
// async function fetchData() {
//   const response = await fetch();
//   const json = await response.json();
//   return json;
// }

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const SneakersList = ({navigation}) => {
  // a Use state le pasamos su valor inicial , y recoge el valor y crea un metodo para setearlos.
  // para recuperar de la api usaremos funcion propia de Js fetch y despues el hook useEfect para recuperar esa lista de libros despues del primer render
  function handleOnPress() {
    navigation.navigate('SneakerDetail');
  }

  // Queries llamada a la api usando el paquete react-query primero hay q pasar una clave , el segundo parametro es una llamada asincrona q queremos ejecutar
  // esta funcion useQuery devuelve un objeto info con tres objetos dentro de él, esto te quitaria el hookuse State
  const {status, data, error} = useQuery(
    'GET_SNEAKERS',
    SneakerServices.getSneackers,
  );

  // ejecuta la funcion dentro de este despues del render, recibe la funcion y un array de dependencias para decirle cuando queremos q se ejecute
  // dentro de la función fetch ira la url de la api q recupera nuestros datos. metemos un async await a la funcion y transformamos en json el resltado
  // para hacer asincrono el useEffect hay que encapsular la llamada a la api en una función y esta si sera asincrona.
  // hay q pasar un segundo parametro a esta funcion para que no se ejecute infinitamente es un array q si lo pasamos vacio solo se ejecutara una vez y si le pasamos una referencia no se llamara a la api hasta q cambie esta referencia

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch();
  //     const json = await response.json();
  //     setSneaker(json.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <View>
      <Text style={styles.title}>My locker</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <SneakerListItem sneakers={item} onPress={handleOnPress} />
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          <View>{status === 'loading' && <Text> Cargando... </Text>}</View>
        }
      />
    </View>
  );
};

export default SneakersList;
