import React from "react"
import { GestureResponderEvent, StyleSheet, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"



interface CommonFormProps {
    formJson: any
    fieldData: any
    handleChangInput: Function
    handelSubmit: Function
    handleOnClick?: Function
}



const CommonForm: React.FC<CommonFormProps> = ({ formJson, fieldData, handelSubmit, handleChangInput, handleOnClick }) => {
    return (
        <>
            {formJson?.map((form: any, index: number) => {
                return (
                    <View style={{ width: '100%' }} key={index}>
                        {form?.sectionType === 'header' && (
                            <View style={styles.header}>
                                <Text style={[styles.headerText, form?.titleStyle]}>{form?.title}</Text>
                            </View>
                        )}
                        {form?.sectionType === 'body' && (
                            <View >
                                {form?.child?.map((bodyChild: any, childIndex: number) => {
                                    return (
                                        <View style={{ marginVertical: 10 }} key={childIndex} >
                                            {(bodyChild?.inputType === 'text' || bodyChild?.inputType === undefined) && (
                                                <TextInput
                                                    label={bodyChild?.label ?? ''}
                                                    placeholder={bodyChild?.placeholder ?? ''}
                                                    onChangeText={(text) => handleChangInput(bodyChild, text)}
                                                    value={fieldData && fieldData[bodyChild.fieldName]}
                                                    secureTextEntry={bodyChild?.isPassword ?? false}
                                                    mode="outlined"
                                                    style={{ backgroundColor: 'transparent' }}
                                                />
                                            )}
                                            {bodyChild?.inputType === 'qrCode' && (
                                                // Render QR code input if necessary
                                                <></>
                                            )}
                                            {bodyChild?.inputType === 'button' && (
                                                <View>
                                                    <Button mode={bodyChild?.mode ?? 'contained'} onPress={(e: GestureResponderEvent) => handleOnClick && handleOnClick(bodyChild, e)}>
                                                        {bodyChild?.title}
                                                    </Button>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                        {form?.sectionType === 'footer' && (
                            <View style={{ marginTop: 20 }}>
                                <Button onPress={(e: GestureResponderEvent) => handelSubmit(e)} mode="contained">
                                    {form?.title}
                                </Button>
                            </View>
                        )}
                    </View>
                );
            })}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontFamily: 'FiraCode-SemiBold',
    },
});
export default CommonForm