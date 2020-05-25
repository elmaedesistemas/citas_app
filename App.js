/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, FlatList, ScrollView, TouchableHighlight, Platform } from 'react-native';

import { Cita } from './app/components/Cita'
import { Form } from './app/components/Form'

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false)

  const [citas, setCitas] = useState([]);

  // erase paciente
  const erasePaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.title}>Administrador de Citas</Text>

      <View>
        <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnShow}>
          <Text style={styles.textShow}> { mostrarForm ? 'Ver Citas' : 'Crear Nueva Cita' }</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.content}>
        {mostrarForm ? (
          <View>
            <Text style={styles.title}>Crear Nueva Cita</Text>
            <Form citas={citas} setCitas={setCitas} guardarMostrarForm={guardarMostrarForm} />
          </View>

        ) : (
            <View>
              <Text style={styles.title}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
              <FlatList
                data={citas}
                renderItem={({ item }) => (
                  <Cita cita={item} erasePaciente={erasePaciente} />
                )}
                keyExtractor={cita => cita.id}
                style={styles.list}
              />
            </View>
          )}
      </View>
    </ScrollView>

  );
};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AA0768',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  list: {
    flex: 1
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnShow: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
  },
  textShow: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
