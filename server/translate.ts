import fs from "fs";
import path from "path";
import axios from "axios";
import { Builder, By, Key, until } from "selenium-webdriver";

const englishData = path.join(
   __dirname,
   "..",
   "/server/assets/data/IMDB_dataset(US).csv"
);

// const en = fs
//    .readFileSync(englishData)
//    .toString("utf-8")
//    .split("\n")
//    .slice(1)
//    .map((term) => {
//       return {
//          text: term.substring(0, term.length - 2),
//          sentiment: +term.substring(term.length - 1, term.length),
//       };
//    })
//    .filter((data) => {
//       return data.sentiment === 0 || data.sentiment === 1;
//    });

function sleep(milliseconds: number) {
   const date = Date.now();
   let currentDate = null;
   do {
      currentDate = Date.now();
   } while (currentDate - date < milliseconds);
}

(async function start() {
   const driver = await new Builder().forBrowser("firefox").build();

   try {
      await driver.get("https://translate.google.co.id/");
      await driver.findElement(By.id("i11")).click();
      await driver.findElement(By.id("i14")).click();
      await driver.findElement(By.id("i14")).click();
      await driver
         .findElement(By.xpath('//textarea[@aria-label="Teks sumber"]'))
         .sendKeys(
            "Firefox = After installing Firefox Beta, the version number of this browser is no longer available (not sure why this browser disappeared). The version that was present immediately prior to the Firefox Beta install = 46.0.1"
         );
      const elemetns = await driver.wait(
         until.elementsLocated(By.xpath('//span[@jsname="W297wb"]')),
         5000
      );
      let translatedText = "";
      for (let i = 0; i < elemetns.length; i++) {
         translatedText += await elemetns[i].getText();
      }
      console.log(translatedText);
   } catch (err) {
      console.log(err);
   } finally {
      // await driver.quit();
   }
})();
