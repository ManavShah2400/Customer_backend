const express = require('express');
const router = express.Router();
const CustomerController = require('../Controllers/CustomerController')

//To add customer
router.post(
    '/add',
    CustomerController.createCustomer
);

//To get all Inventory
router.get(
    '/customers',
    CustomerController.getCustomers
);

//To update customer
router.put(
    '/update/:id',
    CustomerController.editCustomer
)

//To delete customer
router.delete(
    '/delete/:id',
    CustomerController.deleteCustomer
)

//To search customer
router.get(
    '/search',
    CustomerController.searchCustomer
)
module.exports = router;