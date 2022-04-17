export interface IComment {
   id: string;
   authorDisplayName: string;
   authorProfileImageUrl: string;
   textOriginal: string;
   processedTest: string;
   likeCount: number;
   publishedAt: string;
   updatedAt: string;
   sentiment: string;
}

export interface IAllComments {
   channelId: string;
   channelTitle: string;
   title: string;
   description: string;
   publishedAt: string;
   thumbnails: string;
   comments: Array<IComment>;
   totalPositive: number;
   totalNegative: number;
   wordClouData: Array<{ term: string; count: number }>;
}
