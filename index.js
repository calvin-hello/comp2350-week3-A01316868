require('dotenv').config();

const express = require('express');
const app = express();

const mysql = require('mysql2/promise');

const port = process.env.PORT || 3018;

const dbConfig = {
	host: process.env.DB_HOST || "mysql-c9f4c21-comp2350wee02.h.aivencloud.com",
	port: process.env.DB_PORT || 19311,
	user: process.env.DB_USER || "avnadmin",
	password: process.env.DB_PASSWORD || "AVNS_eT82qrb5grVbPkog4Ta",
	database: process.env.DB_DATABASE || "defaultdb",
	multipleStatements: false
};

var database = mysql.createPool(dbConfig);

async function printMySQLVersion() {
	let sqlQuery = `
		SHOW VARIABLES LIKE 'version';
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log(`Successfully connected to MySQL host: ${process.env.DB_HOST}`);
		console.log(results[0]);
		return true;
	}
	catch(err) {
		console.log(`Error getting version from MySQL`);
		console.log(err);
		return false;
	}
}


app.get('/', (req, res) => {
	console.log("page hit");
	const success = printMySQLVersion();
	
	if (success) {
		res.send(
			`<!doctype html>
			<html>
				<head></head>
				<body>
					<div>Connected to the database host: ${process.env.DB_HOST}, check the Hosted logs for the results.</div>
				</body>
			</html>`
			);
	}
	else {
		res.status(500);
		res.send(
			`<!doctype html>
			<html>
				<head></head>
				<body>
					<div>Database error, check the logs for the details.</div>
				</body>
			</html>`);
		console.log("Error connecting to mysql");
		console.log(err);
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});



