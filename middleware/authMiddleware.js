import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_secret);

            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next();
        } catch (error) {
            const er = new Error('Token no válido');
            return res.status(403).json({msg: er.message});
        }
    }

    if(!token) {
        const error = new Error('Token inexistente');
        res.status(403).json({msg: error.message});
    }

    next();
};

export default checkAuth;