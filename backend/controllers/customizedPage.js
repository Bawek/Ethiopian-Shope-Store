const prisma = require("../config/db");
const httpError = require("../middlewares/httpError");

/**
 * Create a new custom page
 */
const createCustomPage = async (req, res, next) => {
    try {
        const { name, html, css, js, merchantTemplateId } = req.body;

        // Validate required fields
        if (!name || !merchantTemplateId) {
            return next(new httpError('Name and merchant template ID are required', 400));
        }

        const newPage = await prisma.customPage.create({
            data: {
                name,
                html: html || '',
                css: css || '',
                js: js || '',
                merchantTemplateId
            }
        });

        res.status(201).json({
            success: true,
            data: newPage
        });

    } catch (error) {
        console.error('Create custom page error:', error);
        return next(new httpError('Failed to create custom page', 500));
    }
};

/**
 * Get all custom pages for a merchant template
 */
const getCustomPagesByTemplate = async (req, res, next) => {
    try {
        const { merchantTemplateId } = req.params;

        if (!merchantTemplateId) {
            return next(new httpError('Merchant template ID is required', 400));
        }

        const pages = await prisma.customPage.findMany({
            where: { merchantTemplateId },
            orderBy: { name: 'asc' }
        });

        res.status(200).json({
            success: true,
            count: pages.length,
            data: pages
        });

    } catch (error) {
        console.error('Get custom pages error:', error);
        return next(new httpError('Failed to fetch custom pages', 500));
    }
};

/**
 * Get a single custom page by ID
 */
const getCustomPageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = await prisma.customPage.findUnique({
            where: { id }
        });

        if (!page) {
            return next(new httpError('Custom page not found', 404));
        }

        res.status(200).json({
            success: true,
            data: page
        });

    } catch (error) {
        console.error('Get custom page error:', error);
        return next(new httpError('Failed to fetch custom page', 500));
    }
};

/**
 * Update a custom page
 */
const updateCustomPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, html, css, js } = req.body;

        // Validate at least one field to update
        if (!name && !html && !css && !js) {
            return next(new httpError('At least one field to update is required', 400));
        }

        const updatedPage = await prisma.customPage.update({
            where: { id },
            data: {
                name,
                html,
                css,
                js
            }
        });

        res.status(200).json({
            success: true,
            data: updatedPage
        });

    } catch (error) {
        console.error('Update custom page error:', error);

        if (error.code === 'P2025') {
            return next(new httpError('Custom page not found', 404));
        }

        return next(new httpError('Failed to update custom page', 500));
    }
};

/**
 * Delete a custom page
 */
const deleteCustomPage = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.customPage.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            data: null,
            message: 'Custom page deleted successfully'
        });

    } catch (error) {
        console.error('Delete custom page error:', error);

        if (error.code === 'P2025') {
            return next(new httpError('Custom page not found', 404));
        }

        return next(new httpError('Failed to delete custom page', 500));
    }
};

module.exports = {
    createCustomPage,
    getCustomPagesByTemplate,
    getCustomPageById,
    updateCustomPage,
    deleteCustomPage
};