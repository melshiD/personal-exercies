//https://medium.com/@viviancpy/save-screenshot-of-websites-with-puppeteer-cloudinary-and-heroku-1-3-bba6082d21d0
const puppeteer = require('puppeteer');



async function doScreenCapture(url, site_name) {

  const d = new Date();
  const current_time = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`

  const cloudinary_options = {
    public_id: `newsshot/${current_time}_${site_name}`,
  };
  console.log(cloudinary_options.public_id);

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


const newSites = [
  {
    name: 'nasa',
    url: 'https://www.nasa.gov/'
  }, {
    name: 'coindesk',
    url: 'https://www.coindesk.com/'
  }, {
    name: 'cointelegraph',
    url: 'https://cointelegraph.com/'
  }, {
    name: 'reuters',
    url: 'https://reuters.com/'
  }
];

async function doSnapshots(new_site) {
  let cloudinary_promises = [];
  for (let site of new_sites) {
    try {
      let cloudinary_snapshot = await doScreenCapture(site['url'], site['name']);
      if (cloudinary_snapshot) {
        cloudinary_promises.push(cloudinary_snapshot);
      }
    } catch (e) {
      console.error(`[${site['name'] || 'Unknown site'}] Error insnapshotting`, e);
    }
  }
  Promise.all(cloudinary_promises).then(function (val) {
    process.exit();
  });
}

// doSnapshots(new_sites);
for (let site of newSites) {
  doScreenCapture(site['url'], site['name']);
}