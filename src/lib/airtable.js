import { base } from "../config/config.js";
import invalidArguments from "../helpers/invalidArguments.js";

export default {
  getTableByToken(token) {
    invalidArguments([token]);
    return base(token);
  },

  getImage(picture) {
    if (!picture) return;
    const {
      thumbnails: {
        large: { url },
      },
    } = picture[0];
    return url;
  },
};
