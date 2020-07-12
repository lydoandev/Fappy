const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const messaging = admin.messaging()

const OrderStatus = {
  waiting: 'Đang chờ',
  accepted: 'Đã xác nhận',
  canceled: 'Đã hủy',
  fixed: 'Hoàn thành'
}

function getNotification(order) {
  switch (order.status) {
    case OrderStatus.waiting:
      return {
        title: "Cuốc xe mới",
        body: 'Bạn có một cuốc mới cách đây ' + (order.distance / 1000) + ' km. Địa chỉ: ' + order.user.location.address,
        sound: 'default'
      }
    case OrderStatus.accepted:
      return {
        title: 'Cuốc xe của bạn đã được chấp nhận',
        body: 'Vui lòng chờ trong giây lát, chúng tôi sẽ liên lạc với bạn ngay',
        sound: 'default'
      }
    case OrderStatus.canceled:
      return {
        title: `Cuốc xe của bạn đã bị huỷ`,
        body: `Cuốc xe bị huỷ vì cửa hàng đang bận. Vui lòng chọn cửa hàng khác`,
        sound: 'default'
      }
    case OrderStatus.fixed:
      return {
        title: `Cuốc xe hoàn thành`,
        body: `Cảm ơn bạn đã tin dùng dịch vụ của chúng tôi`,
        sound: 'default'
      }
    default:
      break
  }
}

function getTargetNotification(order) {
  switch (order.status) {
    case OrderStatus.waiting:
      return order.station.deviceToken
    case OrderStatus.accepted:
    case OrderStatus.canceled:
      return order.user.deviceToken
    case OrderStatus.fixed:
      return [order.station.deviceToken, order.user.deviceToken]
    default:
      break
  }
}

exports.triggerOrderCreated = functions.database.ref('orders/{id}')
  .onCreate(async (snapshot, context) => {
    const order = snapshot.val()
    const token = order.station.deviceToken
    const payload = {
      notification: getNotification(order),
      data: {
        order: JSON.stringify(order)
      }
    }
    await messaging.sendToDevice(token, payload)
  })

exports.triggerOrderUpdated = functions.database.ref('orders/{id}')
  .onUpdate(async (change, context) => {
    const order = change.after.val()
    const token = getTargetNotification(order)
    const payload = {
      notification: getNotification(order),
      data: {
        order: JSON.stringify(order)
      }
    }
    await messaging.sendToDevice(token, payload)
  })