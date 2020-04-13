import { Base64 } from 'js-base64';
import * as qs from 'qs';

const parseUrl = (url: string): { [key: string]: string | any } => {
  const isContainRoute = /\?route\?/.test(url);
  let position;
  let searchStr;
  let originUrl;
  if (isContainRoute) {
    position = url.replace(/\?route\?/, '').indexOf('?');
    const newPosition = position + '?route?'.length;
    searchStr = position !== -1 ? url.substring(newPosition + 1) : '';
    originUrl = position !== -1 ? url.substring(0, newPosition) : url;
  } else {
    position = url.indexOf('?');
    searchStr = position !== -1 ? url.substring(position + 1) : '';
    originUrl = position !== -1 ? url.substring(0, position) : url;
  }
  return {
    originUrl,
    params: searchStr ? qs.parse(searchStr) : {},
  };
};

const getSearchParams = (originObj: { [key: string]: string | any }, modifyObj: { [key: string]: string | any }) => {
  const initObj = originObj;
  Object.keys(modifyObj).forEach((key) => {
    if (initObj[key]) {
      let itemObj;
      try {
        itemObj = JSON.parse(Base64.decode(decodeURIComponent(initObj[key])));
      } catch (error) {
        // console.error(error);
        itemObj = initObj[key];
      }
      if (Object.prototype.toString.call(itemObj) === '[object Object]' && Object.prototype.toString.call(modifyObj[key]) === '[object Object]') {
        const child = getSearchParams(itemObj, modifyObj[key]);
        initObj[key] = child;
      } else {
        initObj[key] = modifyObj[key];
      }
    } else {
      initObj[key] = modifyObj[key];
    }
  });
  return initObj;
};

export const encode = (url: string, params: { [key: string]: string | any }) => {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    console.warn('params is not object');
    return url;
  }

  const { originUrl, params: originParams } = parseUrl(url);

  const newParams = getSearchParams(originParams, params);
  Object.keys(newParams).forEach((i) => {
    try {
      if (newParams[i] && typeof newParams[i] === 'object') {
        const r = encodeURIComponent(Base64.encode(JSON.stringify(newParams[i])));
        newParams[i] = r;
      }
    } catch (error) {
      // console.log(i, originParams[i]);
    }
  });
  const queryStr = qs.stringify(newParams);
  return `${originUrl}${queryStr ? `?${queryStr}` : ''}`;
};

export const encodeStringify = (params: { [key: string]: string | any }) => {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    throw new Error('params is not object');
  }
  return encodeURIComponent(Base64.encode(JSON.stringify(params)));
};


export const decode = (url: string) => {
  const { params } = parseUrl(url);
  Object.keys(params).forEach((key) => {
    try {
      const value = JSON.parse(Base64.decode(decodeURIComponent(params[key])));
      params[key] = value;
    } catch (error) {
      // do nothing
    }
  });
  return params;
};

export const decodeParse = (str: string) => {
  if (typeof str !== 'string') {
    throw new Error('str is not string');
  }
  return JSON.parse(Base64.decode(decodeURIComponent(str)));
};

export const decodeWithReturnOrignUrl = (url: string) => {
  const { params, originUrl } = parseUrl(url);
  Object.keys(params).forEach((key) => {
    try {
      const value = JSON.parse(Base64.decode(decodeURIComponent(params[key])));
      params[key] = value;
    } catch (error) {
      // do nothing
    }
  });
  return {
    originUrl,
    params,
  };
};


export const encodeColumbusConnect = (url: string, params: { [key: string]: string | any }) => encode(url, { connect: params });

export const decodeColumbusConnect = (url: string) => {
  const { connect } = decode(url);
  return connect;
};
