
import React, { useEffect, useState } from 'react';
import { Image, Text, View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { HEADER_TITLE } from '../utils/Constants'
import { ProductList, CategoryList } from '../network/ApiManager'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const allCate = {
    id: "0",
    name: "All",
}

const HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState()
    const [filterProducts, setFilterProducts] = useState()
    const [isLoading, setLoading] = useState(true)
    const [filter, setFiler] = useState("0")
    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = () => {
        CategoryList().then(async response => {
            if (Array.isArray(response.data)) {
                let cats = response.data
                cats.splice(0, 0, allCate);
                setCategories(cats)
                getProducts()
            } else {
                Alert.alert("Something went wrong please try again.")
            }
        }).catch(async error => {
        })
    }
    const getProducts = () => {
        ProductList().then(async response => {
            setLoading(false)
            if (Array.isArray(response.data)) {
                setProducts(response.data)
                setFilterProducts(response.data)
            } else {
                Alert.alert("No product availabe.")
            }
        }).catch(async error => {
            console.log("Hello error occuring")
        })
    }
    const applyFilter = (category: string, id: string) => {
        if (id == filter) { return }
        setFiler(id)
        console.log("params is = ",category,id)
        if (id == "0") {
            setFilterProducts(products)
        } else {
            let filterArray = products.filter((item) => item.category == category)
            setFilterProducts(filterArray)
        }
        
    }
    const categoryList = () => {
        return (
            <View>
                <FlatList style={styles.categoryListStyle}
                    bounces={true}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity style={filter == item.id.toString() ? styles.categoryBtn_active : styles.categoryBtn_inActive}
                                    onPress={() => applyFilter(item.name,item.id.toString())}
                                >
                                    <Text style={filter == item.id.toString() ? styles.catBtnTextStyle_active : styles.catBtnTextStyle_inActive}>{item.name}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
            </View>)
    }
    const productList = () => {
        return (
            <FlatList style={{ flex: 1 }}
                bounces={true}
                numColumns={2}
                data={filterProducts}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <TouchableOpacity style={styles.productListStyle}
                                onPress={() => navigation.navigate('ProductDetail',{id:item.id})}
                            >
                                <Image style={{ top: 16, height: 120, width: '80%' }}
                                    resizeMode='contain'
                                    source={{
                                        uri: item.avatar,
                                    }} />
                                <View style={{ flex: 1 }}></View>
                                <View style={styles.prodListBlackStyle}>
                                    <Text numberOfLines={2} style={styles.productTitle} >{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }
                }
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>)
    }
    const addProductButton = ()=>{
        return(
            <TouchableOpacity style={styles.addProductBtn}
            onPress={()=>navigation.navigate('AddProduct')}
            >
                <Text style={{fontSize:30,fontWeight:'bold'}}>+</Text>
            </TouchableOpacity>
        )
    }
    const loader = () => {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>
                    {HEADER_TITLE}
                </Text>
            </View>
            {categories ? categoryList() : null}
            {products ? productList() : null}
            {isLoading ? loader() : null}
            {addProductButton()}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerStyle: {
        width: '100%',
        height: 60,
        justifyContent: 'center'
    },
    headerTextStyle: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 18
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
    productListStyle: {
        backgroundColor: 'white',
        width: '48%',
        margin: 4,
        height: 200,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        alignItems: 'center'
    },
    prodListBlackStyle: {
        width: '100%',
        borderRadius: 10,
        height: 50,
        backgroundColor: 'black'
    },
    loaderView: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productTitle: { margin: 6, color: 'white', fontWeight: 'bold' },
    addProductBtn:{alignSelf:'flex-end',right:20,bottom:50,marginRight:20,position:'absolute',borderRadius:30,justifyContent:'center',alignItems:'center',width:50,height:50,borderWidth:2,backgroundColor:'white'}
})

export default HomeScreen;