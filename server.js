const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(); // inorder to create app we need to call express method

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next(); //to finish the function
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// })
app.get('/', (req, res)=>{
  //res.send("<h1>Hello Express</h1>");

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome',

  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage:'Unable to send data'
  });
});
app.listen(3000, ()=>{
  console.log('Listening on port 3000');
});
