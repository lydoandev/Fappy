import firebase from 'react-native-firebase'


export default async function getProductBySeller(id) {
    var refProducts = await firebase.database().ref("products").orderByChild('sellerId')
        .equalTo(id).once('value')
        .then(snapshot => {
            if (snapshot.val() != null) {
                return snapshot.val()
            }
        })
    var products = [];
    if (Array.isArray(refProducts)) {
        refProducts.map(item => {
            if (item != null) {
                products.push(item)
            }
        })
    } else {

        products = (Object.values(refProducts))
    }


    return products
}