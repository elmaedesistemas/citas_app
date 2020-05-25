import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import shortId from 'shortid'

export const Form = ({ citas, setCitas, guardarMostrarForm }) => {

    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')

    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [contacto, setContacto] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

    const [sintomas, setSintomas] = useState('')

    // date
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = date => {
        const options = { year: 'numeric', month: 'long', day: '2-digit' }
        console.log(date.toLocaleDateString('es-ES', options))
        setDate(date.toLocaleDateString('es-ES', options))
        //console.warn('A date has been picked', date)
        hideDatePicker()
    }

    // hour
    const showTimePicker = () => {
        setTimePickerVisibility(true)
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false)
    }

    const handleTimeConfirm = hour => {
        const options = { hour: 'numeric', minute: '2-digit' }
        console.log(hour.toLocaleDateString('es-US', options))
        setHour(hour.toLocaleDateString('es-US', options))
        //console.warn('A date has been picked', date)
        hideTimePicker()
    }

    const saveCita = () => {
        console.log('wait')
        if (paciente.trim === '' || propietario.trim === '' || date.trim === '' ||
            hour.trim === '' || sintomas === '') {
            // fail validation
            showAlert()
            return
        }

        const cita = { paciente, propietario, contacto, date, hour, sintomas }
        cita.id = shortId.generate();
        console.log(cita)

        const newCitas = [...citas, cita]
        setCitas(newCitas)

        guardarMostrarForm(false)

    }

    // show aler if fail validation
    const showAlert = () => {
        Alert.alert(
            'Error', //title
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    // close keyboard
    const closeKeyboard = () => {
      Keyboard.dismiss()
    }



    return (
        <>
            <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.label}>Paciente: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setSintomas(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Dueño: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setPropietario(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}># Contacto: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setContacto(text)}
                            keyboardType='numeric'
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Fecha: </Text>
                        <Button title='Selecciona una Fecha' onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            locate='es_ES'
                            headerTextIOS='Elige una Fecha'
                            cancelTextIOS='Cancelar'
                            confirmTextIOS='Confirmar'
                        />
                        <Text>{date}</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Hora: </Text>
                        <Button title='Selecciona una Hora' onPress={showTimePicker} />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode='time'
                            onConfirm={handleTimeConfirm}
                            onCancel={hideTimePicker}
                            locate='es_ES'
                            headerTextIOS='Elige una Hora'
                            cancelTextIOS='Cancelar'
                            confirmTextIOS='Confirmar'
                            is24Hour
                        />
                        <Text>{hour}</Text>
                    </View>

                    <View>
                        <Text style={styles.label}>Sintomas: </Text>
                        <TextInput
                            multiline
                            style={styles.input}
                            onChangeText={(text) => setSintomas(text)}
                        />
                    </View>

                    <View>
                        <TouchableHighlight onPress={() => saveCita()} style={styles.btnSubmit}>
                            <Text style={styles.textSubmit}> Crear Nueva Cita </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'

    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})