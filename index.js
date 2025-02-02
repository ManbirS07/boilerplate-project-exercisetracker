const express = require('express')
const app = express()
const cors = require('cors')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const userschema= new mongoose.Schema({
  username:
  {
    type:String,
    required:true
  }
})

const User=mongoose.model("User",userschema)

const exerciseSchema = new mongoose.Schema({
	userId: String,
	username: String,
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	date: String,
});

const Exercise=mongoose.model("Exercise",exerciseSchema)

app.post('/api/users',(req,res)=>
{
  const username=req.body.username
  const user=new User({username})
  user.save()
  res.json({id:user._id,username:user.username})
})

app.get('/api/users',(req,res)=>
{
  const users=User.find({})
  res.json(users)
})
app.post('/api/users/:_id/exercises',(req,res)=>
{
  const id=req.params._idid
  const {description,duration,date}=req.body
  if(!date) {
    date=date = new Date().toISOString().substring(0, 10);
  }
  //find user realted to this id
  const userr=User.findById(id)

  const exercise=new Exercise({
    userId:id,
    username:userr.username,
    description: description,
		duration: parseInt(duration),
		date: date,
  })

  exercise.save()

  res.json({})
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
