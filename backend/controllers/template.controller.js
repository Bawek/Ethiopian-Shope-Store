const prisma = require("../config/db");
const httpError = require("../middlewares/httpError");
const fs = require('fs');
const path = require('path');
const { initializePayment, verifyPayment } = require("../services/chapaService");
const getAllMerchantTemplate = async (req, res, next) => {
    try {
        const templates = await prisma.merchantTemplate.findMany({
            include: {
                customPages: true
            }
        })
        res.status(201).json({
            status: 'success',
            templates
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const getMerchantTemplateByAccount = async (req, res, next) => {
    const { accountId } = req.params
    console.log(accountId)
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                accountId: accountId
            }
        })
        if(!merchant){
            return next(new httpError('Sorry you are not registared.'))
        }
        const merchantTemplate = await prisma.merchantTemplate.findFirst({
            where: {
                merchantId: merchant.id
            },
            include: {
                customPages: true,
            }
        })

        res.status(201).json({
            status: 'success',
            merchantTemplate
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const deleteById = async (req, res, next) => {
    const { templateId } = req.params
    try {
        const templates = await prisma.template.delete({
            where: {
                id: templateId
            }
        })
        res.status(201).json({
            status: 'success',
            message: 'templates are deleted'
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const updateTempalate = async (req, res, next) => {
    const { templateId } = req.params;
    try {
        if (req.file) {
            const currentTemplate = await prisma.baseTemplate.findUnique({
                where: { id: templateId },
                select: { previewUrls: true }
            });


            if (currentTemplate && currentTemplate.previewUrls.length > 0) {
                const oldFileName = currentTemplate.previewUrls[0];
                const oldFilePath = path.join(__dirname, '..', 'uploads', "images", oldFileName);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Save the new file path from the uploaded file
        }
        console.log(req.file, req?.files)
        const previewUrls = [req?.file?.filename];

        //Prepare the data to update
        const updateData = {
            ...req.body,
            ...(req.body.basePrice && { basePrice: parseFloat(req.body.basePrice) }),
            ...(previewUrls && { previewUrls })
        };

        //  Update the template with the provided templateId
        const template = await prisma.baseTemplate.update({
            where: {
                id: templateId
            },
            data: updateData
        });

        //  Handle the case where no template is found
        if (!template) {
            return next(new httpError('There is no template with this Id', 404));
        }

        //  Respond with a success message after the update
        res.status(200).json({
            status: 'success',
            template,
            message: 'The template was successfully updated!'
        });
    } catch (error) {
        console.log('Template update error:', error);

        //  Handle errors gracefully
        next(new httpError(error.message || 'Failed to update the template.', 500));
    }
};
const getCustomeTemplateById = async (req, res, next) => {
    const { templateId } = req.params
    try {
        const template = await prisma.merchantTemplate.findFirst({
            where: {
                id: templateId
            },
            include: {
                customPages: true
            }
        })
        res.status(201).json({
            status: 'success',
            template
        })
    } catch (error) {
        console.log('template register error', error)
        next(new httpError(error.message, 500))
    }

}
const generateTxRef = () => `tx-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

const registerTemplate = async (req, res, next) => {
    const { name, basePrice, description } = req.body;

    if (!req.file) {
        return next(new httpError('Template preview image is required', 400));
    }

    try {
        // Check for existing template with same name
        const existingTemplate = await prisma.baseTemplate.findFirst({
            where: { name }
        });

        if (existingTemplate) {
            return next(new httpError('Template with this name already exists', 409));
        }

        const newTemplate = await prisma.baseTemplate.create({
            data: {
                name,
                basePrice: parseFloat(basePrice),
                description,
                previewUrls: [req.file.filename],
                status: 'ACTIVE'
            }
        });

        res.status(201).json({
            status: 'success',
            message: 'Template created successfully',
            template: newTemplate
        });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const getAllTemplate = async (req, res, next) => {
    try {
        const templates = await prisma.baseTemplate.findMany({
            where: { status: 'ACTIVE' }
        });
        res.status(200).json({ status: 'success', templates });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const getTemplateById = async (req, res, next) => {
    const { templateId } = req.params;

    try {
        const template = await prisma.baseTemplate.findUnique({
            where: { id: templateId },
            include: { pages: true }
        });

        if (!template) {
            return next(new httpError('Template not found', 404));
        }

        res.status(200).json({ status: 'success', template });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const buyTemplate = async (req, res, next) => {
    const { accountId, templateId, FRONTEND_BASE_URL, callback_url } = req.body;
    console.log('up th sjjsj')
    if (!templateId || !accountId) {
        return next(new httpError('Template ID and Account ID are required', 400));
    }

    try {
        // Verify template exists and is active
        const template = await prisma.baseTemplate.findUnique({
            where: { id: templateId, status: 'ACTIVE' }
        });

        if (!template) {
            return next(new httpError('Template not found or not available for purchase', 404));
        }

        // Verify merchant exists and is active
        const merchant = await prisma.merchant.findFirst({
            where: { accountId, status: 'ACTIVE' }
        });

        if (!merchant) {
            return next(new httpError('Merchant account not found or inactive', 404));
        }

        // Check for existing purchase
        const existingPurchase = await prisma.merchantTemplate.findFirst({
            where: {
                merchantId: merchant.id,
                baseTemplateId: templateId,
                paymentStatus: 'ACTIVE'
            }
        });

        if (existingPurchase) {
            return next(new httpError('You already own this template', 409));
        }

        // Generate payment data
        const tx_ref = generateTxRef();
        const paymentData = {
            amount: template.basePrice.toString(),
            currency: 'ETB',
            email: merchant.businessEmail,
            first_name: merchant.ownerName.split(' ')[0],
            last_name: merchant.ownerName.split(' ')[1] || '',
            tx_ref,
            callback_url: `${callback_url}?tx_ref=${tx_ref}`,
            return_url: `${FRONTEND_BASE_URL}?tx_ref=${tx_ref}`,
            customization: {
                title: "Template Purchase",
                description: "Template Payment"
            },
            meta: {
                accountId,
                templateId,
                merchantId: merchant.id
            }
        };

        // Initialize payment
        const paymentResponse = await initializePayment(paymentData);

        if (paymentResponse.status !== 'success') {
            return next(new httpError('Failed to initialize payment', 400));
        }
        // Create pending payment record
        await prisma.payment.create({
            data: {
                merchantId: merchant.id,
                amount: template.basePrice,
                status: 'PENDING',
                paymentMethod: 'CHAPA',
                transactionRef: tx_ref,
                metadata: {
                    templateId,
                    templateName: template.name
                }
            }
        });

        res.status(200).json({
            status: 'success',
            checkoutUrl: paymentResponse.data.checkout_url
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const verifyTemplatePayment = async (req, res, next) => {
    const { tx_ref } = req.query;

    try {
        const verification = await verifyPayment(tx_ref);

        if (verification.status !== 'success' || verification.data.status !== 'success') {
            return res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/templates?success=false`);
        }
        const { accountId, templateId, merchantId } = verification.data.meta;
        console.log(verification, 'verify')
        // Complete the purchase in a transaction
        await prisma.$transaction(async (prisma) => {
            await prisma.payment.updateMany({
                where: { transactionRef: tx_ref },
                data: {
                    status: 'ACTIVE',
                    paidAt: new Date()
                }
            });

            // Get template details
            const template = await prisma.baseTemplate.findUnique({
                where: { id: templateId },
                include: { pages: true }
            });

            // Create merchant template
            const merchantTemplate = await prisma.merchantTemplate.create({
                data: {
                    merchantId,
                    baseTemplateId: templateId,
                    name: template.name,
                    description: template.description,
                    paymentStatus: 'ACTIVE',
                    isActive: true,
                    activatedAt: new Date(),
                    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                }
            });

            // Copy pages if they exist
            if (template.pages?.length > 0) {
                await prisma.customPage.createMany({
                    data: template.pages.map(page => ({
                        merchantTemplateId: merchantTemplate.id,
                        name: page.name,
                        html: page.html,
                        css: page.css,
                        js: page.js
                    }))
                });
            }
            // Create notification
            await prisma.notification.create({
                data: {
                    userId: accountId,
                    type: 'TEMPLATE_PURCHASE',
                    message: `You've successfully purchased the "${template.name}" template`,
                    metadata: JSON.stringify({
                        templateId,
                        templateName: template.name,
                        amount: template.basePrice
                    })
                }
            });
        });

        res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/templates?success=true&tx_ref=${tx_ref}`);

    } catch (error) {
        console.error('Payment verification failed:', error);
        res.redirect(`${process.env.FRONTEND_BASE_URL}/customers/templates?success=false`);
    }
};

const verifyTemplaterPaymentForFrontend = async (req, res, next) => {
    const { tx_ref } = req.query;

    try {
        const verification = await verifyPayment(tx_ref);
        res.status(200).json(verification);
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};
module.exports = {
    registerTemplate,
    getAllTemplate,
    getTemplateById,
    updateTempalate,
    deleteById,
    buyTemplate,
    getCustomeTemplateById,
    getAllMerchantTemplate,
    getMerchantTemplateByAccount,
    verifyTemplatePayment,
    verifyTemplaterPaymentForFrontend
}