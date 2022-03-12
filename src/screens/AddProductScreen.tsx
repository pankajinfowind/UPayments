import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, Keyboard, DeviceEventEmitter, ActivityIndicator, Dimensions } from 'react-native';
import { COLORS, EMPTY_TITLE, EMPTY_PRICE, EMPTY_DESCRIPTION, EMPTY_IMAGELINK, INVALID_IMAGEURL, EMPTY_CATEGORY, SUCCESS, PRODUCT_CREATED, OKAY_BTN, CANCEL_BTN } from '../utils/Constants'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { AddNewProduct, CategoryList } from '../network/ApiManager'
const AddProductScreen = (props) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [categories, setCategories] = useState()
    const [selectedCat, setSelectedCat] = useState()
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        getCategories()
    }, []);
    const getCategories = () => {
        CategoryList().then(async response => {
            if (Array.isArray(response.data)) {
                setCategories(response.data)
            } else {
                Alert.alert("Something went wrong please try again.")
            }
        }).catch(async error => {
        })
    }
    const formValidation = () => {
        if (title == '') {
            Alert.alert(EMPTY_TITLE)
        } else if (price == '') {
            Alert.alert(EMPTY_PRICE)
        } else if (description == '') {
            Alert.alert(EMPTY_DESCRIPTION)
        } else if (imageLink == '') {
            Alert.alert(EMPTY_IMAGELINK)
        } else if (!isValidImageUrl(imageLink)) {
            Alert.alert(INVALID_IMAGEURL)
        } else if (selectedCat == undefined) {
            Alert.alert(EMPTY_CATEGORY)
        } else {
            let product = { name: title, avatar: imageLink, price: price, description: description, category: selectedCat.name }
            setLoading(true)
            AddNewProduct(product).then(async response => {
                setLoading(false)
                if (response?.data != undefined) {
                    DeviceEventEmitter.emit('ProductAdded');
                    Alert.alert(
                        SUCCESS,
                        PRODUCT_CREATED,
                        [
                            {
                                text: OKAY_BTN,
                                onPress: () => props.navigation?.pop(),
                                style: CANCEL_BTN,
                            },
                        ]
                    );
                }
            }).catch(async error => {
                setLoading(false)
                Alert.alert('Failed. \n Please try again.')
            })
        }
    }
    const isValidImageUrl = (imageUrl: string) => {
        let Regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        return Regex.test(imageUrl)
    }
    const addProductBtn = () => {
        return (
            <>
                <View style={{ flex: 1 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={styles.addProBtnStyle}
                        onPress={() => formValidation()}
                    >
                        <Text style={{ margin: 5, color: COLORS.white }}>Add Product</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                </View>

            </>
        )
    }
    const categoryList = () => {
        return (
            <View>
                {categories ?
                    <FlatList style={styles.categoryListStyle}
                        bounces={true}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <TouchableOpacity style={selectedCat?.id == item.id.toString() ? styles.categoryBtn_active : styles.categoryBtn_inActive}
                                        onPress={() => setSelectedCat(item)}
                                    >
                                        <Text style={selectedCat?.id == item.id.toString() ? styles.catBtnTextStyle_active : styles.catBtnTextStyle_inActive}>{item.name}</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                        }
                        keyExtractor={(item, index) => index.toString()}
                    ></FlatList> : null}
            </View>)
    }
    const loader = () => {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
            <TextInput
                style={styles.input}
                placeholder={"Product title"}
                placeholderTextColor={'darkgray'}
                onChangeText={newText => setTitle(newText)}
                value={title}
            />
            <TextInput
                style={styles.input}
                placeholder={"Price"}
                keyboardType={'decimal-pad'}
                placeholderTextColor={'darkgray'}
                onChangeText={newText => setPrice(newText)}
                value={price}
            />
            <TextInput
                style={styles.inputDescription}
                placeholder={"Description"}
                multiline={true}
                placeholderTextColor={'darkgray'}
                onChangeText={newText => setDescription(newText)}
                value={description}
            />
            <TextInput
                style={styles.input}
                placeholder={"Image Link"}
                placeholderTextColor={'darkgray'}
                onChangeText={newText => setImageLink(newText)}
                value={imageLink}
            />
            <View style={{ flexDirection: 'row', margin: 12, }}>
                <Text>Selected Category:</Text>
                <Text>{selectedCat ? selectedCat.name : null}</Text>
            </View>
            {categoryList()}
            {addProductBtn()}
            {isLoading ? loader() : null}
        </SafeAreaView>
    )
}
export default AddProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
    },
    inputDescription: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
    },
    categoryListStyle: {
        width: '100%',
        height: 30,
        marginTop: 10,
    },
    categoryBtn_inActive: {
        borderRadius: 5,
        marginLeft: 20,
        flex: 1,
        borderWidth: 1,
        backgroundColor: 'black',
    },
    categoryBtn_active: {
        borderRadius: 5,
        marginLeft: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    catBtnTextStyle_inActive: {
        color: 'white',
        margin: 5
    },
    catBtnTextStyle_active: {
        color: 'black',
        margin: 5
    },
    addProBtnStyle: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black
    },
    loaderView: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})