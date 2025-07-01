import express from "express";
import {
  getPermissions,
  createPermission,
  getPermissionByIdOrName,
  updatePermission,
  deletePermission,
} from "./controller";

const router = express.Router();

/**
 * @swagger
 * /api/permissions-api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags:
 *       - Permissions
 *     responses:
 *       200:
 *         description: A list of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   permission_name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 */
router.get("/permissions", getPermissions);

/**
 * @swagger
 * /api/permissions-api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags:
 *       - Permissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permission_name
 *             properties:
 *               permission_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 permission_name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Server error
 */
router.post("/permissions", createPermission);

/**
 * @swagger
 * /api/permissions-api/permissions/{identifier}:
 *   get:
 *     summary: Get a permission by ID or name
 *     tags:
 *       - Permissions
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID (integer) or name (string)
 *     responses:
 *       200:
 *         description: Permission found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 permission_name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Permission not found
 */
router.get("/permissions/:identifier", getPermissionByIdOrName);

/**
 * @swagger
 * /api/permissions-api/permissions/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags:
 *       - Permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permission_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 permission_name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.put("/permissions/:id", updatePermission);

/**
 * @swagger
 * /api/permissions-api/permissions/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags:
 *       - Permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.delete("/permissions/:id", deletePermission);

export default router;
