

import React, { useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { styles } from './LoginScreen'
import CommonForm from '../CommonComponents/CommonForm'
import { signUpForm } from '../CommonJson/SignUpJson'

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [fieldData, setFieldData] = useState()
    const handleChangInput = (field: any, e: any) => {

    }
    const handelSubmit = () => {
        navigation.navigate('Main')
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <View style={styles.childContainer}>
                <CommonForm
                    formJson={signUpForm}
                    fieldData={fieldData}
                    handleChangInput={handleChangInput}
                    handelSubmit={handelSubmit}
                />
            </View>
        </KeyboardAvoidingView>
    )
}


export default SignUpScreen