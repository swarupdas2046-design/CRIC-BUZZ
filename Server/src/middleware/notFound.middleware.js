import { StatusCodes } from "http-status-codes";

const NotFound = (req, res, next)=>{
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found"
  })
}

export default NotFound;