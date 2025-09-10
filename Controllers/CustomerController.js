const mongoose = require('mongoose');
const cusotmerModel = require('../Models/Customer');

//Add new cusomter
const createCustomer = async (req, res) => {
    try {
        const { name, phone_number, address, driver_license, company_name, bank_name } = req.body;
        const existingCustomer = await cusotmerModel.findOne({ driver_license });
        if (existingCustomer) return res.status(400).json({ message: "Customer already exists", success: false });
        const customer = new cusotmerModel({ name, phone_number, address, driver_license, company_name, bank_name });
        await customer.save();
        res.status(201).json({ message: "Customer Created Successfully", success: true, data: customer });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: err.message })
    }
}

//Get all customer
const getCustomers = async (req, res) => {
    try {
        const customers = await cusotmerModel.find();
        res.status(200).json({ message: "Successfully fetched all customer", success: true, data: customers });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: err.message });
    }
}

//Edit Customer
const editCustomer = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        if (!updateData.name || !updateData.phone_number || !updateData.driver_license) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }
        const updatedItem = await cusotmerModel.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true // Validate before updating
        });

        // If item not found
        if (!updatedItem) {
            return res.status(404).json({ message: "Customer not found", success: false });
        }

        res.status(200).json({ message: "Customer updated successfully", success: true, data: updatedItem });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: err.message });
    }
}

//Delete Customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Customer id is not valid", success: false });
        }
        const deletedCustomer = await cusotmerModel.findByIdAndDelete(id);

        if (!deletedCustomer) return res.status(404).json({ message: "Customer is not found", success: false });

        return res.status(200).json({ message: "Customer deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: err.message });
    }
}

//To search Customer by name or license number
const searchCustomer = async (req, res) => {
    const { query } = req.query;
    try {
        //find customer using case-insentive for name or license number
        const all_customer = await cusotmerModel.find();
        const customer = await cusotmerModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },          // partial match, case-insensitive
                { driver_license: { $regex: query, $options: 'i' } }, // partial match, case-insensitive
                { company_name: { $regex: query, $options: 'i' } },
                { bank_name: { $regex: query, $options: 'i' } }
            ]
        });
        if (!query) return res.status(200).json({ message: "All customer list", success: true, data: all_customer });
        return res.status(200).json({ message: "Customer found", success: true, data: customer });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: err.message });
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    editCustomer,
    deleteCustomer,
    searchCustomer
}