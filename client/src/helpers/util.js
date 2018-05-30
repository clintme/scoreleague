import 'whatwg-fetch';
import moment from 'moment';
import config from 'constants/config';
import { getJWTTokenFromLocalStorage } from 'helpers/auth';

const queryParams = params => Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

const defaultHeaders = (fbToken) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const token = getJWTTokenFromLocalStorage();
  if (token) {
    headers.Authorization = fbToken;
  }
  return headers;
};

function checkStatus(response) {
  if (response.status >= 200 && response.status <= 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetchFromAPI({ endpoint, params, fbToken }) {
  let url = [config.apiUrl, endpoint].join('/');
  if (params) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);
  }

  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
  }).then(checkStatus)
    .then(response => response.json());
}

export function postToAPI({ endpoint, body, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');
  const headconfig = {
    method: 'POST',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
    body: JSON.stringify(body),
  };

  return fetch(url, headconfig)
    .then(checkStatus)
    .then(response => response.json());
}

export function postUploadAPI({ endpoint, data, fbToken }) {
  const url = [config.apiUploadUrl, endpoint].join('/');
  const headconfig = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Authorization: fbToken,
    },
    body: data,
  };

  return fetch(url, headconfig)
    .then(checkStatus)
    .then(response => response.json());
}

export function putToAPI({ endpoint, body, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');

  return fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
    body: JSON.stringify(body),
  });
}

export function deleteFromAPI({ endpoint, fbToken }) {
  const url = [config.apiUrl, endpoint].join('/');

  return fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: defaultHeaders(fbToken),
  });
}

export function createConstants(...constants) {
  return constants.reduce((accumulator, constant) => {
    accumulator[constant] = constant; // eslint-disable-line
    return accumulator;
  }, {});
}

export function _bind(strinOrAray, scope) { // eslint-disable-line
  let array = strinOrAray;
  if (!Array.isArray(strinOrAray)) {
    array = strinOrAray.split(' ');
  }

  return array.map(item => scope[item] = scope[item].bind(scope)); // eslint-disable-line
}

export function getInitial(x, y) {
  let first = x;
  let second = y;
  if (!x) { first = ''; }
  if (!y) { second = ''; }
  return first.charAt(0) + second.charAt(0);
}

export function getRewardStatusValue(s) {
  const stats = {
    0: () => ({
      status: 'warning',
      value: 'IN-ACTIVE',
    }),
    1: () => ({
      status: 'success',
      value: 'ACTIVE',
    }),
    2: () => ({
      status: 'warning',
      value: 'PENDING',
    }),
    3: () => ({
      status: 'warning',
      value: 'PENDING BRAND VALIDATION',
    }),
    4: () => ({
      status: 'danger',
      value: 'ENDED',
    }),
  };

  if (s === undefined || Object.keys(stats).indexOf(s.toString()) === -1) {
    return {
      status: 'primary',
      value: 'default',
    };
  }

  return stats[s]();
}

export function hasMedia(medias, type) {
  const filteredMedia = medias.filter(item => item.get('type') === type);

  return filteredMedia.size;
}

export function getUploadIds(medias, type) {
  return medias
    .filter(item => item.get('type') === type)
    .reduce((state, next) => {
      state.push(next.get('upload_id'));

      return state;
    }, []);
}

export function getFileExtInLink(src, linksplitter) {
  let fileSplitter = '/';
  if (linksplitter) {
    fileSplitter = linksplitter;
  }

  const filename = src.split(fileSplitter);
  const fileSplit = filename[filename.length - 1].split('.');
  const fileExt = fileSplit.slice(-1).pop();

  return fileExt;
}

export function Status(data, resource) {
  const today = moment().endOf('day');
  const startDate = moment(data.get('start_date'));
  const endDate = moment(data.get('end_date'));

  const stats = {
    0: () => ({
      name: 'Suspended',
      style: '-suspended',
    }),
    1: () => {
      if (startDate > today) {
        return {
          name: 'Scheduled',
          style: '-scheduled',
        };
      }

      if (startDate < today && endDate > today) {
        return {
          name: 'On-Going',
          style: '-ongoing',
        };
      }

      return {
        name: '',
        style: '',
      };
    },
    2: () => ({
      name: 'For Validation',
      style: '-scheduled',
    }),
    3: () => ({
      name: 'For Validation',
      style: '-suspended',
    }),
    4: () => ({
      name: 'Completed',
      style: '-completed',
    }),
  };

  const statsResult = stats[data.get('status')]();
  return statsResult[resource];
}

export function selectMedia(medias, type) {
  return medias.filter(item => item.get('type') === type).get('0');
}

export function getAverage(arr, type) {
  const getArr = arr.reduce((p, c) => {
    p.push(parseFloat(c.get(type)));
    return p;
  }, []).sort((a, b) => a > b);

  if (getArr.length <= 2) {
    return getArr[1];
  }

  return getArr[(getArr.length / 2) - 1];
}

