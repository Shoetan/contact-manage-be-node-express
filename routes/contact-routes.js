import express from 'express'
import contactController from '../controllers/contact-controller.js'
import { validateToken } from '../utils/utils.js'

const router =  express.Router()

router.use(validateToken)

router.get("/", contactController.getAllContacts)
router.post("/", contactController.addContact)
router.get("/:id", contactController.getSpecificContactById) // get specific contact
router.put("/:id", contactController.updateContact) // update contact
router.delete("/:id", contactController.deleteContact) // delete contact

export default router
