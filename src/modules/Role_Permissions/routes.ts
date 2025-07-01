// src/modules/role_permission/routes.ts

import express from "express";
import {
  assignPermission,
  getRolePermissions,
  removeRolePermission,
} from "./controller";

const router = express.Router();

/**
 * @swagger
 * /api/role-permission-api/role-permissions:
 *   post:
 *     summary: Assign a permission to a role
 *     tags:
 *       - RolePermission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *               - permission_id
 *             properties:
 *               role_id:
 *                 type: integer
 *               permission_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Permission assigned to role successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role_id:
 *                   type: integer
 *                 permission_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 */
router.post("/role-permissions", assignPermission);

/**
 * @swagger
 * /api/role-permission-api/role-permissions/{role_id}:
 *   get:
 *     summary: Get all permissions assigned to a role
 *     tags:
 *       - RolePermission
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role
 *     responses:
 *       200:
 *         description: List of permissions for the role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   role_id:
 *                     type: integer
 *                   permission_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Role not found
 */
router.get("/role-permissions/:role_id", getRolePermissions);

/**
 * @swagger
 * /api/role-permission-api/role-permissions/{role_id}/{permission_id}:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags:
 *       - RolePermission
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role
 *       - in: path
 *         name: permission_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the permission to remove
 *     responses:
 *       200:
 *         description: Role permission removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Role permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/role-permissions/:role_id/:permission_id",
  removeRolePermission
);

export default router;
