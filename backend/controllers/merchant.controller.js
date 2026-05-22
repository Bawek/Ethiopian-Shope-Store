const prisma = require("../config/db")
const httpError = require("../middlewares/httpError");
const { getIO } = require("../utils/socket");
const testIo = async (req, res) => {
    try {
        const io = getIO();
        const data = req.body;
        io.to('admin-room').emit('new-merchant', data);

        res.status(200).json({
            success: true,
            message: 'Notification triggered'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
const registerMerchant = async (req, res, next) => {
    const requiredFields = [
        'mode', 'accountId', 'locationId', 'businessName',
        'ownerName', 'businessPhone', 'businessEmail',
        'cbeAccountNo', 'businessType'
    ];

    // Validate required fields
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return next(new httpError(`Missing required field: ${field}`, 400));
        }
    }

    const {
        mode,
        accountId,
        locationId,
        businessName,
        ownerName,
        businessPhone,
        businessEmail,
        cbeAccountNo,
        businessType,
    } = req.body;

    // Normalize inputs
    const normalized = {
        businessName: businessName.trim(),
        businessPhone: businessPhone.trim(),
        businessEmail: businessEmail.trim().toLowerCase(),
        cbeAccountNo: cbeAccountNo.trim()
    };

    // Validate mode
    if (!['register', 'update'].includes(mode)) {
        return next(new httpError("Invalid mode. Must be 'register' or 'update'", 400));
    }

    // Validate identity card for registration
    if (mode === 'register' && !req.file) {
        return next(new httpError("Identity card is required for registration", 400));
    }

    try {
        const io = getIO();
        const transaction = await prisma.$transaction(async (prisma) => {
            if (mode === 'register') {
                // Check for duplicate merchant
                const duplicate = await prisma.merchant.findFirst({
                    where: {
                        OR: [
                            { businessName: normalized.businessName },
                            { businessPhone: normalized.businessPhone },
                            { businessEmail: normalized.businessEmail },
                            { cbeAccountNo: normalized.cbeAccountNo }
                        ]
                    },
                    select: { id: true }
                });
                if (duplicate) {
                    throw new Error('A merchant already exists with one of the provided details');
                }

                // Create new merchant
                const newMerchant = await prisma.merchant.create({
                    data: {
                        accountId,
                        identityCard: req.file.filename,
                        locationId,
                        businessName: normalized.businessName,
                        ownerName,
                        businessPhone: normalized.businessPhone,
                        businessEmail: normalized.businessEmail,
                        cbeAccountNo: normalized.cbeAccountNo,
                        businessType,
                        status: 'PENDING' // Default status
                    },
                    include: { account: true }
                });

                // Create admin notification 
                await prisma.notification.create({
                    data: {
                        userId: accountId, // Or your admin account ID
                        type: 'NEW_MERCHANT_REGISTRATION',
                        message: `New merchant registration: ${newMerchant.businessName}`,
                        metadata: JSON.stringify({
                            merchantId: newMerchant.id,
                            businessName: newMerchant.businessName,
                            registrationDate: new Date()
                        })
                    }
                });

                // Emit real-time event
                io.to('admin-room').emit('new-merchant', {
                    message: 'New merchant registration pending approval',
                    merchantId: newMerchant.id,
                    businessName: newMerchant.businessName,
                    timestamp: new Date(),
                    actionRequired: true
                });

                return {
                    status: 201,
                    response: {
                        message: 'Merchant registered successfully. Pending admin approval.',
                        status: "success",
                        merchant: newMerchant
                    }
                };

            } else { // Update mode
                const existingMerchant = await prisma.merchant.findUnique({
                    where: { accountId },
                    select: { id: true, status: true }
                });

                if (!existingMerchant) {
                    throw new Error('Merchant not found');
                }

                const updateData = {
                    locationId,
                    businessName: normalized.businessName,
                    ownerName,
                    businessPhone: normalized.businessPhone,
                    businessEmail: normalized.businessEmail,
                    cbeAccountNo: normalized.cbeAccountNo,
                    businessType,
                    status: 'PENDING' // Reset status for re-approval
                };

                if (req.file) {
                    updateData.identityCard = req.file.filename;
                }

                const updatedMerchant = await prisma.merchant.update({
                    where: { id: existingMerchant.id },
                    data: updateData,
                    include: { account: true }
                });

                // Create admin notification for update
                await prisma.notification.create({
                    data: {
                        userId: accountId,
                        type: 'MERCHANT_UPDATE',
                        message: `Merchant profile updated: ${updatedMerchant.businessName}`,
                        metadata: JSON.stringify({
                            merchantId: updatedMerchant.id,
                            changes: Object.keys(updateData),
                            timestamp: new Date()
                        })
                    }
                });

                // Emit real-time event
                io.to('admin-room').emit('merchant-update', {
                    message: 'Merchant account updated - requires re-approval',
                    merchantId: updatedMerchant.id,
                    businessName: updatedMerchant.businessName,
                    timestamp: new Date(),
                    actionRequired: true
                });

                return {
                    status: 200,
                    response: {
                        message: 'Merchant updated successfully. Pending admin re-approval.',
                        status: "success",
                        merchant: updatedMerchant
                    }
                };
            }
        });

        return res.status(transaction.status).json(transaction.response);

    } catch (error) {
        console.error('Merchant Registration Error:', error);

        // Handle known error cases
        if (error.message.includes('already exists') ||
            error.message.includes('not found')) {
            return next(new httpError(error.message, 400));
        }

        return next(new httpError("An error occurred while processing your request", 500));
    }
};


// get all merchants
const getAllMerchant = async (req, res, next) => {
    try {
        const merchant = await prisma.merchant.findMany({
            include: {
                account: true
            }
        })
        // Success: Return the newly created account
        return res.status(201).json({
            message: 'merchant registered successfully',
            status: "success",
            merchant
        });
    } catch (error) {
        console.log('Register Merchant Error', error)
        next(new httpError(error.message, 500))
    }
}
const getMerchantById = async (req, res, next) => {
    const { merchantId } = req.params;
    try {
        const merchant = await prisma.merchant.findUnique({
            where: {
                id: merchantId,
            },
            include: {
                account: true, // Include related account information
                location: true //Include his locations
            },
        });
        if (!merchant) return next(new httpError("Merchant is Not Found", 404))
        return res.status(200).json({
            status: 'success',
            merchant,
        });
    } catch (error) {
        console.log('Get Merchant Error', error);
        next(new httpError(error.message, 500));
    }
};
const deleteMerchantById = async (req, res, next) => {
    const { merchantId } = req.params;
    try {
        const merchant = await prisma.merchant.findUnique({
            where: {
                id: merchantId,
            },
        });

        if (!merchant) return next(new httpError("Merchant is Not Found", 404))
        await prisma.merchant.delete({
            where: {
                id: merchantId
            }
        })
        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted.',
        });
    } catch (error) {
        console.log('Get Merchant Error', error);
        next(new httpError(error.message, 500));
    }
};
const allowedStatuses = ['ACTIVE', 'SUSPENDED', 'PENDING'];

