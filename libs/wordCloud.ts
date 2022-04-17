export const generateWordCloudData = (
   terms: Array<string>
): Array<{ text: string; size: number }> => {
   const result: Array<{ text: string; size: number }> = [];
   for (let i = 0; i < terms.length; i++) {
      const exist = result.findIndex((e) => e.text === terms[i]);
      if (exist === -1) {
         result.push({
            text: terms[i],
            size: 1,
         });
      } else {
         result[exist].size += 1;
      }
   }
   const totalSlice = result.length > 100 ? 100 : result.length;
   return result.sort((a, b) => b.size - a.size).slice(0, totalSlice);
};
