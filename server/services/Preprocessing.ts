import { Service, Inject } from 'typedi';
// import { slanglWords, stopWords } from '../loaders/dataLoader';

@Service()
export default class Preprocessing {
   private text: string;
   private terms: Array<string>;
   constructor(
      @Inject('slanglWords') private slanglWords: Array<{ slang: string; formal: string }>,
      @Inject('stopWords') private stopWords: Array<string>,
      @Inject('akarata')
      private akarata: {
         stem: (word: string, derivationalStemming?: boolean | undefined) => string;
      }
   ) {
      this.text = '';
      this.terms = [];
   }
   /**
    * input text to the object
    * @param {string} text - text you want to preprocess
    */
   public do(text: string): this {
      this.text = text;
      return this;
   }
   /**
    * transform text to lowercase
    */
   public caseFolding(): this {
      this.text = this.text.toLowerCase();
      return this;
   }
   /**
    * remove url and all symbol from text
    */
   public cleansing(): this {
      /* eslint-disable no-useless-escape */
      const urlPatern =
         /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g;
      const emojiPattern =
         /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
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
   }
   /**
    * remove stop words and normalize terms.
    * first normalize slang words and remove the stopwords
    */
   public removeStopWords(): this {
      // normalize terms
      const tempTerms = this.terms.map(word => {
         const slangId = this.slanglWords.map(el => el.slang).indexOf(word);
         return slangId && slangId !== -1 ? this.slanglWords[slangId].formal : word;
      });
      // remove stopwords
      this.text = tempTerms.join(' ');
      // using regexp top remove the soptwords i assume is fastest
      this.text = this.text
         .replace(new RegExp(`\\b(${this.stopWords.join('|')})\\b`, 'g'), '')
         .replace(/\s\s+/g, ' ')
         .trim();
      this.terms = this.text.split(' ');
      this.terms = this.terms.filter(term => term !== '');
      return this;
   }
   /**
    * split text into individual words
    */
   public stemming(): this {
      this.terms = this.terms.map(word => {
         return this.akarata.stem(word);
      });
      return this;
   }
   /**
    * split text into individual words
    */
   public tokenization(): this {
      this.terms = this.text.split(' ');
      return this;
   }
   /**
    * do all preprocess and return
    * @param {string} text - text you want to preprocess
    * @return Array of string
    */
   public process(text: string): Array<string> {
      return this.do(text).caseFolding().cleansing().tokenization().removeStopWords().stemming().getTerms();
   }
   /**
    * retrun text
    */
   public getText(): string {
      return this.text;
   }
   /**
    * retrun tokens
    */
   public getTerms(): Array<string> {
      return this.terms;
   }
}
