const prisma = require('../config/db');

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const limit = parseInt(req.query.limit) || 20;
        const page = parseInt(req.query.page) || 1;

        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });

        const total = await prisma.notification.count({ where: { userId } });

        res.json({
            success: true,
            data: notifications,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, type = 'info', title, message, metadata } = req.body;

        const notification = await prisma.notification.create({
            data: { userId, type, title, message, metadata },
        });

        // Emit real-time event if using Socket.io
        // io.to(notification.userId).emit('new-notification', notification);

        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });

        res.json({ success: true, data: notification });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Notification not found' });
    }
};

// Mark all notifications as read for a user
exports.markAllAsRead = async (req, res) => {
    try {
        const { userId } = req.params;

        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });

        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await prisma.notification.delete({
            where: { id },
        });

        res.json({ success: true, data: notification });
    } catch (error) {
        res.status(404).json({ success: false, error: 'Notification not found' });
    }
};
