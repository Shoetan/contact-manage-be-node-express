import Contacts from "../models/contact-model.js";


const getAllContacts = async (req, res) => {
  let data = await Contacts.find({user_id : req.user.userId})

  if (!data) {
    return res.status(404).json({message:"You have not saved any contacts"})
  }

  res.status(200).json(data)
 
}

const addContact = async (req, res) => {

  const {name, email, phone} =  req.body

  // check if the body is empty
  if (!name || !email || !phone) {
    return res.status(400).json({message:"All fields are required"})
  }

  // check if the email already exists
  const emailExists = await Contacts.findOne({email})

  console.log(emailExists)

  if (emailExists) {
    return res.status(401).json({message:"This email already exists"})
  }

  const contact = await Contacts.create({ 
    name,
    email,
    phone,
    user_id: req.user.userId,
  })

  console.log(contact)

  return res.status(201).json(contact)

}

const getSpecificContactById = async (req, res) => {

  const contact = await Contacts.findById(req.params.id)

  if (!contact) {
    return res.status(404).json({message:"Contact not found"})
  }

  return res.status(200).json(contact)

  
}

const updateContact = async (req, res) => {
  const contact = await Contacts.findById(req.params.id)

  const updatedContact = await Contacts.findByIdAndUpdate(contact._id, req.body, {new:true})

  return res.status(200).json(updatedContact)
}

const deleteContact = async (req, res) => {
  const contact = await Contacts.findById(req.params.id)

  if (!contact) {
    return res.status(404).json({message: "Contact not found"})
  }

  const deletedContact = await Contacts.deleteOne({_id:req.params.id})

  return res.status(200).json(deletedContact)
}


export default {getAllContacts, addContact, getSpecificContactById, updateContact, deleteContact}