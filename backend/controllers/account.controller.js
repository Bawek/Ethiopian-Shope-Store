const prisma = require("../config/db")
const bcrypt = require('bcryptjs')
const httpError = require("../middlewares/httpError");
const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require("../utils/generateToken");
const { sendEmail } = require("../services/emailService");

const registerAccount = async (req, res, next) => {
    const {
        firestName,
        lastName,
        email,
        password
    } = req.body;
    try {
        // Check if the email already exists
        const userAccount = await prisma.account.findFirst({
            where: {
                email: email
            }
        });

        if (userAccount) {
            // If an account exists with the email, return error
            return next(new httpError('Someone has already registered with this email. Please try another email again.', 409));
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // Register the new account (additional validation as necessary)
        const newAccount = await prisma.account.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firestName,
                lastName,
            }
        });
        const userInfo = {
            accountId: newAccount.id,
            role: newAccount.role
        }
        const refreshToken = await generateRefreshToken(userInfo, next)
        const accessToken = await generateAccessToken(userInfo, next)
        const updatedAccount = await prisma.account.update({
            where: {
                id: newAccount.id
            },
            data: {
                refreshToken
            }
        })
        res.cookie('token', refreshToken, { httpOnly: true, maxAge: 24 * 3600000 })
        // Success: Return the newly created account
        return res.status(201).json({
            message: 'Account registered successfully',
            status: "success",
            accessToken,
            email: updatedAccount.email,
            firestName: updatedAccount.firstName,
            lastName: updatedAccount.lastName,
            id: updatedAccount.id,
            status: 'success',
            role: updatedAccount.role,
            id: updatedAccount.id
        });

    } catch (error) {
        console.log('Account registration error:', error);
        return next(new httpError('Server error during account registration', 500));
    }
}
const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const accountExist = await prisma.account.findFirst({
            where: {
                email: email
            }
        })
        if (!accountExist) {
            return new httpError('incorrect email. please enter corrrect one or  register Firest', 404)
        }
        const isMatched = await bcrypt.compare(password, accountExist.password)
        if (!isMatched) {
            return new httpError('Incorrect password please enter correct password', 401)
        }
        const userInfo = {
            accountId: accountExist.id,
            role: accountExist.role
        }
        const refreshToken = await generateRefreshToken(userInfo, next)
        const accessToken = await generateAccessToken(userInfo, next)
        await prisma.account.update({
            where: {
                id: accountExist.id
            },
            data: {
                refreshToken
            }
        })
        res.cookie('token', refreshToken, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({
            accessToken,
            email: accountExist.email,
            firestName: accountExist.firstName,
            lastName: accountExist.lastName,
            id: accountExist.id,
            status: 'success',
            role: accountExist.role,
            id: accountExist.id
        })
    } catch (error) {
        console.log('Account registration error:', error);
        return next(new httpError('Server error during account registration', 500));
    }

}

