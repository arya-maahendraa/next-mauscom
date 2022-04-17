import { Container } from 'typedi';
import loggerInstance from './logger';
import { slanglWords, stopWords, naiveBayesModel } from './dataLoader';
import akarata from 'akarata';

export default (): void => {
   try {
      Container.set('logger', loggerInstance);
      Container.set('slanglWords', slanglWords);
      Container.set('stopWords', stopWords);
      Container.set('akarata', akarata);
      Container.set('naiveBayesModel', naiveBayesModel);
   } catch (err) {
      loggerInstance.error(`Error on dependency injector loader: %o`, err);
      throw err;
   }
};
