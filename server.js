const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //is an ojbect that stores all of our environment variables as key value pairs

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); //this lets us set express related configurations

app.use((req, res, next) => { //app.use is how you register middleware. Next exists so you can tell express when the function is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //takes absolute path __dirname stores path to files directory

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { //req stores a ton of information about the request comoing in, things like the header that was used, the body information.
  // res.send('<h1>hello Express</h1>');
  // res.send({
  //   name: 'Jimmy',
  //   likes: [
  //     'Photography',
  //     'Cooking'
  //   ],
  // });
  res.render('home.hbs', {
    pageTitle: 'Welcome to the Homepage',
    name: 'Jimmy',
    likes: [
      'Photography',
      'Cooking'
    ]
  })
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', { //render lets us render whatever templates we already we have setup
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

app.listen(port, () => { //takes 2 arguments, 2nd one is function
  console.log(`Server is up on port ${port}`);
}); //this is going to bind the application to a port on our machine
