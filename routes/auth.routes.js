 const {Router} = require('express')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const config = require('config')
 const {check , validationResult} = require('express-validator')
 const User = require('../models/User.js')
 const router = Router()

 // /api/auth/ ...

 router.post('/register',
     [
     check('email' , 'incorrect email').isEmail(),
     check('password' , 'incorrect password').isLength({ 'min': 6 })
     ],
     async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){ // проверяю не пустой ли объект/массив
                return res.status(400).json({ errors:errors.array(),'message': 'incorrect data'} )
            }
            const {email,password} = req.body; // получаю данные из запроса
            const candidate = await User.findOne({ email }) // получаю пользователя из БД
            if(candidate){  // проверка - существует ли пользователь
                return res.status(400).json({message: 'This candidate is exist!' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)  // закодирован пароль
            const user = new User({email, password: hashedPassword}) // создал нового пользователя с новым поролем
            user.save() // сохранил пользователя
            res.status(201).json({message: 'User created'})
        }catch(e){
            res.status(500).json({
            message: 'e.message',
            descriptionError:'Что-то пошло не так.'
            })
        }
    })
 router.post('/login',[
         check('email' , 'enter the correct email').normalizeEmail().isEmail(),
         check('password' , 'enter the correct password').exists()
     ],
     async (req, res) => {
     try{
         const errors = validationResult(req)
         if(!errors.isEmpty()){ // проверяю не пустой ли объект/массив
             return res.status(400).json({errors:errors.array(),'message': 'incorrect data'})
         }
         const {email, password} = req.body // получаю данные из запроса
         const user = await User.findOne({ email }) // получаю данные из БД
         if(!user){ // проверяю существует ли пользователь
             return res.status(400).json({message: 'User is not exist'})
         }
         const isMatch = await bcrypt.compare(password, user.password); // сравниваю зашированные пароли
         if(!isMatch){ // проверяю совпадают ли пароли
             return res.status(400).json({message: 'Invalid password'})
         }
         const token = jwt.sign( // создаю токен с помощью 'jsonwebtoken'
             {userId: user.id}, // получаю id
             config.get('jwtSecret'), // получаю секретную строку
             {expiresIn: '1h'} // ограничение токена по времени
         )
         res.json({token , userId: user.id,message: 'User is logged in'})
     }catch(e){
         res.status(500).json({
             message: e.message,
             descriptionError:'Что-то пошло не так.'
         })
     }
 })


 module.exports = router