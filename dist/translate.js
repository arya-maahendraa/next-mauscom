"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var selenium_webdriver_1 = require("selenium-webdriver");
var englishData = path_1.default.join(__dirname, "..", "/server/assets/data/IMDB_dataset(US).csv");
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
function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
(function start() {
    return __awaiter(this, void 0, void 0, function () {
        var driver, elemetns, translatedText, i, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser("firefox").build()];
                case 1:
                    driver = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 13, 14, 15]);
                    return [4 /*yield*/, driver.get("https://translate.google.co.id/")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("i11")).click()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("i14")).click()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.id("i14")).click()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, driver
                            .findElement(selenium_webdriver_1.By.xpath('//textarea[@aria-label="Teks sumber"]'))
                            .sendKeys("Firefox = After installing Firefox Beta, the version number of this browser is no longer available (not sure why this browser disappeared). The version that was present immediately prior to the Firefox Beta install = 46.0.1")];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementsLocated(selenium_webdriver_1.By.xpath('//span[@jsname="W297wb"]')), 5000)];
                case 8:
                    elemetns = _b.sent();
                    translatedText = "";
                    i = 0;
                    _b.label = 9;
                case 9:
                    if (!(i < elemetns.length)) return [3 /*break*/, 12];
                    _a = translatedText;
                    return [4 /*yield*/, elemetns[i].getText()];
                case 10:
                    translatedText = _a + _b.sent();
                    _b.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12:
                    console.log(translatedText);
                    return [3 /*break*/, 15];
                case 13:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 15];
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
})();
