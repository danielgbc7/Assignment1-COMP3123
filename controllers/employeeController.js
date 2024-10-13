const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const newEmployee = await Employee.create({ first_name, last_name, email, position, salary, date_of_joining, department });
        res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ status: false, message: "Employee not found." });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Update employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) return res.status(404).json({ status: false, message: "Employee not found." });
        res.status(200).json({ message: "Employee details updated successfully." });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) return res.status(404).json({ status: false, message: "Employee not found." });
        res.status(204).json({ message: "Employee deleted successfully." });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};
