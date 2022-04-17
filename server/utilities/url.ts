const isUrl = (url: string): boolean => {
   const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
         '(\\#[-a-z\\d_]*)?$',
      'i'
   ); // fragment locator
   return !!pattern.test(url);
};

const extractVidioId = (url: string): string => {
   //eslint-disable-next-line
   const pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
   const match = url.match(pattern);
   if (match && match[2].length == 11) {
      return match[2].toString();
   }
   return '';
};

export default { isUrl, extractVidioId };
