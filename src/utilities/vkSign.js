import { getRequest } from "./requests";

const vkSign = async () => {
  const response = await getRequest("users/vk-auth");
  if (!response.success) {
    return alert(response.message);
  }
  return response;
};

const vkGetToken = async (query) => {
  const response = await getRequest("users/vk-complete" + query);
  if (!response.success) {
    return alert(response.message);
  }

  return response;
};

export { vkSign, vkGetToken };
