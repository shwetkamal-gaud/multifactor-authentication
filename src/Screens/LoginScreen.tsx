import React, { useState } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import CommonForm from '../CommonComponents/CommonForm'
import { loginForm } from '../CommonJson/LoginJson'

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [fieldData, setFieldData] = useState({})
    // const { width } = Dimensions.get('window');
    const handleChangInput = (field: any, e: any) => {
        let data = fieldData
        setFieldData({...data, field,e})
    }
    const handelSubmit = () => {
        navigation.navigate('Main')
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <View style={styles.childContainer}>

                <CommonForm
                    formJson={loginForm}
                    fieldData={fieldData}
                    handleChangInput={handleChangInput}
                    handelSubmit={handelSubmit}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#77E4C8'
    },
    childContainer: {
        width: Dimensions.get('window').width - 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        padding: 20

    }
})


export default LoginScreen