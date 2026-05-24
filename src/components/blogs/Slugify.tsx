export function slugify(str: any): string {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "") // remove special characters
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/--+/g, "-"); // remove multiple -
  }