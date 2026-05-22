const express = require('express');
const { getUserNotifications, createNotification, markAllAsRead, markAsRead, deleteNotification } = require('../controllers/notificationController');

const router = express.Router()

router.get('/get-notfication/:userId', getUserNotifications);

router.post('create/', createNotification);

router.put('update/:id/read', markAsRead);

router.put('/get-all/:userId/read-all', markAllAsRead);

router.delete('delete/:id', deleteNotification);

module.exports = router 
