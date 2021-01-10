const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 8082

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, function () {
    console.log('http://localhost:' + port)
});

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/ecpay.html'))
})

app.post('/ecpay', function (req, res) {
  const ecpay_payment = require(path.join(__dirname + '/ECPAY_Payment_node_js/index.js'))

  let base_param = {
    MerchantTradeNo: '12345678901' + String(Math.floor(Math.random() * 1000000000)), //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: '2017/02/13 15:45:30', //ex: 2017/02/13 15:45:30
    TotalAmount: String(req.body.number * 5),
    TradeDesc: '測試交易描述',
    ItemName: '測試商品等',
    ReturnURL: 'http://localhost:8082',
    // ChooseSubPayment: '',
    // OrderResultURL: 'http://192.168.0.1/payment_result',
    // NeedExtraPaidInfo: '1',
    ClientBackURL: 'http://localhost:8082',
    // ItemURL: 'http://item.test.tw',
    // Remark: '交易備註',
    // StoreID: '',
    // CustomField1: '',
    // CustomField2: '',
    // CustomField3: '',
    // CustomField4: ''
  };

  let create = new ecpay_payment()
  let htm = create.payment_client.aio_check_out_credit_onetime(parameters = base_param)

  res.send(htm)
})
