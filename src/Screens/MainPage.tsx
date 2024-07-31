import React, { useEffect, useRef, useState } from 'react';
import {


    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusSvg from '../../assets/images/plus.svg'
import { Button, Divider, Text, TouchableRipple } from 'react-native-paper';
import NoDataSvg from '../../assets/images/nodata.svg'
import Animated from 'react-native-reanimated';

const MainPage = ({
    navigation,

}: { navigation: any }) => {
    const [data, setData] = useState<any[]>()
    const [storageData, setStorageData] = useState<any[]>()
    const [isDropDown, setIsDropDown] = useState(false)
    const [isOpenManual, setIsOpenManual] = useState(false)
    const { width, height } = Dimensions.get('window')
    const saveData = async (data: any) => {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('userData', jsonValue);
            console.log('Key saved securely!');
        } catch (error) {
            console.error('Failed to save the key securely:', error);
        }
    }
    const toggleAdd = () => {

        setIsDropDown(!isDropDown)
    }

    const getUserData = async () => {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue !== null) {
            const dataList: any[] = JSON.parse(jsonValue)
            return dataList
        }
    }

    useEffect(() => {
        if (data?.length && data.length > 0) {
            saveData(data)
            const fetchData = async () => {
                const userData = await getUserData();
                setStorageData(userData);
            };
            fetchData();
        }
    }, [data])
    return (
        <KeyboardAvoidingView style={styles.container} >
            {storageData?.length && storageData?.length > 0 ? <FlatList
                data={storageData}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={index}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text>{(item.seceretKey)}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            /> :

                <View style={{ flex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NoDataSvg /> </View>
            }

            <Animated.View style={isDropDown ? [styles.content, { bottom: 75, right: 20 }] : [{ display: 'none' }]}>
                <View style={styles.touchable}>

                    <TouchableOpacity onPress={() => { setIsOpenManual(true) }}><Text style={styles.detail}>Manually Add</Text></TouchableOpacity>
                </View>
                <Divider />
                <TouchableOpacity><Text style={styles.detail}>Scan QrCode</Text></TouchableOpacity>
                <Divider />
            </Animated.View>
            <TouchableOpacity onPress={toggleAdd} style={styles.svgContainer} >

                <PlusSvg width={50} height={50} />
            </TouchableOpacity>


        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',

    },
    touchable: { borderBottomColor: '#000', borderBottomWidth: 12 },

    detail: { fontFamily: 'FiraCode-Medium', fontSize: 20 },
    content: {
        position: 'absolute',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
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
    },
    svgContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 16,
        marginBottom: 16

    },
});
export default MainPage