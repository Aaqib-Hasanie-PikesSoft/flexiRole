import express from "express";
import {
  assignRole,
  getAllUserRoles,
  getUserRoles,
  removeUserRole,
} from "./controller";

const router = express.Router();

/**
 * @swagger
 * /api/user-roles-api/user-roles:
 *   post:
 *     summary: Assign a role to a user
 *     tags:
 *       - UserRoles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - role_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Role assigned to user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 role_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
router.post("/user-roles", assignRole);

/**
 * @swagger
 * /api/user-roles-api/user-roles:
 *   get:
 *     summary: Get all user-role assignments
 *     tags:
 *       - UserRoles
 *     responses:
 *       200:
 *         description: A list of all user-role assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   role_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/user-roles", getAllUserRoles);

/**
 * @swagger
 * /api/user-roles-api/user-roles/{user_id}:
 *   get:
 *     summary: Get all roles assigned to a specific user
 *     tags:
 *       - UserRoles
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of roles assigned to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                   role_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: User not found
 */
router.get("/user-roles/:user_id", getUserRoles);

/**
 * @swagger
 * /api/user-roles-api/user-roles/{user_id}/{role_id}:
 *   delete:
 *     summary: Remove a specific role from a user
 *     tags:
 *       - UserRoles
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role
 *     responses:
 *       200:
 *         description: User role removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/user-roles/:user_id/:role_id", removeUserRole);

export default router;
