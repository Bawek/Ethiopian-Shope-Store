
const prisma = require("../config/db"); // Import Prisma instance
const httpError = require("../middlewares/httpError");

const saveUserToDatabase = async (req, res, next) => {
  const { data, type } = req.webhookEvent;
  console.log(data, type)
  if (type !== 'user.created') {
    return next(new httpError('Invalid event type', 400));
  }
  try {
    const { id, first_name, last_name, email_addresses } = data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      return next(new httpError('Email is missing', 400));
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(200).json({ success: true, message: 'User already exists' });
    }

    // Register user
    const newUser = await prisma.user.create({
      data: {
        name: `${first_name} ${last_name}`,
        email
      }
    });

    console.log(`User registered: ${newUser.email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

module.exports = { saveUserToDatabase };