export function createPostCount(count) {
  const postCount = count.reduce((s, n) => {
    const pCount = {
      day: n.get('day'),
      value: parseFloat(n.get('value')),
    };

    s.push(pCount);
    return s;
  }, []);

  return postCount;
}

export function smoothLineChartConfig(data) {
  const zoomChart = (e) => {
    const { chart } = e;

    return chart.zoomToIndexes(
      Math.round(chart.dataProvider.length * 0.4),
      Math.round(chart.dataProvider.length * 0.55),
    );
  };

  return {
    type: 'serial',
    theme: 'light',
    marginTop: 0,
    marginRight: 80,
    dataProvider: data,
    valueAxes: [{
      axisAlpha: 0,
      position: 'left',
      precision: 0,
      // minimum: 0,
      // minMaxMultiplier: 4,
    }],
    graphs: [{
      id: 'g1',
      balloonText: '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
      bullet: 'round',
      bulletSize: 8,
      lineColor: '#000',
      lineThickness: 2,
      negativeLineColor: '#000',
      type: 'smoothedLine',
      valueField: 'value',
    }],
    chartScrollbar: {
      graph: 'g1',
      gridAlpha: 0,
      color: '#888888',
      scrollbarHeight: 55,
      backgroundAlpha: 0,
      selectedBackgroundAlpha: 0.1,
      selectedBackgroundColor: '#888888',
      graphFillAlpha: 0,
      autoGridCount: true,
      selectedGraphFillAlpha: 0,
      graphLineAlpha: 0.2,
      graphLineColor: '#c2c2c2',
      selectedGraphLineColor: '#888888',
      selectedGraphLineAlpha: 1,
    },
    chartCursor: {
      categoryBalloonDateFormat: 'MM/DD/YYYY',
      cursorAlpha: 0,
      valueLineEnabled: true,
      valueLineBalloonEnabled: true,
      valueLineAlpha: 0.5,
      fullWidth: true,
    },
    dataDateFormat: 'MM/DD/YYYY',
    categoryField: 'day',
    categoryAxis: {
      minPeriod: 'DD',
      parseDates: true,
      minorGridAlpha: 0.1,
      minorGridEnabled: true,
    },
    export: {
      enabled: true,
    },
    hideCredits: true,
    listeners: [{
      event: 'rendered',
      method: zoomChart,
    }],
  };
}

export function campaignTitle(rewardInfo) {
  const title = rewardInfo.get('name') || '';
  const brand = rewardInfo.getIn(['brand', 'name']) || '';

  if (!title.length || !brand.length) {
    return '';
  }

  return `${title} - ${brand}`;
}

export function createAgeGenderGraph(ageGender, tSubmission) {
  if (!ageGender) {
    return [];
  }

  const ageGenderFormat = [];
  ageGender.forEach((e, ageRange) => {
    const total = e.get('male') + e.get('female');

    if (total === 0 && e.get('male') === 0 && e.get('female') === 0) {
      ageGenderFormat.push({
        age: ageRange,
        male: 0,
        female: 0,
        startAge: ageRange.split('-')[0],
        totalPercentage: 0,
      });
    } else {
      ageGenderFormat.push({
        age: ageRange,
        male: parseInt((e.get('male') / total) * 100, 10),
        female: parseInt((e.get('female') / total) * 100, 10),
        startAge: ageRange.split('-')[0],
        totalPercentage: parseInt((total / tSubmission) * 100, 10),
      });
    }
  });

  return ageGenderFormat.sort((a, b) => a.startAge > b.startAge);
}

export function createCampaignAppeal(rewardInfo) {
  return {
    type: 'pie',
    theme: 'light',
    dataProvider: [{
      title: 'Campaign Views',
      value: rewardInfo.get('views_count'),
      color: '#e4e9ed',
    }, {
      title: 'Submissions',
      value: rewardInfo.get('total_submissions'),
      color: '#1b163b',
    }],
    valueField: 'value',
    colorField: 'color',
    labelRadius: 5,

    radius: '42%',
    innerRadius: '60%',
    labelText: '[[title]]',
    hideCredits: true,
    export: { enabled: true },
  };
}

export function isPostSelected(item, params, info, type) {
  let klas = {
    card: 'submission-card',
    btn: 'btn -primary',
    isActive: false,
  };

  if (
    (item.get('is_shortlisted') && params.filtered !== 'shortlisted') ||
    (params.filtered === 'shortlisted' && item.get('isRewardSelected'))
  ) {
    klas = {
      card: 'submission-card -active',
      btn: 'btn -secondary',
      isActive: true,
    };
  }

  if (params.filtered === 'shortlisted' && info.get('status') !== 3 && info.get('type') !== 2) {
    klas = {
      card: 'submission-card -active',
      btn: 'btn -secondary',
      isActive: true,
    };
  }

  return klas[type];
}

export function createWord(arr) {
  return arr.reduce((s, n) => {
    s.push(n);
    return s;
  }, []);
}
