const bcrypt = require("bcrypt");

module.exports = {
    createNewUser: async (req, res) => {
        try {
            const db = req.app.get('db');
            const checkForNumber = (str) => {
                const numArr = [0,1,2,3,4,5,6,7,8,9];
                let containsNum = false;
                
                for(var i = 0; i < str.length; i++) {
                    if(str.includes(numArr[i])) {
                        containsNum = true;
                        return;
                    }
                }
                
                return containsNum;
            }

            const checkForNonNumbers = (str) => {
                const charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','@','#','$','%','&','*','!','+'];
                let containsChar = false;
                
                for(var i = 0; i < str.length; i++) {
                    if(str.includes(charArr[i])) {
                        containsChar = true;
                        return;
                    }
                }
                
                return containsChar;
            }
            
            const {firstName, lastName, gender, email, phoneNumber, username, password} = req.body;
            
            // ToDo: Add check for already existing email and username in DB.

            if (firstName === null || firstName === "") return res.status(400).send('Please enter your first name');
            if (lastName === null || lastName === "") return res.status(400).send('Please enter your last name');
            if (gender !== null && gender !== "M" && gender !== "F") res.status(400).send('Invalid gender. Please enter M, F or leave blank');
            if (email === null || email === "" || !email.includes('@')) return res.status(400).send('Invalid email');
            if (username === null || username === "") return res.status(400).send('Invalid username');
            if (password === null || password === "" || password.length < 7 || checkForNumber(password) === false) return res.status(400).send('Invalid password. Password must be at least 7 characters long and contain at least one number');
            if (phoneNumber !== null && checkForNonNumbers(phoneNumber) === true) return res.status(400).send('Invalid character in Phone Number');
            
            
            await db.query('call addNewUser($1,$2,$3,$4,$5,$6,$7)', [firstName,lastName,gender,email,phoneNumber,username,password]);
            res.send(`${firstName} ${lastName} has been added`);
            
        } catch (error) {
            console.log(error)
            res.send(error);            
        }    

    }
}