const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await prisma.account.findMany()
        res.status(200).json({ status: 'success', accounts })
    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }

}
const getAccountAndLocation = async (req, res, next) => {
    const { id } = req.params
    try {
        const account = await prisma.account.findUnique({
            where: {
                id
            },
        })
        if (!account) {
            return next(new httpError('Sorry something went wrong', 404))
        }
        res.status(200).json({ status: 'success', account })
    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }

}
const updateById = async (req, res, next) => {
    const { accountId } = req.params
    try {
        const accounts = await prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                role: 'ADMIN'
            }
        })

        res.status(200).json({ status: 'success', accounts })
    } catch (error) {
        console.log(error)
        next(new httpError(error.message, 500))
    }

}
const updateAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;
        console.log(accountId)
        const account = await prisma.account.findFirst({
            where: {
                id: accountId
            }
        })
        if (!account) return next(new httpError('no account with this Id', 404))
        // Handle file upload if exists
        let profileUrl;
        if (req.file) {
            profileUrl = req.file.filename;
        }
        let ispasswordAsked = false
        if (req.body.newPassword) {
            const isMatched = await bcrypt.compare(req.body.currentPassword, account.password)
            if (!isMatched) {
                return res.status(401).json({
                    message: "Sorry the Password is Not Correct Please Corrct Previous password",
                    status: 'error'
                })
            }
            ispasswordAsked = true
        }
        // Prepare update data
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            ...(profileUrl && { profileUrl }), // Only add if exists
            ...(ispasswordAsked && {
                password: await bcrypt.hash(req.body.newPassword, 10)
            })
        };
        // Update account with Prisma
        const updatedAccount = await prisma.account.update({
            where: { id: accountId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileUrl: true,
                role: true,
            }
        });

        res.status(200).json({
            status: 'success',
            data: updatedAccount,
            message: 'Your Account updated'
        });

    } catch (error) {
        // Handle specific Prisma errors
        console.log(error)
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'Account not found'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }

        // Generic error handler
        res.status(500).json({
            status: 'error',
            message: 'Failed to update account'
        });
    }
};
const deleteAccountById = async (req, res, next) => {
    const { accountId } = req.params;
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId,
            },
        });

        if (!account) return next(new httpError("account is Not Found", 404))
        await prisma.account.delete({
            where: {
                id: accountId
            }
        })
        return res.status(200).json({
            status: 'success',
            message: 'Successfully deleted.',
        });
    } catch (error) {
        console.log('Get account Error', error);
        next(new httpError(error.message, 500));
    }
};
const logout = async (req, res, next) => {
    try {
        // Clear the auth cookie
        res.clearCookie('token', {
            httpOnly: true,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Logged out successfully.',
        });
    } catch (error) {
        console.log('Logout Error:', error);
        next(new httpError(error.message, 500));
    }
};
const passwordReset = async (req, res, next) => {
    const { email } = req.params;

    try {
        // Find the user by email
        const user = await prisma.account.findFirst({ where: { email } });
        console.log(user, 'mail')
        if (!user) {
            return next(new httpError('No one found with this email. Enter a correct one.', 404));
        }

        // Generate a JWT token with a 1-hour expiration
        const token = jwt.sign(
            { userId: user.id },
            'reset',
            { expiresIn: '4m' }
        );

        // Construct the reset link with the token
        const resetLink = `http://localhost:3000/customers/auth/reset-password?token=${token}`;
        // Email content
        const emailHtml = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 400px; margin: 0 auto;">
    <h1 style="color: #2c3e50; text-align: center;">EthioCommerce</h1>
    <h2 style="color: #34495e; text-align: center;">Empowering Ethiopian Entrepreneurs</h2>
    <div style="border-top: 3px solid #2c3e50; margin: 20px 0;"></div>
    <p style="font-size: 16px;">Dear Merchant,</p>
    <p style="font-size: 16px;">
      You requested a password reset for your account on the <strong>EthioCommerce Platform</strong>. 
      For your security, we have provided a secure link to reset your password. Please click the button below to proceed:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      ">
        Reset Password
      </a>
    </p>
    <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
      This link will expire in 4 minutes for security purposes. If you didn't request this, please ignore this email or contact our support team immediately.
    </p>
    <div style="border-top: 3px solid #2c3e50; margin: 20px 0;"></div>
    <p style="font-size: 14px; color: #7f8c8d;">
      Thank you for being part of EthioCommerce - Ethiopia's premier e-commerce platform for SMEs and entrepreneurs.
    </p>
    <p style="font-size: 14px; color: #7f8c8d;">
      For any assistance, please contact us at <a href="mailto:support@ethiocommerce.et" style="color: #3498db;">support@ethiocommerce.et</a>.
    </p>
    <p style="font-size: 14px; color: #7f8c8d;">
      Regards,<br />
      <strong>EthioCommerce Support Team</strong>
    </p>
    <p style="font-size: 12px; color: #95a5a6; text-align: center; margin-top: 20px;">
      Supporting Ethiopian businesses to thrive in the digital economy
    </p>
  </div>
`;

        // Send the email
        await sendEmail(user.email, 'Password Reset Request', emailHtml);

        res.status(200).json({
            message: 'Please check your email. We have sent a link to reset your password.',
            status: 'success',
        });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const changePassword = async (req, res, next) => {
    const { password } = req.body;
    const userId = req.userId;

    try {
        if (!password) {
            return next(new httpError('Password is required', 400));
        }

        const user = await prisma.account.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return next(new httpError('User not found with the provided ID', 404));
        }

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(password, salt);

        await prisma.account.update({
            where: { id: userId },
            data: { password: hashNewPassword }
        });

        res.status(200).json({
            message: 'Your password has been successfully reset',
            status: 'success'
        });

    } catch (error) {
        next(new httpError(error.message || 'Internal Server Error', 500));
    }
};


module.exports = {
    registerAccount,
    getAllAccounts,
    deleteAccountById,
    login,
    logout,
    updateById,
    updateAccount,
    getAccountAndLocation,
    changePassword,
    passwordReset
}