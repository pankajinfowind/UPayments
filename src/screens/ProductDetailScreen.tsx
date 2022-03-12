import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/Constants'
import { ProductDetails } from '../network/ApiManager'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProductDetailScreen = (props) => {

    const [isLoading, setLoading] = useState(true)
    const [product, setProduct] = useState()

    useEffect(() => {
        if (props?.route?.params?.id) {
            getCategories(props?.route?.params?.id)
        }
    }, []);
    const getCategories = (id: string) => {
        ProductDetails(id).then(async response => {
            setLoading(false)
            console.log(
                "Product details is = ",
                response.data
            );
            if (response.data) {
                setProduct(response.data)
            }
        }).catch(async error => {
        })
    }
    const loader = () => {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {product ?
                <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
                    <View style={styles.imageViewStyle} >
                        <Image style={{ width: '100%', height: 300 }} resizeMode='contain' source={{ uri: product.avatar }} />
                    </View>
                    <View style={styles.blackView}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 30 }}>
                            <Text style={styles.productNameTextStyle}>{product.name}</Text>
                            <View style={{ flex: 1 }}></View>
                            <Text style={{ color: COLORS.white, justifyContent: 'flex-end', fontWeight: 'bold' }}>${product.price}</Text>
                        </View>
                        <View style={styles.productDisTextStyle}>
                            <Text style={{ color: COLORS.white }}>
                                {product.description}
                            </Text>
                        </View>
                    </View>

                </ScrollView> : null}
            {isLoading ? loader() : null}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    imageViewStyle: {
        width: '100%',
        height: 350,

        backgroundColor: 'white'
    },
    blackView: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'black',
        top: -20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    productDisTextStyle: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    productNameTextStyle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 20
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
export default ProductDetailScreen;