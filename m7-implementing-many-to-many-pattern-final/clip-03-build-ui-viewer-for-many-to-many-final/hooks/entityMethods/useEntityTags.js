import { v4 as uuidv4 } from "uuid";
import tags from "../../data/tags.json";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";

function useEntityTags() {
  const { data, error, createRecord } = useGeneralizedCrudMethods(tags);

  // creates new tags as necessary and returns full list of tagIds for what is passed in with no dups
  function createTagsAndMerge(tagIdsIn, tagNamesInString = "") {
    if (!tagIdsIn) return undefined;

    const tagNamesIn = tagNamesInString
      ? tagNamesInString.split(",").filter((a) => a && a.length > 0)
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

  return {
    data,
    error,
    createTagsAndMerge,
  };
}

export default useEntityTags;
