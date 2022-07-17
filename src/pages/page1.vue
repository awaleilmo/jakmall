<template>
  <div style="width: 92vw">
    <v-stepper non-linear elevation="0" v-model="e1" class="mt-10" flat style="overflow: initial">
      <v-row class="up" justify="center" no-gutters>
        <v-stepper-header class="rounded-pill" :style="'box-shadow: 0 0 0; width: 100%; background-color:'+colorBG">
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
          >
            <label :style="'color:'+colorDefault"> Delivery</label>
          </v-stepper-step>

          <v-icon large color="primary">mdi-chevron-right</v-icon>

          <v-stepper-step
              :complete="e1 > 2"
              step="2"
          >
            <label :style="'color:'+colorDefault">Payment</label>
          </v-stepper-step>

          <v-icon large color="primary">mdi-chevron-right</v-icon>

          <v-stepper-step step="3" :complete="e1 > 2">
            <label :style="'color:'+colorDefault">Finish</label>
          </v-stepper-step>
        </v-stepper-header>
      </v-row>
      <br>
      <v-btn
          v-if="e1 < 3"
          class="transparent ml-5"
          tile
          small
          elevation="0"
          @click="back()"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        {{ btnBack }}
      </v-btn>
      <br>
      <v-row justify="center" align-content="center">
        <v-col cols="9">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                  class="mb-12"
                  height="auto"
                  elevation="0"
              >
                <v-card-title>
                  <v-row>
                    <v-col>
                      <b :style="'font-size: xxx-large; text-shadow: gray 1px 2px 2px; color:'+colorDefault ">Delivery
                        details</b>
                    </v-col>
                    <v-col class="d-flex align-end flex-column">
                      <v-checkbox class="pa-2" on-icon="mdi-checkbox-marked-outline" color="success"
                                  v-model="dropshipper" label="Send as dropshipper" @click="dropshipperClick(); local()"/>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                  >
                    <v-row>
                      <v-col class="ml-2 mr-2">
                        <v-row>
                          <v-text-field
                              color="secondary"
                              v-model="model.email"
                              :rules="[rules.required, rules.email]"
                              label="E-mail"
                              required
                              outlined
                              :append-icon="success.email ? 'mdi-check' : 'mdi-alert-box-outline'"
                              @keyup="valids('email'); local()"
                              :success="success.email"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              prepend-inner-icon="mdi-swap-horizontal"
                              color="secondary"
                              type="number"
                              v-model="model.phone"
                              :rules="[rules.required, rules.min, rules.max]"
                              :label="'Phone Number ' + defaultKode"
                              require
                              outlined
                              pattern="\d{1,5}"
                              :append-icon="success.phone ? 'mdi-check' : 'mdi-alert-box-outline'"
                              @keyup="valids('phone'); local()"
                              @change="valids('phone')"
                              :success="success.phone"
                              @click:prepend-inner="dialog=true"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-textarea
                              v-model="model.address"
                              :rules="[rules.required, rules.maxAddress]"
                              :counter="120"
                              color="secondary"
                              required
                              outlined
                              :success="model.address.length > 3"
                              :append-icon="model.address.length > 3 ? 'mdi-check' : 'mdi-alert-box-outline'"
                              label="Delivery Address"
                              @keyup="local()"
                          />
                        </v-row>
                      </v-col>
                      <v-col class="ml-2 mr-2">
                        <v-row>
                          <v-text-field
                              color="secondary"
                              v-model="model.dropshipper"
                              :rules=" dropshipper ? [rules.required] : []"
                              label="Dropshipper name"
                              :required="dropshipper"
                              :disabled="!dropshipper"
                              @keyup="local()"
                              :success="model.dropshipper.length >= 5"
                              :append-icon="model.dropshipper.length >= 5 ? 'mdi-check' : 'mdi-alert-box-outline'"
                              outlined
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field
                              prepend-inner-icon="mdi-swap-horizontal"
                              type="number"
                              color="secondary"
                              v-model="model.phonedropship"
                              :rules=" dropshipper ? [rules.required, rules.min, rules.max] : []"
                              :label="'Dropshipper phone number ' + defaultKode"
                              :required="dropshipper"
                              :disabled="!dropshipper"
                              :success="success.phonedropship"
                              :append-icon="success.phonedropship ? 'mdi-check' : 'mdi-alert-box-outline'"
                              @click:prepend-inner="dialog=true"
                              @keyup="valids('phonedropship'); local()"
                              outlined
                          ></v-text-field>
                        </v-row>

                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                  class="mb-1 "
                  height="auto"
                  elevation="0"
              >
                <v-card-title>
                  <v-row>
                    <v-col>
                      <b :style="'font-size: xxx-large; text-shadow: gray 1px 2px 2px; color:'+colorDefault ">Shipment</b>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>

              <v-card
                  class="mb-12 d-flex flex-row"
                  height="auto"
                  elevation="0"
              >
                <v-card width="15vw" class="ma-2" v-for="(item, index) in delivery" :key="index" elevation="0"
                        :style="item.id === model.shipment ? 'border: solid 2px #1BD97B; background-color: rgba(27, 217, 123,0.2);' : 'border: solid 1px #CCCCCC; cursor:pointer;'"
                        @click="changeShipment(item); local()"
                >
                  <v-row>
                    <v-col  cols="10">
                      <v-card-text class="pb-0" :style="item.id !== model.shipment ? 'opacity: 0.5' : ''">
                        {{ item.name }}
                      </v-card-text>
                      <v-card-text class="pt-0" :style="item.id !== model.shipment ? 'opacity: 0.5' : ''">
                        <b> {{ formatPrice(item.price) }} </b>
                      </v-card-text>
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-end pr-5">
                      <v-icon color="success"> {{ item.id === model.shipment ? "mdi-check" :"" }}</v-icon>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                  class="mb-1 "
                  height="auto"
                  elevation="0"
              >
                <v-card-title>
                  <v-row>
                    <v-col>
                      <b :style="'font-size: xxx-large; text-shadow: gray 1px 2px 2px; color:'+colorDefault ">Payment</b>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>

              <v-card
                  class="mb-12 d-flex flex-row"
                  height="auto"
                  elevation="0"
              >
                <v-card width="15vw" class="ma-2" elevation="0"
                        :style="this.model.payment === 1 ? 'border: solid 2px #1BD97B; background-color: rgba(27, 217, 123,0.2);' : 'border: solid 1px #CCCCCC; cursor:pointer;'"
                        @click="changePayment(payment[0])"
                >
                  <v-row>
                    <v-col  cols="10" >
                      <v-card-text class="pb-0"
                                   :style="this.model.payment !== 1 ? 'opacity: 0.5;' : ''">
                        {{ this.payment[0].name }}
                      </v-card-text>
                      <v-card-text class="pt-0" :style="this.model.payment !== 1 ? 'opacity: 0.5' : ''">
                        <b> {{ formatPrice(this.payment[0].value) }} left </b>
                      </v-card-text>
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-end pr-5">
                      <v-icon color="success"> {{ this.model.payment === 1 ? "mdi-check" :"" }}</v-icon>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card width="15vw" class="ma-2 align-center d-flex" v-for="item in 2" :key="item" elevation="0"
                        :style="model.payment === payment[item].id ? 'border: solid 2px #1BD97B; background-color: rgba(27, 217, 123,0.2);' : 'border: solid 1px #CCCCCC; cursor:pointer;'"
                        @click="changePayment(payment[item]); local()"
                >
                  <v-row>
                    <v-col cols="10" >
                      <v-card-text class="text-lg-h6 auto"
                                   :style="model.payment !== payment[item].id ? 'opacity: 0.5;' : ''">
                        {{ payment[item].name}}
                      </v-card-text>
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-end pr-5">
                      <v-icon color="success"> {{ model.payment === payment[item].id ? "mdi-check" :"" }}</v-icon>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="d-flex align-center justify-center" height="70vh">
                <v-card
                    elevation="0"
                >
                  <v-card-title class="mb-8">
                    <b :style="'font-size: xxx-large; text-shadow: gray 1px 2px 2px; color:'+colorDefault ">Thank you</b>
                  </v-card-title>
                  <v-card-text class="pb-0 text--primary">
                    Order ID: {{ model.orderid }}
                  </v-card-text>
                  <v-card-subtitle class="mb-12 pt-2">
                    {{ 'Your order will delivered ' + this.selectDelivery.estimation + ' with ' + this.selectDelivery.name }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                        class="transparent"
                        tile
                        small
                        elevation="0"
                        @click="back()"
                    >
                      <v-icon left>
                        mdi-arrow-left
                      </v-icon>
                      Go to homepage
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-col>
        <v-col cols="3">
          <v-card
              elevation="0"
              height="75vh"
              width="100%"
              class="d-flex flex-column mb-3"
              style="border-left: rgb(255,137,0) solid 2px; border-radius: 0"
          >
            <v-card class="pr-5 pl-5 pt-5" elevation="0">
              <v-card-title class="pa-2">
                <h2 :style="'color:'+colorDefault">Summary</h2>
              </v-card-title>
              <v-card-text class="pa-2">
                <p>10 items purchased</p>
              </v-card-text>
            </v-card>

            <v-card v-if="e1 >= 2" class="pl-5 pr-5 pt-0 pb-5" elevation="0">
              <v-divider style="width: 50%; border-width: thin;"/>
              <v-card-text class="pa-0 pt-5">
                <h4>Delivery estimation</h4>
              </v-card-text>
              <v-card-text class="pa-0">
                <h3 style="color:#1BD97B">{{ (selectDelivery.estimation) +  " by " + selectDelivery.name }}</h3>
              </v-card-text>
            </v-card>

            <v-card v-if="e1 >= 2" class="pl-5 pr-5 pt-0" elevation="0">
              <v-divider style="width: 50%; border-width: thin;"/>
              <v-card-text class="pa-0 pt-5">
                <h4>Payment method</h4>
              </v-card-text>
              <v-card-text class="pa-0">
                <h3 style="color:#1BD97B">{{ selectPayment.name }}</h3>
              </v-card-text>
            </v-card>

            <v-card class="pa-2 mt-auto" elevation="0">
              <v-card-text>
                <v-row>
                  <v-col>Cost of goods</v-col>
                  <v-col class="text-right">
                    <b>{{ formatPrice(this.model.cost) }}</b>
                  </v-col>
                </v-row>
                <v-row class="mt-0" v-if="dropshipper">
                  <v-col>Dropshipping Fee</v-col>
                  <v-col class="text-right">
                    <b>{{ formatPrice(this.model.dropshipfee) }}</b>
                  </v-col>
                </v-row>
                <v-row class="mt-0" v-if="e1 >= 2 ">
                  <v-col cols="8"><b>{{ selectDelivery.name }}</b> shipment</v-col>
                  <v-col cols="4" class="text-right">
                    <b>{{ formatPrice(this.model.shipmentfee) }}</b>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col class="text-lg-h5"><b style="color:#ff8a00">Total</b></v-col>
                  <v-col class="text-right text-lg-h5">
                    <b style="color:#ff8a00">{{ formatPrice(this.tempTotal) }}</b>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions v-if="e1 < 3">
                <v-btn
                    :disabled="!valid"
                    class="pa-10 text-lg-h6"
                    width="100%"
                    color="primary"
                    @click="proses()"
                >
                  {{ this.btntext }}
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-card>
        </v-col>
      </v-row>
    </v-stepper>

    <v-dialog
        v-model="dialog"
        max-width="90%"
    >
      <v-card>
        <v-card-title class="text-h5">
          Please select your country code <br>
        </v-card-title>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table
              show-select
              single-select
              v-model="selected"
              item-key="name"
              :headers="headers"
              :items="dataNumber"
              :search="search"
              ref="numberData"
              :items-per-page="5"
          ></v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="submitTable()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Numbers from "@/plugins/number";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "delivery",
  data: () => ({
    //model
    number: new Numbers(),

    //boolean
    valid: false,
    dialog: false,
    dropshipper: false,

    //data empty & default
    search: '',
    selected: [],
    selectPayment:{},
    selectDelivery:{},
    defaultKode: '+62',
    btntext: 'Continue to Payment',
    dataNumber: null,
    colorDefault: '#FF8A00',
    colorBG: '#FFFAE6',
    tempTotal:0,
    e1: 1,
    btnBack: 'back to cart',

    //object & array
    success: {
      email: false,
      phone: false,
      phonedropship: false,
    },
    model: {
      orderid: '',
      email: '',
      dropshipper: '',
      phone: '',
      phonedropship: '',
      address: '',
      shipment: null,
      payment: '',
      cost: '',
      dropshipfee: '',
      shipmentfee: '',
      grandtotal: '',
    },
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      max: v => v.length < 21 || 'Max 20 characters',
      maxAddress: v => v.length <= 120 || 'Max 120 characters',
      email: value => {
        const v = /.+@.+\..+/
        return v.test(value) || 'E-mail must be valid'
      }
    },
    delivery: [
      {id: 1, name: 'GO-SEND', price: 15000, estimation:"today's"},
      {id: 2, name: 'JNE', price: 9000, estimation:"2 days"},
      {id: 3, name: 'Personal Courier', price: 29000, estimation:"1 day"},
    ],
    payment: [
      {id: 1, name: 'e-Wallet', value: 1500000},
      {id: 2, name: 'Bank Account', value: 0},
      {id: 3, name: 'Virtual Account', value: 0},
    ],
    headers: [
      {text: 'Country', value: 'name',},
      {text: 'Country Code', value: 'kode'},
    ],
  }),
  methods: {
    back() {
      if(this.e1 === 2){
        this.e1 = 1
        this.tempTotal = this.model.grandtotal
        this.local()
      }
      if(this.e1 === 3){
        let rawOld = localStorage.getItem('old')
        let rawNew = localStorage.getItem('data')
        let dataOld = JSON.parse(rawOld) ?? []
        let dataNew = JSON.parse(rawNew)
        dataOld.push(dataNew)
        localStorage.setItem('old', JSON.stringify(dataOld))
        localStorage.removeItem("data")
        this.e1 = 1
        this.reset()
      }
      this.btnBack = "back to cart"
      this.btntext = "Continue to Payment"
    },
    valids(val) {
      if (val === 'email') {
        this.success.email = this.valid
      }
      if (val === 'phone') {
        this.success.phone = this.valid
      }
      if (val === 'phonedropship') {
        this.success.phonedropship = this.valid
      }
    },
    submitTable() {
      this.defaultKode = this.selected[0].kode
      this.dialog = false
    },
    dropshipperClick() {
      if (this.dropshipper) {
        this.model.dropshipfee = 5900
        this.model.grandtotal = this.model.cost + this.model.dropshipfee
        this.tempTotal = this.model.grandtotal
        this.valid = false
      } else {
        this.model.dropshipfee = 0
        this.model.grandtotal = this.model.grandtotal - 5900
        this.tempTotal = this.model.grandtotal
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    proses() {
      let validate = this.$refs.form.validate()
      if (validate && this.e1 === 1) {
        this.e1 = 2
        this.tempTotal = this.model.grandtotal + this.model.shipmentfee
        this.btntext = 'Pay with e-Wallet'
        this.btnBack = 'Back to Delivery'
      }else
      if(this.e1 === 2){
        this.e1 = 3
        this.model.grandtotal = this.tempTotal
        this.model.orderid = this.generateOrder()
      }
      this.local()
    },
    changeShipment(val){
      this.selectDelivery = val
      this.model.shipment = val.id
      this.model.shipmentfee = val.price
      this.tempTotal = this.model.grandtotal + this.model.shipmentfee
    },
    changePayment(val){
      this.selectPayment = val
      this.model.payment = val.id
      this.btntext = 'Pay with '+val.name
    },
    generateOrder(){
      let result = ''
      let chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
      for(let i =0; i<5;i++){result += chars[Math.round(Math.random() * (chars.length-1))]}
      return result
    },
    reset(){
      let raw = localStorage.getItem('data')
      let data = JSON.parse(raw)
      this.model.orderid = data != null ? data.item.orderid : ''
      this.model.cost = data != null ? data.item.cost : 500000
      this.model.grandtotal = data != null ?  data.item.grandtotal : 500000
      this.tempTotal = data != null ?  data.tempTotal : 500000
      this.model.shipment = data != null ?  data.item.shipment : 1
      this.model.shipmentfee = data != null ?  data.item.shipmentfee : 15000
      this.model.payment = data != null ? data.item.payment : 1
      this.model.email = data != null ? data.item.email : ''
      this.model.phone = data != null ? data.item.phone : ''
      this.model.address = data != null ? data.item.address : ''
      this.model.dropshipfee = data != null ? data.item.dropshipfee : 0
      this.model.dropshipper = data != null ? data.item.dropshipper : ''
      this.model.phonedropship = data != null ? data.item.phonedropship : ''
      this.dropshipper = data != null ? data.dropshipper : false
      this.success = data != null ? data.success : {
        email: false,
        phone: false,
        phonedropship: false,
      }
      this.defaultKode = data != null ? data.defaultKode : '+62'
      this.e1 = data != null ? data.e1 : 1
      this.$refs.form.resetValidation()
      this.selectPayment = data != null ? data.selectPayment : this.payment.find(x => x.id === this.model.payment)
      this.selectDelivery = data != null ? data.selectDelivery : this.delivery.find(x => x.id === this.model.shipment)
    },
    local(){
      let value =
        {
          item: {
            orderid: this.model.orderid,
            email: this.model.email.toString(),
            dropshipper: this.dropshipper ? this.model.dropshipper : '',
            phone: this.model.phone,
            phonedropship: this.dropshipper ? this.model.phonedropship: '',
            address: this.model.address,
            shipment: this.model.shipment,
            payment: this.model.payment,
            cost: this.model.cost,
            dropshipfee: this.model.dropshipfee,
            shipmentfee: this.model.shipmentfee,
            grandtotal: this.model.grandtotal,
          },
          defaultKode: this.defaultKode,
          dropshipper: this.dropshipper,
          e1: this.e1,
          success: {
            email: this.success.email,
            phone: this.success.phone,
            phonedropship: this.success.phonedropship,
          },
          tempTotal: this.tempTotal,
          selectPayment: this.selectPayment = this.payment.find(x => x.id === this.model.payment),
          selectDelivery: this.selectDelivery = this.delivery.find(x => x.id === this.model.shipment)
        }
      localStorage.setItem('data', JSON.stringify(value))
    },
  },
  mounted() {
    this.dataNumber = this.number.getAll()
    this.reset()
  }
}
</script>

<style scoped>

/deep/ .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
  background: rgba(255, 137, 0, 0.2);
  color: rgba(255, 137, 0, 1);
}

.up {
  margin: 0;
  position: absolute;
  z-index: 0;
  left: 0;
  top: -9vh;
  right: 50%;
  transform: translate(50%, 50%);
}
</style>