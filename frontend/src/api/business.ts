import { makeApiCall } from "@/utils/util";

export const searchBusiness = async (
  keyword: string = "",
  location: string = "",
  hideToast: boolean = false
) => {
  const path = `/businesses/search?keyword=${keyword}&location=${location}`;

  return await makeApiCall({
    functionName: "searchBusiness",
    defaultErrorMessage: "Failed to search businesses",
    fetchWrapperOptions: {
      path,
      isPublic: true,
    },
    preventToast: hideToast,
  });
};

export const startBusinessScraping = async (
  payload: any,
  hideToast: boolean = false
) => {
  const path = "/businesses/start";

  return await makeApiCall({
    functionName: "startBusinessScraping",
    defaultErrorMessage: "Failed to start business scraping",
    fetchWrapperOptions: {
      isPublic: true,
      path,
      payload,
    },
    preventToast: hideToast,
  });
};
