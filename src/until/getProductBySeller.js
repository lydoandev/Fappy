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
    var keys = Object.keys(refProducts);
    keys.map(key => {
       products.push({...refProducts[key], id: key})
    })
    return products
}