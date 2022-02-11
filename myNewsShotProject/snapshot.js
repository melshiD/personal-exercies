//https://medium.com/@viviancpy/save-screenshot-of-websites-with-puppeteer-cloudinary-and-heroku-1-3-bba6082d21d0
const puppeteer = require('puppeteer');
const fs = require('fs');

async function doScreenCapture(url, site_name) {

  // const d = new Date();
  // const current_time = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`

  let windowWidth = 1920;
  let windowHeight = 1080;
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [`--window-size=1920,1080`] 
  });

  const page = await browser.newPage();
  await page._client.send('Emulation.clearDeviceMetricsOverride');

  await page.goto(url, { waitUntil: 'networkidle2' }).catch( err => console.log(err));

  //   for local file storage
  await page.screenshot({
    fullPage: true,
    // fullPage: false,
    path: `./images/${site_name}.png`
  }).catch( err => console.log(`trouble writing file`));
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
//RUN THIS TO RUN THE MAIN SCRIPT
// loopAndGetSnapshot(sitesByLine);

//Need to return a list of any links that didn't make it
doScreenCapture('C:/Users/davem/Coding/personal_exercises/myNewsShotProject/big_link_no_scroll_div.html', 'meta_divs_full');