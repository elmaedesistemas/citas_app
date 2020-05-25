import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export const Cita = ({ cita, erasePaciente }) => {

    const dialogoEliminar = (id) => {
        console.log('eliminar...', id)
        erasePaciente(id)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{cita.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{cita.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas: </Text>
                <Text style={styles.texto}>{cita.sintomas}</Text>
            </View>

            <View>
            <TouchableHighlight onPress={() => dialogoEliminar(cita.id)} style={styles.btnEliminar}>
              <Text style={styles.textEliminar}> Eliminar &times;</Text>
            </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomColor: '#E1E1E1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  label: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 20
  },
  texto: {
    fontSize: 18
  },
  btnEliminar: {
      padding: 10,
      backgroundColor: 'red',
      marginVertical: 10
  },
  textEliminar: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }
})