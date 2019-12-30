const bodyParser = require("body-parser");
module.exports.route = function (app) {
	function filterdata(element) {
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
	app.all('/jsrmi', async (req, res, next) => {
		if (req.query.Controller != null) {
			var controller = require(app.get("controllers") + "/" + req.query.Controller + ".js")
			controller = new controller(req, res)
			if (req.body.run != null) {
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
	});
}