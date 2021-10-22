const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index = async (req,res)=>{


  const users = await User.find();

  res.status(200).json(users);


}


exports.show = async (req,res)=>{

	const {email} = req.params;

	try{
		const user = await User.findOne({ email});

		if(user)
			res.status(200).json(user);
		else
	  		throw 'Not found';
	}catch(error){
			res.status(404).json({msg:'Not found'});
  
	}

}

exports.search = async (req,res)=>{

	let {query} = req.params;




	try{
		const users = await User.find({name: { $regex: new RegExp(query, "i") } })

		if(users)
			res.status(200).json(users);
		else
	  		throw 'Not found';
	}catch(error){
			res.status(404).json({msg:'Not found'});
  
	}

}

exports.update = async (req,res)=>{
  const {body} = req;

  try{
    let user = await User.findOneAndUpdate({_id : req.user.id }, body, { new: true } )
    res.json(user);

  }catch(error){
    			res.status(400).json({msg:'No se pudo actualizar'});

  }
}

exports.cv =  (req,res)=>{
	res.json(req.user);
}
