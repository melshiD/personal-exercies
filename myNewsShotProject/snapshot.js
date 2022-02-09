//https://medium.com/@viviancpy/save-screenshot-of-websites-with-puppeteer-cloudinary-and-heroku-1-3-bba6082d21d0
const puppeteer = require('puppeteer');
async function doScreenCapture(url, site_name) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});  
  await page.screenshot({
    fullPage: true,
    path:`./images/${site_name}.png`
  });
  await browser.close();
}

const news_sites = [
    {
      name: 'nasa',
      url: 'https://www.nasa.gov/'
    }, {
      name: 'melshtastic',
      url: 'https://www.melshtastic.com/'
    }, {
      name: 'frontendmasters',
      url: 'https://frontendmasters.com/dashboard/'
    }, {
      name: 'themeroller',
      url: 'https://themeroller.jquerymobile.com/'
    }, {
      name: 'reuters_ara',
      url: 'https://ara.reuters.com/'
    }, {
      name: 'empathy_mapping',
      url: 'https://www.nngroup.com/articles/empathy-mapping/'
    }
    //how can I limit the size/length what have you of the screenshot taken
  ];
  for (var i = 0; i < news_sites.length; i++) {
    try{
        doScreenCapture(news_sites[i]['url'], news_sites[i]['name']);
      }catch(e){
        console.error(`Error in capturing site for ${news_sites[i]['name']}`, e);
      }
    }


    // WHEN YOU SIT BACK DOWN, GET A CLOUDINARY ACCOUNT AND AND COPY THE CLOUD NAME, API KEY AND API SECRET TO THE .ENV FILE AS :'