var express = require('express');
var router = express.Router();
var Bank = require('../services/bank');
function authMiddleware(req, res, next) { //Router level middleware
  console.log("authMiddileware");
  if (req.session.CurrentUser) {
    next()
  } else {
    res.status(401).send({ message: "User not authenticed" })
  }
}
/* GET users listing. */
router.get('/', authMiddleware, function (req, res, next) {
  res.send(Bank.getUsers());
});
router.post('/register', function (req, res) {
  let usname = req.body.username;
  let acntno = req.body.acntno;
  let pwd = req.body.password;
  let cpwd = req.body.conpass;
  let data = Bank.getUsers()
  if (usname in data) {
    res.status(400).send({ message: "User already exist please login!" });
  } else if (pwd !== cpwd) {
    res.status(400).send({ message: "Password Missmatch" });

  } else {
    Bank.addUser(usname,pwd,acntno);
    res.send({ message: "successfull registration" });

  }
});
router.post('/login', function (req, res) {
  let usname = req.body.username;
  let pwd = req.body.password;
  let data = Bank.getUsers()
  console.log(data)
  if (usname in data) {
    let password = data[usname]["password"];
    if (pwd == password) {
      req.session.CurrentUser=usname;
      // Bank.setCurrentUser(usname);
      res.send({ message: "login sucess!" });
    }
    else {
      res.status(400).send({ message: "login failed!" });
    }
  }
  else {
    res.status(400).send({ message: "invalid user" })
  }
});
router.post('/deposit', authMiddleware, function (req, res) {
  let uname = req.body.usernamedep;
  let amt = Number(req.body.amountdep);
  let data = Bank.getUsers();
  if (uname in data) {
    if (uname != req.session.CurrentUser) {
      res.status(400).send({ message: "Invalid user" });
    }
    data[uname]["balance"] += amt;
    let balance = data[uname]["balance"]
    data[uname]["history"].push({
      typeOfTransaction: "Credit",
      amount: amt
    })
    res.send({ balance: balance, message: "Deposit Successfull!" });
  } else {
    res.status(400).send({ message: "Account not exist!" });
  }
});
router.post('/withraw', authMiddleware, function (req, res) {
  let uname = req.body.usernamewith;
  let amt = Number(req.body.amountwith);
  let data = Bank.getUsers();
  if (uname in data) {
    if (uname !=req.session.CurrentUser) {
      res.status(400).send({ message: "Invalid user" });
    }
    let avbal = data[uname]["balance"];
    if (amt > avbal) {
      res.status(400).send({ balance: avbal, message: "Insufficient balance!" });
    } else {
      data[uname]["balance"] -= amt;
      let balance = data[uname]["balance"]
      data[uname]["history"].push({
        typeOfTransaction: "Debited",
        amount: amt
      })
      res.send({ balance: balance, message: "Withdrawel Successfull!" });
    }
  } else {
    res.status(400).send({message:"Account not exist!"});
  }

});
router.get('/transactionhistory',authMiddleware,function (req, res) {
  let data = Bank.getUsers();
  let uname = req.session.CurrentUser;
  if (uname in data) {
    return res.send({ history: data[uname].history });
  } else {
    res.status(400).send({ message: "invalid user" });
  }

});
// router.get('/user', function (req, res, next) {

// });
module.exports = router;
