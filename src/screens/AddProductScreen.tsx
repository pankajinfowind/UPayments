import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../utils/Constants'
const categoryTab = [
    {
        id: "1",
        title: "All",
    },
    {
        id: "2",
        title: "Accessories",
    },
    {
        id: "3",
        title: "Womens Wear",
    },
    {
        id: "4",
        title: "Mens Wear",
    },
    {
        id: "5",
        title: "Baby Wear",
    },
];
const AddProductScreen = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const formValidation = ()=>{
        if(title == ''){
            Alert.alert("product title is empty!")
        }else if(price == ''){
            Alert.alert("price is empty!")
        }else if(description == ''){
            Alert.alert('description is empty!')
        }else if(imageLink == ''){
            return Alert.alert('Image link is Empty')
            
            
        
        }else{
            Alert.alert("form filled")
        }
    }
    const isValidHttpUrl=()=> {
        
        // try {
        //   url = new URL(imageLink);
        //   console.log("newurl,..",url)
        // } catch (_) {
        //     console.log("invalid")
        //   return false;  
        // }
        console.log("validUrl")
        return url === "http:" || url === "https:";
      }
    const addProductBtn = () => {
        return (
            <>
                <View style={{ flex: 1 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={styles.addProBtnStyle}
                    onPress={()=>formValidation()}
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
                <FlatList style={styles.categoryListStyle}
                    bounces={true}
                    horizontal={true}
                    // style={{backgroundColor:'white'}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categoryTab}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity style={styles.categoryBtn_inActive}
                                    onPress={() => selectCateBtn(item.id)}
                                >
                                    <Text style={styles.catBtnTextStyle_inActive}>{item.title}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
            </View>)
    }
    return (
        <SafeAreaView style={styles.container}>
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
                <Text>women-category</Text>
            </View>
            {categoryList()}
            {addProductBtn()}
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
    catBtnTextStyle_inActive: {
        color: 'white',
        margin: 5
    },
    addProBtnStyle: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black
    }
})