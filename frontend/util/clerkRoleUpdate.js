// // utils/clerkApi.js

// import { Clerk } from "@clerk/clerk-sdk-node";
// const clerk = Clerk({ apiKey: process.env.CLERK_API_KEY });

// export const updateUserRole = async (userId, role) => {
//   try {
//     const updatedUser = await clerk.users.updateUser(userId, {
//       metadata: {
//         role: role, // Set the role metadata here
//       },
//     });
//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating user role:", error);
//     throw error;
//   }
// };
