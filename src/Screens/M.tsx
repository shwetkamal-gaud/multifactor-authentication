import React, { useEffect, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlusSvg from '../../assets/images/plus.svg'
import { Text, } from 'react-native-paper';
import NoDataSvg from '../../assets/images/nodata.svg'
import Animated from 'react-native-reanimated';
import CommonForm from '../CommonComponents/CommonForm';
import { manualAdd } from '../CommonJson/ManualAdd';
import TOTP from '../TOTP_CODE/totp';

const MainPage = ({
    navigation,

}: { navigation: any }) => {
    const [data, setData] = useState<any[]>()
    const [storageData, setStorageData] = useState<any[]>()
    const [isDropDown, setIsDropDown] = useState(false)
    const [isOpenManual, setIsOpenManual] = useState(false)
    const [fieldData, setFieldData] = useState({})
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
    const handleChangInput = (bodyChild: any, text: string) => {
        let data = fieldData
        setFieldData({ ...data, [bodyChild]: text })
    }
    const handleSubmit = () => {
        setIsOpenManual((prev) => !prev)

        setData((prevData) => {
            const updatedData = [...(prevData || []), fieldData];
            return updatedData;
        });
        setFieldData({})
    }

    useEffect(() => {
        if (data?.length && data.length > 0) {
            saveData(data)
            const fetchData = async () => {
                const userData = await getUserData();

                const updatedData = userData?.map((item: any) => ({
                    totp: new TOTP(item?.security_code).value(),
                    email: item?.email
                }));
                setStorageData(updatedData);

            };
            fetchData()
            const interval = setInterval(() => {
                fetchData();
            }, 30000);
            return () => clearInterval(interval);
        }

    }, [data])
    // console.log(new TOTP('nfwn 2a3i 7drn 6okt jfom norb hezi e3ex').value())

    return (
        <KeyboardAvoidingView style={styles.container} >
            {storageData && storageData.length > 0 ?

                <FlatList style={styles.flatList}
                    data={storageData}
                    renderItem={({ item, index, separators }) => (
                        <TouchableHighlight
                            key={index}
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}
                        ><View style={styles.viewContainer}>
                                <Text style={{ fontFamily: 'FiraCode-Regular', fontSize: 20 }}>{`Email: ${item?.email}`}</Text>
                                <Text style={{ fontFamily: 'FiraCode-Regular', fontSize: 20 }}>{`Code: ${item?.totp}`}</Text>

                            </View></TouchableHighlight>
                    )}
                /> : <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NoDataSvg /></View>}
            {isOpenManual ? <Animated.View style={styles.card}>
                <CommonForm
                    formJson={manualAdd}
                    fieldData={fieldData}
                    handleChangInput={handleChangInput}
                    handelSubmit={handleSubmit}
                />
            </Animated.View> : null}
            <Animated.View style={isDropDown ? [styles.content, { bottom: 75, right: 20 }] : [{ display: 'none' }]
            }>
                <View style={styles.touchable}>
                    <TouchableOpacity onPress={() => { setIsDropDown(false); setIsOpenManual(true) }}><Text style={styles.detail} >Manually Add</Text></TouchableOpacity>
                </View>

                <TouchableOpacity><Text style={styles.detail}>Scan QrCode</Text></TouchableOpacity>

            </Animated.View>
            <TouchableOpacity onPress={toggleAdd} style={styles.svgContainer} ><PlusSvg width={50} height={50} />
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    touchable: { borderBottomColor: '#000', borderBottomWidth: 1 },

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
    card: {
        padding: 20,
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
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
    viewContainer: {
        backgroundColor: 'white',
        padding: 4

    },
    flatList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        padding: 10
    }
});
export default MainPage