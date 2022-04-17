"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
// import { slanglWords, stopWords } from '../loaders/dataLoader';
var Preprocessing = /** @class */ (function () {
    function Preprocessing(slanglWords, stopWords, akarata) {
        this.slanglWords = slanglWords;
        this.stopWords = stopWords;
        this.akarata = akarata;
        this.text = '';
        this.terms = [];
    }
    /**
     * input text to the object
     * @param {string} text - text you want to preprocess
     */
    Preprocessing.prototype.do = function (text) {
        this.text = text;
        return this;
    };
    /**
     * transform text to lowercase
     */
    Preprocessing.prototype.caseFolding = function () {
        this.text = this.text.toLowerCase();
        return this;
    };
    /**
     * remove url and all symbol from text
     */
    Preprocessing.prototype.cleansing = function () {
        /* eslint-disable no-useless-escape */
        var urlPatern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g;
        var emojiPattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        this.text = this.text
            .replace(urlPatern, '')
            .replace(emojiPattern, '')
            .replace(/\#\w\w+\s?/g, '')
            .replace(/RT\s*@\S+/g, '')
            .replace(/@\S+/g, '')
            .replace(/[^a-zA-Z ]/g, '')
            .trim();
        /* eslint-enable no-useless-escape */
        return this;
    };
    /**
     * remove stop words and normalize terms.
     * first normalize slang words and remove the stopwords
     */
    Preprocessing.prototype.removeStopWords = function () {
        var _this = this;
        // normalize terms
        var tempTerms = this.terms.map(function (word) {
            var slangId = _this.slanglWords.map(function (el) { return el.slang; }).indexOf(word);
            return slangId && slangId !== -1 ? _this.slanglWords[slangId].formal : word;
        });
        // remove stopwords
        this.text = tempTerms.join(' ');
        // using regexp top remove the soptwords i assume is fastest
        this.text = this.text
            .replace(new RegExp("\\b(".concat(this.stopWords.join('|'), ")\\b"), 'g'), '')
            .replace(/\s\s+/g, ' ')
            .trim();
        this.terms = this.text.split(' ');
        this.terms = this.terms.filter(function (term) { return term !== ''; });
        return this;
    };
    /**
     * split text into individual words
     */
    Preprocessing.prototype.stemming = function () {
        var _this = this;
        this.terms = this.terms.map(function (word) {
            return _this.akarata.stem(word);
        });
        return this;
    };
    /**
     * split text into individual words
     */
    Preprocessing.prototype.tokenization = function () {
        this.terms = this.text.split(' ');
        return this;
    };
    /**
     * do all preprocess and return
     * @param {string} text - text you want to preprocess
     * @return Array of string
     */
    Preprocessing.prototype.process = function (text) {
        return this.do(text).caseFolding().cleansing().tokenization().removeStopWords().stemming().getTerms();
    };
    /**
     * retrun text
     */
    Preprocessing.prototype.getText = function () {
        return this.text;
    };
    /**
     * retrun tokens
     */
    Preprocessing.prototype.getTerms = function () {
        return this.terms;
    };
    Preprocessing = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)('slanglWords')),
        __param(1, (0, typedi_1.Inject)('stopWords')),
        __param(2, (0, typedi_1.Inject)('akarata')),
        __metadata("design:paramtypes", [Array,
            Array, Object])
    ], Preprocessing);
    return Preprocessing;
}());
exports.default = Preprocessing;
