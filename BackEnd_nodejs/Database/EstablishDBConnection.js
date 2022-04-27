const mongoose = require("mongoose");

const uri = process.env.DB_URL;
console.log(uri)

async function run() {
    try {
        await mongoose.connect(uri);
        console.log('connected DB');
    } catch (error) {
        console.log('error');
        console.log(error.message);
        process.exit(1);
    }
}
run();