const LOCAL_FAVORITE_LIST = 'local_fav_list';

export const getFavoriteList = () => {
  const data = localStorage.getItem(LOCAL_FAVORITE_LIST)
  return data ? JSON.parse(data) : [];
}

export const saveItemToFavoriteList = (id) => {
  let tempArr = getFavoriteList();
  tempArr?.push(id)
  localStorage.setItem(LOCAL_FAVORITE_LIST, JSON.stringify(tempArr))
}

export const deleteItemFromFavoriteList = (id) => {
  let tempArr = getFavoriteList();
  console.log('localstorage.js	15 deleteItemFromFavoriteList', tempArr);
  tempArr.filter(item => item !== id)

  console.log('localstorage.js	19	tempArr', tempArr);

  localStorage.setItem(LOCAL_FAVORITE_LIST, JSON.stringify(tempArr))
}

export const removeAllFromFavoriteList = () => {
  let tempArr = []
  localStorage.setItem(LOCAL_FAVORITE_LIST, JSON.stringify(tempArr))
}