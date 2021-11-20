import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityTags(url, errorNotificationFn) {
  const { data, error, createRecord } = useGeneralizedCrudMethods(url, errorNotificationFn);

  function createTagsAndMerge(tagIdsIn, tagNamesInString) {
    if (!tagIdsIn && !tagNamesInString) return undefined;
    const tagNamesIn = tagNamesInString
      ? tagNamesInString.split(",").filter((t) => t && t.length > 0)
      : [];
    const tagIds = tagIdsIn ? [...tagIdsIn] : [];
    const tagsNamesAllUppercase = data?.map((r) => r.tagName.toUpperCase());
    tagNamesIn
      .filter((rec) => {
        return !(!rec || rec.trim().length === 0);
      })
      .forEach(function (tag) {
        if (tagsNamesAllUppercase.includes(tag.toUpperCase())) {
          const tagNameValue = tagsNamesAllUppercase.find(
            (r) => r === tag.toUpperCase()
          );
          const id = data?.find(
            (r) => r.tagName.toUpperCase() === tagNameValue
          ).id;
          if (!tagIds.includes(id)) {
            tagIds.push(id);
          }
        } else {
          const tagIdNew = uuidv4();
          createRecord({
            id: tagIdNew,
            tagName: tag,
          });
          tagIds.push(tagIdNew);
        }
      });
    return tagIds;
  }

  return { data, error, createTagsAndMerge };
}

export default useEntityTags;
