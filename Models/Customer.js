const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, requried: true },
    phone_number: { type: String },
    address: { type: String },
    driver_license: { type: String, requried: true },
    company_name: { type: String, requried: true },
    bank_name: { type: String }
})

const cusotmerModel = mongoose.model("Customer", customerSchema);
module.exports = cusotmerModel;
