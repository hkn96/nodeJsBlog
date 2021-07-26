const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// admin kontrol (delete and add)
router.get('/', adminController.admin_index);
router.delete('/delete/:id', adminController.admin_delete);
router.get('/add', adminController.admin_add);
router.post('/add', adminController.admin_add_post);

module.exports = router;
