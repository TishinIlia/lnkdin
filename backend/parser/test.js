var scrapedin = require('./mainProfile')

var profileScraper;
scrapedin({ email: 'nenaviju4tverg@gmail.com', password: 'HoroRedGuest1' })
  .then(function(func) {
      return func('https://www.linkedin.com/in/tishin/')
          .then(function (data) {
            profileScraper = data
            console.log(profileScraper)
          })
  })