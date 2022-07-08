const { Console } = require('console');
const fs = require('fs');
const { parse } = require('path');
// const writeStream = fs.createWriteStream('url_array.txt');
// const pathName = writeStream.path
async function parseBookmarkPage() {

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('C:/Users/davem/Coding/personal_exercises/myNewsShotProject/bookmarks/bookmarks_2_10_22.html', { waitUntil: 'networkidle2' });

    const linkList = await page.evaluate(() => {
        let linkTags = document.querySelectorAll('a');
        let links = [];
        linkTags.forEach((link) => links.push(link.href));
        return links;
    });


    let path = `C:/Users/davem/Coding/personal_exercises/myNewsShotProject/bookmarks/bookmark_url_arrays/url_array.txt`;

    const writeToFile = fs.createWriteStream(path, {
        flags: 'a'
    });
    for(let link of linkList){
        writeToFile.write(`${link}\n`);
    }


    // fs.open(path, 'w', function(err, fd){
    //     if(err){
    //         throw 'could not open file: ' + err;
    //     }
    //     fs.write(fd, linkList[19], 0, 'utf8', function(err){
    //         if(err) throw 'error writing file: ' +err;
    //         fs.close(fd, function(){
    //             console.log('wrote file successfully');
    //         });
    //     });
    // });
    browser.close();
}

parseBookmarkPage();

// WHEN YOU SIT BACK DOWN EXAMINE HOW TO WRITE WITH FS 
// AND THEN FINISH UP SAVING TEST IMAGE ELEMENT TO FOLDER