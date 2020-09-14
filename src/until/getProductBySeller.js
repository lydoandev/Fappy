import database from '@react-native-firebase/database';


export default async function getProductBySeller(id) {
    var refProducts = await database().ref("products").orderByChild('sellerId')
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