import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public 
const authUser = asyncHandler(async(req, res) => {
  req.body
})