const changeMerchantStatus = async (req, res, next) => {
    const { merchantId } = req.params;
    const { status } = req.body;

    try {
        const io = getIO();

        // Validate status
        if (!status || !allowedStatuses.includes(status)) {
            return next(new httpError("Invalid status value", 400));
        }

        // Check if merchant exists
        const merchant = await prisma.merchant.findUnique({
            where: { id: merchantId },
        });

        if (!merchant) {
            return next(new httpError("Merchant not found", 404));
        }

        // Prevent updating if status is already the same
        if (merchant.status === status) {
            return res.status(200).json({
                status: "no-change",
                message: `Merchant already has status: ${status}`,
            });
        }

        // Update status
        const updatedMerchant = await prisma.merchant.update({
            where: { id: merchantId },
            data: { status },
        });

        // Emit to specific merchant room
        io.to(`merchant-${merchantId}`).emit('merchant-status-changed', {
            status: updatedMerchant.status,
            message: `Your account status has been updated to: ${updatedMerchant.status}`,
            merchantId: updatedMerchant.id,
            businessName: updatedMerchant.businessName,
            timestamp: new Date(),
        });

        return res.status(200).json({
            status: "success",
            message: "Merchant status updated successfully",
            data: updatedMerchant,
        });

    } catch (error) {
        console.error("Change merchant status error:", error);
        next(new httpError("Failed to update merchant status", 500));
    }
};

const getMerchantByAccountId = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        const merchant = await prisma.merchant.findFirst({
            where: { accountId },
            include: {
                account: true,
            },
        });
        console.log(merchant, 'and id account', accountId)
        // ✅ Always return 200 and let frontend decide
        return res.status(200).json({
            status: 'success',
            merchant: merchant || null,
        });

    } catch (error) {
        console.error("Get Merchant by Account Error:", error);
        return next(new httpError("Internal Server Error", 500));
    }
};

module.exports = {
    registerMerchant,
    getAllMerchant,
    getMerchantById,
    deleteMerchantById,
    changeMerchantStatus,
    testIo,
    getMerchantByAccountId
}