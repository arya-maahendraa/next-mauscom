import { atom } from "recoil";

const vidioDetailsState = atom({
   key: "vidioDitailsState",
   default: {
      channelId: "1e1",
      channelTitle: "undefined",
      profilePicture:
         "https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-300x300.jpg",
      title: "undefined",
      description: "",
      thumbnails:
         "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/youtube-thumbnail-template-design-d45e855a31739ec1f58b2d0ffb7013df_screen.jpg?ts=1591603072",
      publishedAt: "",
      likes: "0",
      view: "0",
      comments: "0",
   },
});

export default vidioDetailsState;
