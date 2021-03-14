import slugify from "slug";
import he from "he";

export class Utils {
    public static sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public static encodeHTML(dirtyHTML: string): string {
        return he.encode(dirtyHTML);
    }

    public static decodeHTML(html: string): string {
        return he.decode(html);
    }

    public static slugify(txt: string): string {
        return slugify(txt);
    }
}