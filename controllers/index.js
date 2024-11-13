const bcrypt = require("bcrypt");
const User = require("../models/user")

exports.showIndex = (req, res, next) => {
	res.render('index')
}

exports.showPageSignUp = (req, res, next) => {
	res.render('signUp')
}

exports.showMembersPage = (req, res) => {
	res.render('members')
}

exports.get404Page = (req, res, next) => {
	res.status(404).render('404')
}

exports.signUp = async (req, res, next) => {
	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User(username, email, hashedPassword);
	try {
		await user.save();
		res.redirect('/')
	} catch (error) {
		// res.status(401).send({ message: error.message });
		console.log(error);
		res.redirect('signup')
	}
}

// await e async são necessarios
exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne(email, password);
	try {
		if (user) {
			res.redirect('/members');
		} else {
			res.redirect('index');
		}
	} catch (error) {
		console.log(error);
		res.redirect('index');
	}
}

exports.checkAuth = (req, res, next) => {
	const auth = true;
	if (auth) {
		next();
	} else {
		res.redirect('/');
	}
}