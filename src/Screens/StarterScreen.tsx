import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import AppSvg from '../../assets/images/app.svg'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const StarterScreen = ({ navigation }: { navigation: any }) => {
    const onButtonClick = () => {
        navigation.navigate('Login')
    }
    return (

        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

            <Text style={styles.header}>Multi Factor Autnetication</Text>
            <View style={styles.svgView}>
                <AppSvg width={450} height={450} />
            </View>
            <View style={{ display: 'flex', marginBottom: 10 }}>

                <Button mode='contained' onPress={onButtonClick}> Let's Start</Button>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontFamily: 'FiraCode-SemiBold',
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    svgView: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    svg: {
        width: 450,
        height: 450
    }

})
export default StarterScreen