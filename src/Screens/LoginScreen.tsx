import React, { useState } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import CommonForm from '../CommonComponents/CommonForm'
import { loginForm } from '../CommonJson/LoginJson'
import TOTP from '../TOTP_CODE/totp';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [fieldData, setFieldData] = useState()
    const { width } = Dimensions.get('window');
    const handleChangInput = (field: any, e: any) => {

    }
    const handelSubmit = () => {
        //console.log(generateOTP('4mam saug w42d i3f6 fou2 o6k7 utox jpfw'))
        const totp = new TOTP('n6ie upe5 62le xy4k feeq xi6j oi2v lpvj')
        console.log(totp.value())
        navigation.navigate('SignUp')
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