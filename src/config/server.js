var express = require("express");
var app = express();

var port = process.env.PORT || 8080;
app.set("port", port);

var bodyParser = require("body-parser");
app.use(bodyParser.json({inflate: true, limit: '25mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '25mb'}));

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var passport = require("passport");
app.use(passport.initialize());

var initPassport = require("../app/passport/init")(passport);
var db = require("../app/models");

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Change this in config file to lock down
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Accept", "application/json");
	next();
});

// auth 
var login = require("../app/routes/auth/login")(express, passport);
var isAuth = require("../app/routes/auth/is_auth")(express, passport);
var forgotPassword = require("../app/routes/auth/forgot_password")(express);
var resetPassword = require("../app/routes/auth/reset_password")(express);
var changePassword = require("../app/routes/auth/change_password")(express);

// emails 
var emailApi = require("../app/routes/email/email")(express, passport);

// lab_db models
var labDesignApi = require("../app/routes/lab/design")(express);
var labDesignFamilyApi = require("../app/routes/lab/design_family")(express);
var labDesignOwnerApi = require("../app/routes/lab/design_owner")(express);
var labApi = require("../app/routes/lab/lab")(express);
var notificationApi = require("../app/routes/lab/notification")(express);
var practiceApi = require("../app/routes/lab/practice")(express);
var roleApi = require("../app/routes/lab/role")(express);
var roleTypeApi = require("../app/routes/lab/role_type")(express);
var userApi = require("../app/routes/lab/user")(express, passport);
var addressTypeApi = require("../app/routes/lab/address_type")(express, passport);

// patient_db models
var cornealMapApi = require("../app/routes/patient/corneal_map")(express);
var eyeApi = require("../app/routes/patient/eye")(express); // AP-EYE
var orderApi = require("../app/routes/patient/order")(express);
var orderItemApi = require("../app/routes/patient/order_item")(express);
var noteApi = require("../app/routes/patient/note")(express);
var orderOutcomeApi = require("../app/routes/patient/order_outcome")(express);
var patientApi = require("../app/routes/patient/patient")(express);
var statusApi = require("../app/routes/patient/status")(express);

// Lens design routes
var designApi = require("../app/routes/design/design")(express);

// permission routes 
var labPermissionApi = require("../app/routes/permission/lab")(express);
var orderPermissionApi = require("../app/routes/permission/order")(express);
var patientPermissionApi = require("../app/routes/permission/patient")(express);
var practicePermissionApi = require("../app/routes/permission/practice")(express);
var userPermissionApi = require("../app/routes/permission/user")(express);

// design
var designsApi = require("../app/routes/designs/designs")(express);

// auth 
app.use("/", login);
app.use("/", isAuth);
app.use("/", forgotPassword);
app.use("/", resetPassword);
app.use("/", changePassword);

// emails
app.use("/", emailApi);

// lab_db models
app.use("/", labDesignApi);
app.use("/", labDesignFamilyApi);
app.use("/", labDesignOwnerApi);
app.use("/", labApi);
app.use("/", notificationApi);
app.use("/", practiceApi);
app.use("/", roleApi);
app.use("/", roleTypeApi);
app.use("/", userApi);
app.use("/", addressTypeApi);

// patient_db models
app.use("/", cornealMapApi);
app.use("/", eyeApi);
app.use("/", orderApi);
app.use("/", orderItemApi);
app.use("/", noteApi);
app.use("/", orderOutcomeApi);
app.use("/", patientApi);
app.use("/", statusApi);

// designs
app.use("/", designApi);

// permissions
app.use("/", labPermissionApi);
app.use("/", orderPermissionApi);
app.use("/", patientPermissionApi);
app.use("/", practicePermissionApi);
app.use("/", userPermissionApi);

// designs
app.use("/", designsApi);
// Attach site name to request
app.use(function(req, res, next) {
	db.Lab.Config.find({
		where: { key: "site_name" }
	})
	.then(function(config) {
		req.body.site_name = config.value;
		next();
	})
	.catch(function(){
		next();
	});
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500).send(err);
});

module.exports = app;