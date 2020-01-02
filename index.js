const bodyParser = require("body-parser");
const path = require('path');
const formidable = require('formidable')
module.exports.route = function (app) {
	function filterdata(element) {
		if (typeof element != "String") return element;
		switch (element.split("::")[0]) {
			case 'String':
				return element.split("::")[1];
			case 'int':
				return parseInt(element.split("::")[1]);
			case 'float':
				return parseFloat(element.split("::")[1]);
			case 'boolean':
				return element.split("::")[1].toUppercase() == "TRUE";
			case 'json':
				return JSON.parse(element.split("::")[1]);
		}
	}
	app.use(bodyParser.urlencoded({ extended: false }));
	app.all('/jsrmi.js', (req, res, next) => {
		res.sendFile(path.join(__dirname, '/Js/jsrmi.js'));
	});;
	app.all('/jsrmi', async (req, res, next) => {
		if (req.query.Controller != null) {
			var controller = require(app.get("controllers") + "/" + req.query.Controller + ".js")
			controller = new controller(req, res)
			if (req.get('Content-Type') != undefined && req.get('Content-Type').includes("multipart/form-data")) {
				var form = new formidable.IncomingForm();
				form.parse(req, async function (err, fields, files) {
					if (fields.run != null) {
						var run = "Multi_" + fields.run;
						if (controller[run] == undefined) run += "_File";
						try {
							if (err != undefined) res.send({ ErrorMsg: err });
							var returnval = {};
							var filterd_fields = []
							for (var i = 0; i < fields.para_count; i++) {
								if (fields["para_" + i] != undefined)
									filterd_fields.push(fields["para_" + i])
								if (files["para_" + i] != undefined)
									filterd_fields.push(files["para_" + i])
							}
							returnval = await controller[run].apply(controller, filterd_fields);
							res.send({ Return: returnval });
						} catch (error) {
							console.log(error);
							res.send({ ErrorMsg: error });
						}
					}
				});
			} else {
				if (req.body.run != null) {
					if (controller[req.body.run] == undefined) req.body.run += "_File";
					try {
						var returnval = {};
						if (req.body['para[]'] != null) {
							if (typeof (req.body['para[]']) == "Array" || typeof (req.body['para[]']) == "object") {
								for (const key in req.body['para[]']) {
									req.body['para[]'][key] = filterdata(req.body['para[]'][key])
								}
								returnval = await controller[req.body.run].apply(controller, req.body['para[]'])
							} else {
								req.body['para[]'] = filterdata(req.body['para[]'])
								returnval = await controller[req.body.run](req.body['para[]']);
							}
						} else {
							returnval = await controller[req.body.run]();
						}
						res.send({ Return: returnval });
					} catch (error) {
						res.send({ ErrorMsg: error });
					}
				} else {
					var out = [];
					for (var p in controller) {
						if (typeof controller[p] === "function") {
							out.push(p);
						}
					};
					res.send({ Methods: out });
				}
			}
		}
	});
}