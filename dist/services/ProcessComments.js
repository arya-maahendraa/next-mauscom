"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var typedi_1 = require("typedi");
var utilities_1 = __importDefault(require("../utilities"));
var YoutubeComment_1 = __importDefault(require("./YoutubeComment"));
var YoutubeVideo_1 = __importDefault(require("./YoutubeVideo"));
var HttpException_1 = __importDefault(require("../exceptions/HttpException"));
var Preprocessing_1 = __importDefault(require("./Preprocessing"));
var NaiveBayes_1 = __importDefault(require("./NaiveBayes"));
var ProcessComments = /** @class */ (function () {
    function ProcessComments(logger, naiveBayesModel, preprocessing, naiveBayes) {
        this.logger = logger;
        this.naiveBayesModel = naiveBayesModel;
        this.preprocessing = preprocessing;
        this.naiveBayes = naiveBayes;
    }
    /**
     * GET all comments of a video from youtube.
     * @param {string} url - the url of video that you want to grab the comment.
     * @returns all top level comments.
     */
    ProcessComments.prototype.getAllComments = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var videoId, videoDetails, allComments, pageToken, allTerms, _a, nextPageToken, comments, countPositive, countNegative, terms;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        videoId = utilities_1.default.url.extractVidioId(url);
                        return [4 /*yield*/, this.getVideoDetails(videoId)];
                    case 1:
                        videoDetails = _c.sent();
                        allComments = __assign(__assign({}, videoDetails), { comments: [], totalPositive: 0, totalNegative: 0, wordClouData: [] });
                        pageToken = "";
                        allTerms = [];
                        _c.label = 2;
                    case 2: return [4 /*yield*/, this.getComments(videoId, pageToken)];
                    case 3:
                        _a = _c.sent(), nextPageToken = _a.nextPageToken, comments = _a.comments, countPositive = _a.countPositive, countNegative = _a.countNegative, terms = _a.terms;
                        allTerms = allTerms.concat(terms);
                        (_b = allComments.comments).push.apply(_b, comments);
                        allComments.totalPositive += countPositive;
                        allComments.totalNegative += countNegative;
                        pageToken = nextPageToken;
                        this.logger.debug("Get comment from page: ".concat(nextPageToken, " | total comments: ").concat(comments.length));
                        _c.label = 4;
                    case 4:
                        if (pageToken) return [3 /*break*/, 2];
                        _c.label = 5;
                    case 5:
                        allComments.wordClouData = this.generateWordCloudData(allTerms);
                        return [2 /*return*/, allComments];
                }
            });
        });
    };
    /**
     * GET video details from api and only get the important data
     * @param {string} vidioId - the id of video that you want to grab the details.
     * @returns {IVideoDetails} details vidio (channelID, Chanel Title, vidio title, desc, thumbnail, publushed at)
     */
    ProcessComments.prototype.getVideoDetails = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var youtubeVideoInstance, rawVideoDetails, videoDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        youtubeVideoInstance = new YoutubeVideo_1.default();
                        return [4 /*yield*/, youtubeVideoInstance.getVideoDetail(videoId)];
                    case 1:
                        rawVideoDetails = _a.sent();
                        // const rawRating = await youtubeVideoInstance.getVideoRaiting(videoId);
                        // console.log(rawRating);
                        if (rawVideoDetails.error) {
                            this.logger.error("Error at GET video details from youtube API.");
                            throw new HttpException_1.default(parseInt(rawVideoDetails.error.code), rawVideoDetails.error.message);
                        }
                        /**
                         * throw error if the video details is empty
                         */
                        if (rawVideoDetails.items.length === 0) {
                            this.logger.error("Error at GET video details from youtube API.");
                            throw new HttpException_1.default(404, "Video not found.");
                        }
                        videoDetails = {
                            channelId: rawVideoDetails.items[0].snippet.channelId,
                            channelTitle: rawVideoDetails.items[0].snippet.channelTitle,
                            title: rawVideoDetails.items[0].snippet.title,
                            description: rawVideoDetails.items[0].snippet.description,
                            thumbnails: rawVideoDetails.items[0].snippet.thumbnails.standard.url,
                            publishedAt: rawVideoDetails.items[0].snippet.publishedAt,
                            likes: rawVideoDetails.items[0].statistics.likeCount,
                            view: rawVideoDetails.items[0].statistics.viewCount,
                            comments: rawVideoDetails.items[0].statistics.commentCount,
                        };
                        return [2 /*return*/, videoDetails];
                }
            });
        });
    };
    /**
     * GET comments from api and only get the important data
     * @param {string} vidioId - the id of video that you want to grab the details.
     * @returns {Array<IComment>}
     */
    ProcessComments.prototype.getComments = function (videoId, nextPageToken) {
        return __awaiter(this, void 0, void 0, function () {
            var comments, youtubeCommentInstance, rawComments, terms, countPositive, countNegative, index, rawComment, processedText, sentiment, result, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comments = [];
                        youtubeCommentInstance = new YoutubeComment_1.default();
                        return [4 /*yield*/, youtubeCommentInstance.getComment(videoId, 100, nextPageToken)];
                    case 1:
                        rawComments = _a.sent();
                        /**
                         * thorw error about youtube api errors.
                         */
                        if (rawComments.error) {
                            this.logger.error("Error at GET comments from youtube API.");
                            throw new HttpException_1.default(parseInt(rawComments.error.code), rawComments.error.message);
                        }
                        terms = [];
                        countPositive = 0;
                        countNegative = 0;
                        for (index = 0; index < rawComments.items.length; index++) {
                            rawComment = rawComments.items[index];
                            processedText = this.preprocessing.process(rawComment.snippet.topLevelComment.snippet.textOriginal);
                            terms = terms.concat(processedText);
                            sentiment = "Undefined";
                            if (processedText.length > 0) {
                                result = this.naiveBayes.predic(processedText, this.naiveBayesModel, 1);
                                if (result === 1) {
                                    countPositive++;
                                    sentiment = "Positive";
                                }
                                else if (result === -1) {
                                    sentiment = "Negative";
                                    countNegative++;
                                }
                            }
                            comment = {
                                id: rawComment.id,
                                authorDisplayName: rawComment.snippet.topLevelComment.snippet.authorDisplayName,
                                authorProfileImageUrl: rawComment.snippet.topLevelComment.snippet.authorProfileImageUrl,
                                textOriginal: rawComment.snippet.topLevelComment.snippet.textOriginal,
                                processedTest: processedText.join(" "),
                                likeCount: rawComment.snippet.topLevelComment.snippet.likeCount,
                                publishedAt: rawComment.snippet.topLevelComment.snippet.publishedAt,
                                updatedAt: rawComment.snippet.topLevelComment.snippet.updatedAt,
                                sentiment: sentiment,
                            };
                            comments.push(comment);
                        }
                        return [2 /*return*/, {
                                nextPageToken: rawComments.nextPageToken,
                                comments: comments,
                                countPositive: countPositive,
                                countNegative: countNegative,
                                terms: terms,
                            }];
                }
            });
        });
    };
    ProcessComments.prototype.generateWordCloudData = function (terms) {
        var result = [];
        var _loop_1 = function (i) {
            var exist = result.findIndex(function (e) { return e.term === terms[i]; });
            if (exist === -1) {
                result.push({
                    term: terms[i],
                    count: 1,
                });
            }
            else {
                result[exist].count += 1;
            }
        };
        for (var i = 0; i < terms.length; i++) {
            _loop_1(i);
        }
        var totalSlice = result.length > 100 ? 100 : result.length;
        return result.sort(function (a, b) { return b.count - a.count; }).slice(0, totalSlice);
    };
    ProcessComments = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)("logger")),
        __param(1, (0, typedi_1.Inject)("naiveBayesModel")),
        __param(2, (0, typedi_1.Inject)(function (type) { return Preprocessing_1.default; })),
        __param(3, (0, typedi_1.Inject)(function (type) { return NaiveBayes_1.default; })),
        __metadata("design:paramtypes", [Object, Object, Preprocessing_1.default,
            NaiveBayes_1.default])
    ], ProcessComments);
    return ProcessComments;
}());
exports.default = ProcessComments;
