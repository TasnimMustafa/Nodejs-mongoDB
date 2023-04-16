const express =require('express')
const User = require('../model/user')

const router = express.Router()
router.post('/users',(req,res)=>{
    console.log(req.body)

    const user = new User(req.body)

    user.save()
    .then(()=>{res.status(200).send(user)})
    .catch((e)=>{res.status(400).send(e)})
})

//////////////// GET All Data ///////////////

router.get("/users",(req,res)=>{
    User.find({}).then((user)=>{
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//////////////// GET specific data /////////////

router.get("/users/:id",(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if (!user) {
            return res.status(404).send('Unable To Find This User')
        }
        res.status(200).send(user)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })
})

/////////////////////// Update ///////////////////////

router.patch("/users/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id,req.body,{
            new:true,
            runValidators:true
        })
        if (!user) {
            return res.status(404).send("Unable To Find This User")
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

/////////////////// Delete ////////////////////////

router.delete("/users/:id",async(req,res)=>{
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("Unable To Find This User")
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
///////////////////////////////////////

module.exports = router