const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//registro de usuario
router.post('/register', async (req, res) => {
    const {email, password, name} = req.body;

    try {
        //verificamos que el usuario ya existe
        const existeUsuario = await User.findeOne({email});
        if (existeUsuario) return res.status(400).json({message: 'Usuario ya registrado'});

        //encriptar la contraseña
        const encriptPassword = await bcrypt.hash(password, 12);

        //crear y guardar el nuevo usuario
        const nuevoUsuario = new User({email, password: encriptPassword, name});
        await nuevoUsuario.save();

        //generar token JWT
        const token = jwt.sign({id: nuevoUsuario.id }, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(201).json({token, user: {id: nuevoUsuario.id, email, name}});
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor' });
    }
});

//inicio de sesion

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        //verificar que el usuario existe
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'Usuario no registrado'});

        //verificar la contraseña
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({message: 'Contraseña incorrecta'});

        //generar token JWT
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({token, user: {id: user.id, email, name: user.name}});
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor'});
    }
});

module.exports = router;