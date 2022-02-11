//https://medium.com/@viviancpy/save-screenshot-of-websites-with-puppeteer-cloudinary-and-heroku-1-3-bba6082d21d0
const puppeteer = require('puppeteer');
const fs = require('fs');

async function doScreenCapture(url, site_name) {

  // const d = new Date();
  // const current_time = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  //   for local file storage
  await page.screenshot({
    fullPage: false,
    path: `./images/${site_name}.png`
  });
  console.log(`${(await browser.pages()).length}: NUMBER OF BROWSER WINDOWS OPEN`);
  browser.close();
}


const newSites = fs.readFileSync('C:/Users/davem/Coding/personal_exercises/myNewsShotProject/bookmarks/bookmark_url_arrays/url_array.txt').toString('utf-8');
let sitesByLine = newSites.split('\n');
const loopAndGetSnapshot = async (siteList) => {
  console.log('start');

  for(let site of siteList){
    await doScreenCapture(site, siteList.indexOf(site));
    // console.log(site);
  }
}

loopAndGetSnapshot(sitesByLine);